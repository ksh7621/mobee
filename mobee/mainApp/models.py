from django.db import models

# Create your models here.
from django.db import models

class Mobee(models.Model):
    title = models.CharField(max_length=200)
    id = models.IntegerField(primary_key=True)

    def __str__(self):
        """A string representation of the model."""
        return self.title
