import requests
from django.conf import settings
from django.core.cache import cache


class DroneLocationAPI:
    def __init__(self):
        self.DRONE_LOCATION_API_URL = settings.DRONE_LOCATION_API_URL

    def get_headers(self):
        access_token = self.get_access_token()
        return {
            "Accept": "application/json",
            "Authorization": "Bearer {}".format(access_token)
        }

    def get_access_token(self):
        if not cache.get('DRONE_LOCATION_ACCESS_TOKEN'):
            url = f"{self.DRONE_LOCATION_API_URL}/api/token"
            headers = {
                "Accept": "application/json",
                "Authorization": f"Basic {settings.DRONE_LOCATION_API_CRED}"
            }

            response = requests.post(url, headers=headers)
            if response.status_code == 200:
                resp = response.json()
                cache.set('DRONE_LOCATION_ACCESS_TOKEN', resp.get('access_token'), resp.get('expires') - 200)
        return cache.get('DRONE_LOCATION_ACCESS_TOKEN')

    def check_delivery_location(self, query_param):
        api_url = f"{self.DRONE_LOCATION_API_URL}/api/location"
        headers = self.get_headers()
        response = requests.get(api_url, headers=headers, params=query_param)
        if response.status_code == 200:
            resp = response.json()
            return resp
