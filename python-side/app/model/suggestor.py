import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import configparser

config = configparser.ConfigParser()
config.read(os.path.join(root, 'config.ini'))

# from sklearn import cross_validation as cv
import numpy as np
import pandas as pd
from app.model.db_connector import *
from app.model.item_recognizer import EntityRecognizer
from app.model.collaborative_filter import CollaborativeFilter

import utils.nlp_utils as nlp
import utils.utils as utils

MAX_SUGGEST_BY_MOVIE = 7
MAX_SUGGEST = 5


class Suggestor:
    obj_movies = Movies()
    obj_genres = Genres()

    def __init__(self):
        print("====> INIT SUGGESTOR")
        self.data_movies = self.obj_movies.find_all()
        self.data_genres = self.obj_genres.find_all()
        self.data_titles = [x["movie_title"].lower() for x in self.data_movies]
        self.genres_name = [x["genre_name"] for x in self.data_genres]
        self.movies_vec = [self.create_movie_vec(x) for x in self.data_movies]

    def create_movie_vec(self, movie):
        movie_vec = []
        for genre in self.genres_name:
            if genre in movie["movie_genres"]:
                movie_vec.append(1)
            else:
                movie_vec.append(0)
        return movie_vec

    def get_movies_similarity(self, movie_idx):
        results = []
        for i in range(len(self.movies_vec)):
            results.append(nlp.calculate_cosin_similarity(
                self.movies_vec[movie_idx], self.movies_vec[i]))

        results = np.array(results)
        results = results.argsort()[::-1][:MAX_SUGGEST_BY_MOVIE]
        return list(results)

    def suggest_movies(self, arr_movie_title, chatbot=True):
        suggest_movies_idx = []
        arr_idx = []
        for movie in arr_movie_title:
            idx = -1
            for m in self.data_titles:
                if movie.lower() in m:
                    idx = self.data_titles.index(m)
                    arr_idx.append(idx)
            suggest_movies_idx.extend(self.get_movies_similarity(idx))

        suggest_movies_idx = list(set().union(suggest_movies_idx))
        for idx in arr_idx:
            if idx in suggest_movies_idx:
                suggest_movies_idx.remove(idx)
        suggest_movies_idx = suggest_movies_idx[:MAX_SUGGEST]

        if chatbot:
            suggest_movies = [x["movie_title"] for x in self.data_movies if
                              self.data_movies.index(x) in suggest_movies_idx]
        else:
            suggest_movies = [x for x in self.data_movies if
                              self.data_movies.index(x) in suggest_movies_idx]
        return suggest_movies


class SuggestBasedUser:
    obj_movies = Movies()

    def __init__(self):
        self.cf = CollaborativeFilter(k=30, uuCF=1)

    def suggest_movies(self, user_id):
        suggest_movies = []
        print("==> SUGGEST MOVIE FOR USER")
        movies_recommend_for_user = self.cf.recommend_for_user(user_id)
        movies_suggested_id = [x["movie_id"] for x in movies_recommend_for_user]
        for movie_id in movies_suggested_id:
            result = self.get_movie_title(movie_id)
            if result is not None:
                suggest_movies.append(result["movie_title"])
        return suggest_movies

    def get_movie_title(self, movie_id):
        return self.obj_movies.find_one({"movie_id": movie_id})


if __name__ == "__main__":
    # suggestor = Suggestor()
    # print(suggestor.suggest_movies(["jumanji", "toy story"], chatbot=False))

    # sbu = SuggestBasedUser()
    # print(sbu.suggest_movies("1"))

    print(nlp.calculate_cosin_similarity([1, 0, 1, 0, 0], [1, 0, 0, 1, 1]))
