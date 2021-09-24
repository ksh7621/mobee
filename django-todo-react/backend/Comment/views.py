from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from .serializers import CommentSerializer
from .models import Comment
from django.http import JsonResponse

# Create your views here.

@csrf_exempt
def CommentView(request, movie_id):

    if request.method == 'GET':
        Comments = Comment.objects.filter(Movie_ID = movie_id)
        serializer = CommentSerializer(Comments, many = True)
        return JsonResponse(serializer.data, safe = False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def Comment_Detail(request, movie_id, id):
    try:
        Comments = Comment.objects.filter(Movie_ID = movie_id, id=id)
    except Comment.DoesNotExist:
        return JsonResponse(status=404)

    if request.method == 'DELETE':
        Comments.delete()
        serializer = CommentSerializer(Comments, many=True)
        return JsonResponse(serializer.data, status=204, safe=False)