from django.shortcuts import render
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib import messages
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import User
from django.contrib import auth
from .models import *
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required

# for allauth

def eoauth(request):
    code = request.GET['code']
    print('code = ' + str(code))
    return redirect('index')

def kakao_login(request):
    login_request_uri = 'https://kauth.kakao.com/oauth/authorize?'
    client_id = 'cd30ad1f4e9df7053539fcb9f8435bd1'
    redirect_uri = 'http://localhost:8000/oauth'

    login_request_uri += 'client_id' + client_id
    login_request_uri += '&redirect_uri=' + redirect_uri
    login_request_uri += '&response_type=code'

    return redirect(login_request_uri)

def index(request):
    # if request.user.is_authenticated:
    #     return redirect("")
    # else:
    return render(request, 'index.html')

