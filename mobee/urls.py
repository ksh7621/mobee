"""mobee URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
import os, sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

#from mainApp.views import createPost



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('mainApp.urls')),
    path('movie/', include('Comment.urls')),
    path('movielist/',include('new.urls')),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),
   # path('create_post/', createPost, name="post" ) #add this

]
