from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=150)
    tmd_id = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    overview = models.TextField()
    production_company = models.CharField(max_length=50)
    homepage = models.CharField(max_length=150)
    release_date = models.CharField(max_length=50)
    backdrop_path = models.CharField(max_length=150)
    director = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class UpMovie(models.Model):
    title = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=150)
    tmd_id = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    overview = models.TextField()
    production_company = models.CharField(max_length=50)
    homepage = models.CharField(max_length=150)
    release_date = models.CharField(max_length=50)
    backdrop_path = models.CharField(max_length=150)
    director = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Review(models.Model):
    comment = models.CharField(max_length=500)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
