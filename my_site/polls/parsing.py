import requests
import json
import pandas as pd
import time
from datetime import date, timedelta


def daily_boxoffice():
    yesterday = date.today() - timedelta(1)
    yesterday_time = yesterday.strftime('%Y%m%d')

    url = 'https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=e7e124bb3ca8d0b4ebdf6269f1ffb860&targetDt='+yesterday_time

    res = requests.get(url)
    text = res.text

    d = json.loads(text)
    movie = []
    for b in d['boxOfficeResult']['dailyBoxOfficeList']:
        movie.append([b['rank'], b['rankOldAndNew'], b['movieCd'],b['movieNm'],b['salesAmt'],b['audiCnt']])

    data = pd.DataFrame(movie)
    data.to_csv("daily_boxoffice.csv", mode='w', encoding='utf-8', index=False)

    print(data)



#def movie_Code():


def movie_Info():
    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=e7e124bb3ca8d0b4ebdf6269f1ffb860&movieCd=20124079'

    res = requests.get(url)
    text = res.text

    d = json.loads(text)
    movie = []

    movie_gen = []
    for gen in d['movieInfoResult']['movieInfo']['genres']:
        movie_gen.append(gen['genreNm'])

    print(movie_gen)

    #영화코드/영화명/개봉일/개봉여부/장르
    movie.append([d['movieInfoResult']['movieInfo']['movieCd'],
                d['movieInfoResult']['movieInfo']['movieNm'],
                d['movieInfoResult']['movieInfo']['openDt'],
                d['movieInfoResult']['movieInfo']['prdtStatNm'],
                d[movie_gen[0]], d[movie_gen[1]]
                ])

    data = pd.DataFrame(movie)
    data.to_csv("movie_Info.csv", mode='w', encoding='utf-8', index=False)

    print(data)


movie_Info()



