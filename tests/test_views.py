# import pytest
# from django.conf import settings
# from django.contrib import messages
# from django.contrib.auth.models import AnonymousUser
# from django.contrib.messages.middleware import MessageMiddleware
# from django.contrib.sessions.middleware import SessionMiddleware
# from django.http import HttpRequest, HttpResponseRedirect
# from django.test import RequestFactory, LiveServerTestCase
# from django.urls import reverse
# from selenium import webdriver
# import time




# class TestUserUpdateView:
#     """
#     TODO:
#         extracting view initialization code as class-scoped fixture
#         would be great if only pytest-django supported non-function-scoped
#         fixture db access -- this is a work-in-progress for now:
#         https://github.com/pytest-dev/pytest-django/pull/258
#     """

#     def dummy_get_response(self, request: HttpRequest):
#         return None

#     def test_get_success_url(self, user: User, rf: RequestFactory):
#         view = UserUpdateView()
#         request = rf.get("/fake-url/")
#         request.user = user

#         view.request = request

#         assert view.get_success_url() == f"/users/{user.username}/"

#     def test_get_object(self, user: User, rf: RequestFactory):
#         view = UserUpdateView()
#         request = rf.get("/fake-url/")
#         request.user = user

#         view.request = request

#         assert view.get_object() == user

#     def test_form_valid(self, user: User, rf: RequestFactory):
#         view = UserUpdateView()
#         request = rf.get("/fake-url/")

#         # Add the session/message middleware to the request
#         SessionMiddleware(self.dummy_get_response).process_request(request)
#         MessageMiddleware(self.dummy_get_response).process_request(request)
#         request.user = user

#         view.request = request

#         # Initialize the form
#         form = UserAdminChangeForm()
#         form.cleaned_data = {}
#         form.instance = user
#         view.form_valid(form)

#         messages_sent = [m.message for m in messages.get_messages(request)]
#         assert messages_sent == ["Information successfully updated"]


# class TestUserRedirectView:
#     def test_get_redirect_url(self, user: User, rf: RequestFactory):
#         view = UserRedirectView()
#         request = rf.get("/fake-url")
#         request.user = user

#         view.request = request

#         assert view.get_redirect_url() == f"/users/{user.username}/"


# class TestUserDetailView:
#     def test_authenticated(self, user: User, rf: RequestFactory):
#         request = rf.get("/fake-url/")
#         request.user = UserFactory()

#         response = user_detail_view(request, username=user.username)

#         assert response.status_code == 200

#     def test_not_authenticated(self, user: User, rf: RequestFactory):
#         request = rf.get("/fake-url/")
#         request.user = AnonymousUser()

#         response = user_detail_view(request, username=user.username)
#         login_url = reverse(settings.LOGIN_URL)

#         assert isinstance(response, HttpResponseRedirect)
#         assert response.status_code == 302
#         assert response.url == f"{login_url}?next=/fake-url/"



# class Hosttest(LiveServerTestCase):

#     def test_homepage(self):
#         driver = webdriver.Chrome("C:/Users/abreham/Desktop/Executables/chromedriver.exe")
#         time.sleep(20)

#         driver.get('http://127.0.0.1:8000/rest-auth/login')
#         assert "Doom" in driver.title




from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium import webdriver

class MySeleniumTests(StaticLiveServerTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.selenium = webdriver.Chrome("C:/Users/abreham/Desktop/Executables/chromedriver.exe")
        cls.selenium.implicitly_wait(10)

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()

    def test_login(self):
        self.selenium.get('%s%s' % (self.live_server_url, '/rest-auth/login'))
        assert 1+1 == 2

