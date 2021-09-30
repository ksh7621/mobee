from django.http import JsonResponse
# Create your views here.
from rest_framework import generics
from rest_framework.parsers import JSONParser

from .models import Mobee
from .serializers import MobeeSerializer


class ListPost(generics.ListCreateAPIView):
    queryset = Mobee.objects.all()
    serializer_class = MobeeSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mobee.objects.all()
    serializer_class = MobeeSerializer


# def createPost(request):
#     if request.method == 'POST':
#         id = request.POST.get('id')
#         title = request.POST.get('title')
#
#         Mobee.objects.create(
#             id = id,
#             title=title,
#         )
#         print("success")
#     return JsonResponse({"status": 'Success'})

# def get_moviePost(request):
#     data = JSONParser().parse(request)
#     serializer = MobeeSerializer(data=data) #JSON -> Serialize
#     if serializer.is_valid(): # 타당성 검토 후 저장
#         serializer.save()
#         return JsonResponse(serializer.data, status=201)
#     return JsonResponse(serializer.errors, status=400)