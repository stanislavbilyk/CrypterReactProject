from decimal import Decimal

from django.core.validators import MinValueValidator
from django.utils import timezone
from datetime import timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework.exceptions import ValidationError


class User(AbstractUser):
    email = models.EmailField(blank=True, null=True)

    display_name = models.CharField(max_length=255, blank=True)
    custom_url = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    bio = models.TextField(blank=True)
    portfolio = models.URLField(blank=True)
    twitter = models.URLField(blank=True)

    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    verified = models.BooleanField(default=False)

    followers = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='following',
        blank=True
    )

    eth_wallet = models.CharField(max_length=42, blank=True, null=True)  # ETH-адрес = 42 символа

    def __str__(self):
        return self.display_name or self.username


class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7, verbose_name="HEX code", default="#000000")

    def __str__(self):
        return f"{self.name} ({self.hex_code})"


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='collections/', blank=True, null=True)

    def __str__(self):
        return self.name


class Nftcard(models.Model):
    name = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='nftcards/', blank=True, null=True)
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='created_nfts')
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='owned_nfts')
    created_at = models.DateTimeField(auto_now_add=True)
    genre = models.ManyToManyField(Genre, blank=True)
    collections = models.ForeignKey(Collection, on_delete=models.SET_NULL, null=True, blank=True, related_name='nftcards')
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

class Listing(models.Model):
    nftcard = models.OneToOneField(Nftcard, on_delete=models.DO_NOTHING, related_name='listing')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    highest_bid = models.OneToOneField(
        "Bid",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="+"
    )


class Bid(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bids')
    item = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='bids')
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

        if (self.item.highest_bid is None) or (self.amount > self.item.highest_bid.amount):
            self.item.highest_bid = self
            self.item.save(update_fields=["highest_bid"])


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    nft = models.ForeignKey(Nftcard, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "nft")

    def __str__(self):
        return f"{self.user} liked {self.nft}"


class Auction(models.Model):
    listing = models.OneToOneField(Listing, on_delete=models.CASCADE, related_name="auction")
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField()

    @classmethod
    def create_with_duration(cls, listing, hours=24):
        return cls.objects.create(
            listing=listing,
            start_time=timezone.now(),
            end_time=timezone.now() + timedelta(hours=hours)
        )

    @property
    def time_remaining(self):
        now = timezone.now()
        if now >= self.end_time:
            return {
                'hours': 0,
                'minutes': 0,
                'seconds': 0,
                'total_seconds': 0,
                'formatted': 'The auction has ended',
                'is_active': False
            }

        remaining = self.end_time - now
        total_seconds = int(remaining.total_seconds())

        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60

        return {
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'total_seconds': total_seconds,
            'formatted': f"{hours}h {minutes}m {seconds}s",
            'is_active': True
        }

    @property
    def is_active(self):
        return timezone.now() < self.end_time