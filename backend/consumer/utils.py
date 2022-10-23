from math import radians, cos, sin, asin, sqrt

from django.conf import settings
from django.core.mail import EmailMessage


def get_distance_between_points(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    # Radius of earth in kilometers is 6371
    miles = 3956 * c
    return miles


def filter_vendors_queryset(vendor_data, request):
    try:
        input_lat = request.query_params.get('lat')
        input_long = request.query_params.get('long')
        if input_lat and input_long:
            input_lat = float(input_lat)
            input_long = float(input_long)
            for i in vendor_data:
                i['distance'] = None
                if i['partner_lat'] and i['partner_long']:
                    i['distance'] = get_distance_between_points(i['partner_long'], i['partner_lat'], input_long,
                                                                input_lat)
        vendor_data = sorted(vendor_data, key=lambda d: d['distance'])
    except Exception as e:
        print(e)
    return vendor_data


def send_support_message_reply(support_obj):
    admin_email_response = support_obj.admin_reply
    msg = EmailMessage(
        "Support reply: " + support_obj.subject,
        admin_email_response,
        getattr(settings, "DEFAULT_FROM_EMAIL"),
        [support_obj.user.email],
    )
    msg.content_subtype = "html"  # Main content is now text/html
    msg.send()
