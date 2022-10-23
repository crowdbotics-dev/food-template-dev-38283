import oscar.apps.payment.apps as apps


class PaymentConfig(apps.PaymentConfig):
    name = 'modules.ecommerce.payment'
