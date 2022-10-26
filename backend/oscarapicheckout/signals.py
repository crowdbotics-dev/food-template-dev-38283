from django.dispatch import Signal

# providing_args=["basket", "shipping_address", "shipping_charge"]
pre_calculate_total = Signal()

# providing_args=["order", "user", "request"]
order_placed = Signal()

# providing_args=["order", "request"]
order_payment_authorized = Signal()

# providing_args=["order", "request"]
order_payment_declined = Signal()
