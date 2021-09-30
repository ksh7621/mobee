
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('<int:movie_id>/Comments/', views.CommentView), #생성, 표시
    path('<int:movie_id>/Comments/<int:id>/', views.Comment_Detail) #삭제

]