from django.urls import resolve, reverse
from django.test import TestCase
# from unittest import TestCase

class UrlTestCase(TestCase):
    def test_register(self):
        response = self.client.get('rest-auth/registration/')
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        response = self.client.get('rest-auth/login')
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        response = self.client.get('rest-auth/logout')
        self.assertEqual(response.status_code, 200)

