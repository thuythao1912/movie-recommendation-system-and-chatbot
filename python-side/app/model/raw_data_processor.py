import pandas as pd
import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

import utils.nlp_utils as nlp
import utils.utils as utils

from datetime import datetime


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
            description = []
            list_movies.append({"movie_id": row["movieId"], "movie_title": title, "movie_year": movie_year,
                                "movie_genres": row["genres"].replace("|", ", "), "movie_actors": "",
                                "movie_producers": "", "movie_images": "",
                                "movie_description": None,
                                "movie_trailer": "OLK3m02o7xE",
                                "movie_overview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a "
                                                  "justo neque. Cras vitae elementum urna, vel mattis ligula. Nunc "
                                                  "sit amet nisi consectetur, aliquam odio non, ultricies felis. "
                                                  "Donec vel mollis arcu. Phasellus nisl nibh, mattis ut eros id, "
                                                  "egestas consequat sapien. Sed dolor est, consequat in sodales eu, "
                                                  "pellentesque et tellus. Vivamus ultricies fringilla erat, "
                                                  "ac eleifend sem fermentum a. Aenean faucibus nisi non libero "
                                                  "consectetur fermentum. Quisque id suscipit nisl, in mattis "
                                                  "dui.Cras ultricies ullamcorper arcu ac commodo. Interdum et "
                                                  "malesuada fames ac ante ipsum primis in faucibus. Duis dignissim "
                                                  "sapien ex, at gravida urna porta maximus. Suspendisse arcu enim, "
                                                  "tincidunt eu gravida vitae, tempor non arcu. Fusce maximus libero "
                                                  "justo, eget laoreet mi elementum vel. Etiam ut mi libero. Fusce "
                                                  "eget fermentum nisl, vitae elementum nulla. Sed eget tristique "
                                                  "est. Sed nec accumsan est.Phasellus bibendum vestibulum arcu, "
                                                  "vitae consectetur erat iaculis sit amet. In quis justo non augue "
                                                  "iaculis hendrerit eu quis orci. Phasellus sed consequat eros. "
                                                  "Aliquam erat volutpat. Sed nibh arcu, ullamcorper ut faucibus sit "
                                                  "amet, efficitur eget ante. Curabitur gravida interdum orci et "
                                                  "accumsan. Phasellus laoreet luctus porttitor. Fusce ac lobortis "
                                                  "orci. Vivamus nec pretium velit. Cras tellus lectus, "
                                                  "imperdiet eget vehicula ac, vehicula in nunc. Aliquam dictum elit "
                                                  "pellentesque nulla feugiat, ac volutpat lectus rutrum. Morbi eu "
                                                  "leo eget dolor aliquet aliquam. Maecenas vehicula vel nunc nec "
                                                  "tincidunt. Sed lobortis ultricies lorem, ut facilisis odio commodo "
                                                  "quis. Morbi non eleifend dolor, id sagittis augue. Suspendisse "
                                                  "bibendum molestie dui nec mattis."})

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

    def rating_split(self, data_folder, movies_num, users_num, data_num=None):
        data = utils.load_csv(os.path.join(
            root, "\\".join(data_folder), "ratings_new.csv"))
        list_data = []

        for index, row in data.iterrows():
            if row["user_id"] <= users_num and row["movie_id"] <= movies_num and row["rating_score"].is_integer():
                list_data.append({"user_id": (row["user_id"]), "movie_id": (row["movie_id"]),
                                  "rating_score": row["rating_score"],
                                  "rating_time": datetime.now().strftime("%d-%m-%Y %H:%M:%S")})

                list_data = list_data if data_num is None else list_data.head(data_num)
        list_data = pd.DataFrame(list_data)

        # save excel genres
        utils.save_excel(pd.DataFrame(list_data), os.path.join(
            root, "\\".join(data_folder), "ratings.xlsx"))


if __name__ == "__main__":
    rdp = RawDataProcessor()

    # Test split_raw_data
    rdp.split_raw_data(["data", "raw_data"], 300)

    # Test create_json_from_excel for movies
    rdp.create_json_from_excel(["data", "raw_data"], "movies")

    # Test create_json_from_excel for genres
    rdp.create_json_from_excel(["data", "raw_data"], "genres")

    # Test rating_split
    rdp.rating_split(["data", "raw_data"], 300, 20)
    #
    # Test create_json_from_excel for ratings
    rdp.create_json_from_excel(["data", "raw_data"], "ratings")
