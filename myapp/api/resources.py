from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

from myapp.api.permissions import DeleteOnlyOwner
from myapp.api.serializers import UserSerializer, ColorSerializer, GenreSerializer, NftcardSerializer, \
    ListingSerializer, BidSerializer, LikeSerializer, AuctionSerializer, CollectionSerializer
from myapp.models import User, Color, Genre, Collection, Nftcard, Listing, Bid, Like, Auction
from rest_framework.filters import OrderingFilter

User = get_user_model()

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        display_name = request.data.get("display_name")
        custom_url = request.data.get("custom_url")
        bio = request.data.get("bio")
        portfolio = request.data.get("portfolio")
        twitter = request.data.get("twitter")
        eth_wallet = request.data.get("eth_wallet")
        avatar = request.FILES.get("avatar")

        if not username or not password:
            return Response({"error": "Missing fields"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=400)

        if len(password) < 6:
            return Response({"error": "Password too short"}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email, display_name=display_name, custom_url=custom_url, bio=bio, portfolio=portfolio, twitter=twitter, eth_wallet=eth_wallet, avatar=avatar)
        token = Token.objects.create(user=user)

        return Response({
            "token": token.key,
            "user_id": user.id
        })


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials"}, status=400)

        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)

        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "display_name": user.display_name,
                "avatar": user.avatar.url if user.avatar else None
            }
        })


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().prefetch_related("owned_nfts")
    serializer_class = UserSerializer

class ColorModelViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class GenreModelViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

    @action(detail=True, methods=['get'])
    def nftcards(self, request, pk=None):
        nftcards = Nftcard.objects.filter(genre__id=pk)
        serializer = NftcardSerializer(nftcards, many=True)
        return Response(serializer.data)


class CollectionModelViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    @action(detail=True, methods=['get'])
    def nftcards(self, request, pk=None):
        nftcards = Nftcard.objects.filter(collections_id=pk)
        serializer = NftcardSerializer(nftcards, many=True)
        return Response(serializer.data)



class NftcardModelViewSet(viewsets.ModelViewSet):
    queryset = Nftcard.objects.all()
    http_method_names = ['get', 'post', 'delete']
    serializer_class = NftcardSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, DeleteOnlyOwner]
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, creator=self.request.user)


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["created_at", "price"]
    pagination_class = None

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


    def get_queryset(self):
        queryset = super().get_queryset()

        seller = self.request.query_params.get("seller")
        price = self.request.query_params.get("price")
        nftcard = self.request.query_params.get("nftcard")

        if seller:
            queryset = queryset.filter(seller_id=seller)

        if price:
            queryset = queryset.filter(price=price)

        if nftcard:
            queryset = queryset.filter(nftcard_id=nftcard)

        return queryset



class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ["created_at", "amount"]

    def get_queryset(self):
        queryset = super().get_queryset()

        buyer = self.request.query_params.get("buyer")
        item = self.request.query_params.get("item")

        if buyer:
            queryset = queryset.filter(buyer_id=buyer)

        if item:
            queryset = queryset.filter(item_id=item)

        return queryset

class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    pagination_class = None


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)