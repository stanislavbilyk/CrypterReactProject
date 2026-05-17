from .models import Color, Genre, Nftcard, Collection, Listing, Bid, Auction, User
from django.contrib import admin
from django import forms
from django.utils.html import format_html


class ColorAdminForm(forms.ModelForm):
    class Meta:
        model = Color
        fields = "__all__"
        widgets = {
            'hex_code': forms.TextInput(attrs={'type': 'color'}),
        }

class ColorAdmin(admin.ModelAdmin):
    form = ColorAdminForm
    list_display = ("name", "hex_code", "color_preview")

    def color_preview(self, obj):
        return format_html(
            '<div style="width: 30px; height: 20px; background-color: {}; border: 1px solid #000"></div>',
            obj.hex_code
        )
    color_preview.short_description = "Color preview"



@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'display_name', 'custom_url', 'bio', 'portfolio', 'twitter', 'avatar', 'eth_wallet')

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('name','image')


@admin.register(Nftcard)
class NftcardAdmin(admin.ModelAdmin):
    list_display = ('name', 'image', 'creator', 'owner', 'color', 'get_genres',)

    def get_genres(self, obj):
        return ", ".join([g.name for g in obj.genre.all()])
    get_genres.short_description = "Genres"


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('nftcard', 'seller', 'price',)


@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('buyer', 'item', 'amount',)


@admin.register(Auction)
class AuctionAdmin(admin.ModelAdmin):
    list_display = ('listing', 'start_time', 'end_time',)


admin.site.register(Color, ColorAdmin)