import pandas as pd
import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.nlp_utils as nlp
import utils.utils as utils

class RawDataProcessor:
    def __init__(self):
        pass

    def split_raw_data(self, data_folder, data_num=None):
        data = utils.load_csv(os.path.join(
            root, "\\".join(data_folder), "movies.csv"))
        genres = []
        years = []

        data = data if data_num is None else data.head(data_num)
        print(data)
        list_genres = []
        list_movies = []
        for index, row in data.iterrows():
            print(row)
            if row["genres"] is not "(no genres listed)":
                genres.extend(row["genres"].split("|"))
                genres = list(set().union(genres))
                genres = list(
                    filter(lambda x: x != "(no genres listed)", genres))

            title = row["title"].split("(")

            if len(title) > 1:
                movie_year = title[1].replace(")", "")
            else:
                movie_year = ""

            list_movies.append({"movieId": row["movieId"], "title": title[0], "year": movie_year,
                                "genres": row["genres"].replace("|", ", ")})

        for i in range(len(genres)):
            list_genres.append({"genreId": i + 1, "genreName": genres[i]})

        # save excel genres
        utils.save_excel(pd.DataFrame(list_genres), os.path.join(
            root, "\\".join(data_folder), "genres.xlsx"))

        # save excel movies-genres
        utils.save_excel(pd.DataFrame(list_movies), os.path.join(
            root, "\\".join(data_folder), "movies.xlsx"))

    def create_json_from_excel(self, data_folder, type):
        data_source = utils.load_excel(os.path.join(
            root, "\\".join(data_folder), f"{type}.xlsx"))
        utils.save_json(data_source["Sheet1"], os.path.join(
            root, "\\".join(data_folder), f"{type}.json"))


if __name__ == "__main__":
    rdp = RawDataProcessor()

    # Test split_raw_data
    rdp.split_raw_data(["data", "raw_data"], 50)

    # Test create_json_from_excel for movies
    rdp.create_json_from_excel(["data", "raw_data"], "movies")

    # Test create_json_from_excel for genres
    rdp.create_json_from_excel(["data", "raw_data"], "genres")
