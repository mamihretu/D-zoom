import pytest
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.models import AnonymousUser
from django.contrib.messages.middleware import MessageMiddleware
from django.contrib.sessions.middleware import SessionMiddleware
from django.http import HttpRequest, HttpResponseRedirect
from django.test import RequestFactory, LiveServerTestCase
from django.urls import reverse
from selenium import webdriver
import time
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webdriver import WebDriver
from django.contrib.auth import get_user_model
User = get_user_model()




class Hosttest(LiveServerTestCase):

    @classmethod
    def setUpClass(self):
        super().setUpClass()
        self.selenium = webdriver.Chrome("chromedriver.exe - Shortcut")
        self.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(self):
        self.selenium.quit()
        super().tearDownClass()

    def test_homepage(self):

        time.sleep(20)

        self.selenium.get('http://127.0.0.1:8000/rest-auth/login')
        assert "Doom" in driver.title




