from django.shortcuts import render, redirect, get_object_or_404
from new.models import Movie, Review, UpMovie
from django.core.paginator import Paginator
from new.forms import MovieForm, ReviewForm, UpMovieForm
from django.http import HttpResponseRedirect
import os
import requests
from django.db.models import Count


def Uplist(request):
    upmovies = UpMovie.objects.all().order_by('-release_date')
    paginator = Paginator(upmovies, 5)

    page = request.GET.get('page')
    items2 = paginator.get_page(page)

    context = {
        'upmovies': items2
    }
    return render(request, 'new/upcoming.html', context)


def list(request):
    movies = Movie.objects.all().annotate(reviews_count=Count('review')).order_by('-release_date')
    paginator = Paginator(movies, 5)

    page = request.GET.get('page')
    items = paginator.get_page(page)

    context = {
        'movies': items
    }
    return render(request, 'new/list.html', context)


def create(request):
    # the movie db key
    TMD_KEY = "50345352d8804fc2856b251bde51011d"


    for n in range(1, 6):
        num = str(n)

        LIST_URL = f"https://api.themoviedb.org/3/discover/movie?api_key={TMD_KEY}&language=ko-KR&page={num}"
        listData = requests.get(LIST_URL)
        resDatas = listData.json().get('results')

        for resData in resDatas:

            tmd_id = resData.get('id')

            DETAIL_URL = f"https://api.themoviedb.org/3/movie/{tmd_id}?api_key={TMD_KEY}&language=ko-KR"
            detailData = requests.get(DETAIL_URL)

            CREDITS_URL = f"https://api.themoviedb.org/3/movie/{tmd_id}/credits?api_key={TMD_KEY}"
            creditsData = requests.get(CREDITS_URL)
            resdirectors = creditsData.json().get('crew')

            for n in range(5):
                if resdirectors[n].get('job') == 'Director':
                    director = resdirectors[n].get('name')
                    break
                else:
                    director = ""


            resDetailData = detailData.json().get('production_companies')
            if resDetailData:
                company = resDetailData[0].get('name')
            else:
                company = ""


            if detailData.json().get('homepage') != None:
                homepage = detailData.json().get('homepage')
            else:
                homepage = ""


            if detailData.json().get('genres'):
                genre = detailData.json().get('genres')[0].get('name')
            else:
                genre = ""

            Movie.objects.get_or_create(
                title=resData.get('title'),
                backdrop_path="https://image.tmdb.org/t/p/original" + resData.get('backdrop_path'),
                poster_path="https://image.tmdb.org/t/p/original" + resData.get('poster_path'),
                overview=detailData.json().get('overview'),
                release_date=detailData.json().get('release_date'),
                genre=detailData.json().get('genres')[0].get('name'),
                production_company=company,
                tmd_id=tmd_id,
                director=director,
                homepage=homepage,
            )
    return render(request, 'new/create.html')


def Upcreate(request):
    # the movie db key
    TMD_KEY = "50345352d8804fc2856b251bde51011d"


    for n in range(1, 6):
        num = str(n)

        LIST_URL2 = f"https://api.themoviedb.org/3/movie/upcoming?api_key={TMD_KEY}&language=ko-KR&page={num}"
        listData2 = requests.get(LIST_URL2)
        resDatas2 = listData2.json().get('results')

        for resData2 in resDatas2:

            tmd_id = resData2.get('id')

            DETAIL_URL2 = f"https://api.themoviedb.org/3/movie/{tmd_id}?api_key={TMD_KEY}&language=ko-KR"
            detailData2 = requests.get(DETAIL_URL2)

            CREDITS_URL2 = f"https://api.themoviedb.org/3/movie/{tmd_id}/credits?api_key={TMD_KEY}"
            creditsData2 = requests.get(CREDITS_URL2)
            resdirectors2 = creditsData2.json().get('crew')

            for n in range(5):
                if resdirectors2[n].get('job') == 'Director':
                    director = resdirectors2[n].get('name')
                    break
                else:
                    director = ""


            resDetailData2 = detailData2.json().get('production_companies')
            if resDetailData2:
                company = resDetailData2[0].get('name')
            else:
                company = ""


            if detailData2.json().get('homepage') != None:
                homepage = detailData2.json().get('homepage')
            else:
                homepage = ""


            if detailData2.json().get('genres'):
                genre = detailData2.json().get('genres')[0].get('name')
            else:
                genre = ""

            UpMovie.objects.get_or_create(
                title=resData2.get('title'),
                backdrop_path="https://image.tmdb.org/t/p/original" + resData2.get('backdrop_path'),
                poster_path="https://image.tmdb.org/t/p/original" + resData2.get('poster_path'),
                overview=detailData2.json().get('overview'),
                release_date=detailData2.json().get('release_date'),
                genre=detailData2.json().get('genres')[0].get('name'),
                production_company=company,
                tmd_id=tmd_id,
                director=director,
                homepage=homepage,
            )
    return render(request, 'new/create2.html')


def detail(request, id):
    if id is not None:
        item = get_object_or_404(Movie, pk=id)
        reviews = Review.objects.filter(movie=item).all()
        return render(request, 'new/detail.html', {'item': item, 'reviews': reviews})

    return HttpResponseRedirect('/new/list/')


def review_create(request, movie_id):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            new_item = form.save()
        return redirect('movie-detail', id=movie_id)

    item = get_object_or_404(Movie, pk=movie_id)
    form = ReviewForm(initial={'movie': item})
    return render(request, 'new/review_create.html', {'form': form, 'item':item})


def review_delete(request, movie_id, review_id):
    item = get_object_or_404(Review, pk=review_id)
    item.delete()

    return redirect('movie-detail', id=movie_id)


def review_list(request):
    reviews = Review.objects.all().select_related()
    paginator = Paginator(reviews, 10)

    page = request.GET.get('page')
    items = paginator.get_page(page)

    context = {
        'reviews': items
    }
    return render(request, 'new/review_list.html', context)


