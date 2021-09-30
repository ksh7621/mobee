from django.db import models


# Create your models here.

class Comment(models.Model):
    Movie_ID = models.IntegerField(default=0)
    CommentText = models.TextField()
    Writer = models.TextField()
    score = models.IntegerField(default=0)

    def _str_(self):
        return self.CommentText