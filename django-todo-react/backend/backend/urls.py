
from django.contrib import admin
from django.urls import path
from Comment import views

urlpatterns = [
    path('admin/', admin.site.urls),           
    path('api/<int:movie_id>/Comments/', views.CommentView), #생성, 표시
    path('api/<int:movie_id>/Comments/<int:id>/', views.Comment_Detail) #삭제

]