from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import SimpleRouter

from myapp.api.resources import UserModelViewSet, ColorModelViewSet, GenreModelViewSet, NftcardModelViewSet, \
    RegisterAPIView, ListingViewSet, BidViewSet, AuctionViewSet, LikeViewSet, CollectionModelViewSet, MeAPIView

router = SimpleRouter()
router.register(r'user', UserModelViewSet)
router.register(r'color', ColorModelViewSet)
router.register(r'genre', GenreModelViewSet)
router.register(r'collection', CollectionModelViewSet)
router.register(r'nftcard', NftcardModelViewSet)
router.register(r'listing', ListingViewSet)
router.register(r'bid', BidViewSet)
router.register(r'auction', AuctionViewSet)
router.register(r'like', LikeViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterAPIView.as_view()),
    path('api/token/', obtain_auth_token),
    path("api/me/", MeAPIView.as_view()),
    path('api/genre/<int:id>/nftcards/', GenreModelViewSet.as_view),
    path('api/collection/<int:id>/nftcards/', CollectionModelViewSet.as_view),
    path("", TemplateView.as_view(template_name="index.html")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)