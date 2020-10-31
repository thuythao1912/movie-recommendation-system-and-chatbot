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

            row_title = row["title"]
            if ")" in row_title:
                title = row_title[:row_title.rindex(")") - 6]
                movie_year = row_title[row_title.rindex(")") - 4: row_title.rindex(")")]

            # if len(title) > 1:
            #     movie_year = title[1].replace(")", "")
            # else:
            #     movie_year = ""
            #
            list_movies.append({"movie_id": row["movieId"], "movie_title": title, "movie_year": movie_year,
                                "movie_genres": row["genres"].replace("|", ", "), "movie_actors": "",
                                "movie_producers": ""})

        for i in range(len(genres)):
            list_genres.append({"genre_id": i + 1, "genre_name": genres[i], "genre_description": ""})

        # save excel genres
        utils.save_excel(pd.DataFrame(list_genres), os.path.join(
            root, "\\".join(data_folder), "genres.xlsx"))

        # save excel movies-genres
        utils.save_excel(pd.DataFrame(list_movies), os.path.join(
            root, "\\".join(data_folder), "movies.xlsx"))


    def create_json_from_excel(self, data_folder, type):
        data_source = utils.load_excel(os.path.join(
            root, "\\".join(data_folder), f"{type}.xlsx"))

        if type == "movies":
            movie_genres_col = []
            for i in data_source["Sheet1"]["movie_genres"]:
                movie_genres_col.append(i.split(", "))
            data_source["Sheet1"]["movie_genres"] = movie_genres_col

        # save to json
        utils.save_json(data_source["Sheet1"], os.path.join(
            root, "\\".join(data_folder), f"{type}.json"))


if __name__ == "__main__":
    rdp = RawDataProcessor()

    # Test split_raw_data
    rdp.split_raw_data(["data", "raw_data"], 100)

    # Test create_json_from_excel for movies
    rdp.create_json_from_excel(["data", "raw_data"], "movies")

    # Test create_json_from_excel for genres
    rdp.create_json_from_excel(["data", "raw_data"], "genres")
