from oscar.core.loading import get_model
from oscar.apps.partner.strategy import Selector

from oscarapi.utils.loading import get_api_class
from rest_framework import serializers

from consumer.models import Support

Product = get_model('catalogue', 'Product')
ProductClass = get_model('catalogue', 'ProductClass')
Partner = get_model('partner', 'Partner')
ProductImageSerializer = get_api_class("serializers.product", "ProductImageSerializer")
OptionSerializer = get_api_class("serializers.product", "OptionSerializer")
ProductOptionGroup = get_model("catalogue", "ProductOptionGroup")
ProductOption = get_model("catalogue", "ProductOption")
PartnerAddress = get_model('partner', 'PartnerAddress')


class ProductOptionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOptionGroup
        exclude = ['product']


class ProductOptionWithGroupSerializer(serializers.ModelSerializer):
    product_option_group = ProductOptionGroupSerializer()

    class Meta:
        model = ProductOption
        fields = '__all__'


class ProductOptionSerializer(serializers.ModelSerializer):
    option = OptionSerializer()

    class Meta:
        model = ProductOption
        fields = '__all__'


class ProductOptionGroupWithOptionSerializer(serializers.ModelSerializer):
    options = ProductOptionSerializer(many=True)

    class Meta:
        model = ProductOptionGroup
        exclude = ['product']


class CustomProductClassSerializer(serializers.ModelSerializer):
    # attributes = ProductAttributeSerializer(many=True, required=False)
    # options = OptionSerializer(many=True, required=False)
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = ProductClass
        fields = "__all__"

    def get_product_count(self, obj):
        count = 0
        if self.context.get('product_type_count'):
            count = self.context['product_type_count'].get(obj)
        return count


class CustomPartnerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerAddress
        fields = '__all__'


class CustomPartnerInfoSerializer(serializers.ModelSerializer):
    addresses = CustomPartnerAddressSerializer(many=True)

    class Meta:
        model = Partner
        fields = ('id', 'name', 'cover', 'addresses')


class CustomProductSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    images = ProductImageSerializer(many=True, required=False)

    partner_info = serializers.SerializerMethodField()

    def get_price(self, obj):
        PriceSerializer = get_api_class("serializers.checkout", "PriceSerializer")
        request = self.context.get('request')
        strategy = Selector().strategy(request=request, user=request.user)
        ser = PriceSerializer(
            strategy.fetch_for_product(obj).price, context={"request": request}
        )
        return ser.data

    def get_partner_info(self, obj):
        if hasattr(obj, 'stockrecords'):
            partner_obj = obj.stockrecords.first().partner
            return CustomPartnerInfoSerializer(partner_obj).data

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "description",
            "product_class",
            "images",
            "price",
            "partner_info")


class CustomProductSerializerWithMoreInfo(CustomProductSerializer):
    product_option_groups = ProductOptionGroupWithOptionSerializer(many=True)

    class Meta:
        model = Product
        fields = CustomProductSerializer.Meta.fields + ('product_option_groups',)


class CustomPartnerSerializer(serializers.ModelSerializer):
    products = CustomProductSerializer(many=True)
    product_count = serializers.IntegerField()
    distance = serializers.FloatField(default=None)

    class Meta:
        model = Partner
        fields = ('id', 'name', 'product_count', 'products', 'logo', 'cover', 'description', 'distance', 'is_open')


class SupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Support
        exclude = ("user", 'admin_reply')
        read_only_fields = ['is_resolved']

    def create(self, validated_data):
        request = self.context["request"]

        instance = self.Meta.model._default_manager.create(
            **validated_data, **{"user": request.user}
        )
        return instance
