from django.urls import path

from . import views

urlpatterns = [
    path('list/', views.list, name='list'),
    path('upcoming/', views.Uplist, name='Uplist'),
    path('create/', views.create, name='movie-create'),
    path('create2/', views.Upcreate, name='movie-create2'),

    path('movie/<int:id>/', views.detail, name='movie-detail'),
    path('review/list/', views.review_list, name='review-list'),
    path('movie/<int:movie_id>/review/create/', views.review_create, name='review-create'),
    path('movie/<int:movie_id>/review/delete/<int:review_id>', views.review_delete, name='review-delete'),
]
