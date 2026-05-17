from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from myapp.models import User, Nftcard, Color, Genre, Listing, Bid, Like, Auction, Collection


class NftcardMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nftcard
        fields = ["id", 'name', 'image']


class UserMiniSerializer(serializers.ModelSerializer):
    owned_nfts = NftcardMiniSerializer(many=True, read_only=True)
    numb_of_followers = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["id", "username", "avatar", 'owned_nfts', 'numb_of_followers']

    def get_numb_of_followers(self, obj):
        return obj.followers.count()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    followers = UserMiniSerializer(many=True, read_only=True)
    following = UserMiniSerializer(many=True, read_only=True)
    owned_nfts = NftcardMiniSerializer(many=True, read_only=True)
    numb_of_followers = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username', 'password', 'id', 'email', 'display_name', 'custom_url', 'bio', 'portfolio', 'twitter', 'avatar', 'verified', 'followers', 'following', 'eth_wallet', 'owned_nfts', 'numb_of_followers')

        read_only_fields = ('verified', 'followers')

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def get_numb_of_followers(self, obj):
        return obj.followers.count()


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']



class CollectionSerializer(serializers.ModelSerializer):
    numb_of_items_in_collection = serializers.SerializerMethodField()
    class Meta:
        model = Collection
        fields = ['id', 'name', 'image', 'numb_of_items_in_collection']

    def get_numb_of_items_in_collection(self, obj):
        return obj.nftcards.count()


class ListingShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['id', 'nftcard', 'seller', 'price', 'created_at']


class NftcardSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    listing = ListingShortSerializer(read_only=True)
    collections = CollectionSerializer(read_only=True)
    class Meta:
        model = Nftcard
        fields = '__all__'
        read_only_fields = ['creator', 'created_at']



class AuctionShortSerializer(serializers.ModelSerializer):
    time_remaining = serializers.SerializerMethodField()

    class Meta:
        model = Auction
        fields = ['id', 'start_time', 'end_time', 'time_remaining', 'is_active']

    def get_time_remaining(self, obj):
        return obj.time_remaining



class BidShortSerializer(serializers.ModelSerializer):
    buyer = serializers.StringRelatedField()  # например, покажет username

    class Meta:
        model = Bid
        fields = ['id', 'amount', 'buyer']



class ListingSerializer(serializers.ModelSerializer):
    nftcard = NftcardSerializer()
    seller = UserSerializer(read_only=True)
    auction = AuctionShortSerializer(read_only=True)
    highest_bid = BidShortSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'nftcard', 'seller', 'price', 'created_at', 'highest_bid', "auction"]
        read_only_fields = ['created_at', 'highest_bid']


class AuctionSerializer(serializers.ModelSerializer):
    time_remaining = serializers.SerializerMethodField()
    listing = ListingSerializer(read_only=True)

    class Meta:
        model = Auction
        fields = ['id', 'listing', 'start_time', 'end_time', 'time_remaining', 'is_active']

    def get_time_remaining(self, obj):
        return obj.time_remaining



class BidSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    buyer = serializers.PrimaryKeyRelatedField(read_only=True)  # или сделай вложенный UserSerializer
    item = ListingSerializer(read_only=True)
    class Meta:
        model = Bid
        fields = ['id', 'buyer', 'item', 'amount', 'created_at']
        read_only_fields = ["id", "buyer", "created_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        listing = validated_data["item"]

        with transaction.atomic():
            listing = Listing.objects.select_for_update().get(pk=listing.pk)

            highest_bid = listing.bids.order_by("-amount").first()
            if highest_bid and validated_data["amount"] <= highest_bid.amount:
                raise ValidationError("The bid must be greater than the current maximum.")

            bid = Bid.objects.create(buyer=user, **validated_data)
            listing.highest_bid = bid
            listing.save(update_fields=["highest_bid"])

            return bid


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'nft', 'created_at']
        read_only_fields = ['created_at']


