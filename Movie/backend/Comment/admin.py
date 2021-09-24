from django.contrib import admin
from .models import Comment

class CommentAdmin(admin.ModelAdmin):
    list_display = ('Movie_ID','CommentText', 'Writer', 'score')

# Register your models here.

admin.site.register(Comment, CommentAdmin)