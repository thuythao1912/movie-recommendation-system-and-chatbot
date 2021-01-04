import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

from app.model.db_connector import Ratings


class CollaborativeFilter:
    def __init__(self, k, dist_func=cosine_similarity, uuCF=1):
        self.ratings = Ratings()
        self.uuCF = uuCF  # user-user (1) or item-item (0) CF
        self.Y_data = None
        self.k = k  # number of neighbor points
        self.dist_func = dist_func
        self.Ybar_data = None
        self.run()
        # number of users and items. Remember to add 1 since id starts from 0
        self.n_users = int(np.max(self.Y_data[:, 0])) + 1
        self.n_items = int(np.max(self.Y_data[:, 1])) + 1
        self.fit()
        # self.calculate_accuracy()

    def run(self):
        r_cols = ['user_id', 'movie_id', 'rating_score', 'rating_time']
        # ratings_base = pd.read_csv(os.path.join(root, "data", "raw_data", "ratings.csv"), sep='\t', names=r_cols).head(
        #     1714)
        data = pd.DataFrame(self.ratings.find_all())
        del data["_id"]
        del data["rating_time"]
        # del ratings_base["rating_time"]

        data["user_id"] = data["user_id"].astype(int)
        data["movie_id"] = data["movie_id"].astype(int)
        # print(data)
        # print(ratings_base)
        rate_train = data.values
        self.Y_data = rate_train if self.uuCF else rate_train[:, [1, 0, 2]]

    def add(self, new_data):
        """
        Update Y_data matrix when new ratings come.
        For simplicity, suppose that there is no new user or item.
        """
        self.Y_data = np.p((self.Y_data, new_data), axis=0)

    def normalize_Y(self):
        users = self.Y_data[:, 0]  # all users - first col of the Y_data
        self.Ybar_data = self.Y_data.copy()
        self.mu = np.zeros((self.n_users,))
        for n in range(self.n_users):
            if n > 0:
                # print("+", n)
                # row indices of rating done by user n
                # since indices need to be integers, we need to convert
                ids = np.where(users == n)[0].astype(np.int32)
                # print("///", ids)
                # indices of all ratings associated with user n
                item_ids = self.Y_data[ids, 1]
                # and the corresponding ratings
                ratings = self.Y_data[ids, 2]
                # print("+***", ratings)
                # take mean
                m = np.mean(ratings)
                # print("===", m)
                if np.isnan(m):
                    m = 0  # to avoid empty array and nan value
                # normalize
                self.Ybar_data[ids, 2] = ratings - self.mu[n]

        ################################################
        # form the rating matrix as a sparse matrix. Sparsity is important
        # for both memory and computing efficiency. For example, if #user = 1M,
        # #item = 100k, then shape of the rating matrix would be (100k, 1M),
        # you may not have enough memory to store this. Then, instead, we store
        # nonzeros only, and, of course, their locations.
        self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
                                       (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users))
        self.Ybar = self.Ybar.tocsr()

    def similarity(self):
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)

    def refresh(self):
        """
        Normalize data and calculate similarity matrix again (after
        some few ratings added)
        """
        self.normalize_Y()
        self.similarity()

    def fit(self):
        self.refresh()

    def __pred(self, u, i, normalized=1):
        """
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        # Step 1: find all users who rated i
        ids = np.where(self.Y_data[:, 1] == i)[0].astype(np.int32)
        # Step 2:
        users_rated_i = (self.Y_data[ids, 0]).astype(np.int32)
        # Step 3: find similarity btw the current user and others
        # who already rated i
        sim = self.S[u, users_rated_i]
        # Step 4: find the k most similarity users
        a = np.argsort(sim)[-self.k:]

        # and the corresponding similarity levels
        nearest_s = sim[a]

        # How did each of 'near' users rated item i
        r = self.Ybar[i, users_rated_i[a]]

        if normalized:
            # add a small number, for instance, 1e-8, to avoid dividing by 0
            return (r * nearest_s)[0] / (np.abs(nearest_s).sum() + 1e-8)
        return (r * nearest_s)[0] / (np.abs(nearest_s).sum() + 1e-8) + self.mu[u]

    def pred(self, u, i, normalized=1):
        """
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        if self.uuCF: return self.__pred(u, i, normalized)
        return self.__pred(i, u, normalized)

    def recommend(self, u):
        """
        Determine all items should be recommended for user u. (uuCF =1)
        or all users who might have interest on item u (uuCF = 0)
        The decision is made based on all i such that:
        self.pred(u, i) > 0. Suppose we are considering items which
        have not been rated by u yet.
        """
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()
        recommended_items = []
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.__pred(u, i)
                recommended_items.append({"movie_id": i, "rating": rating})
        recommended_items = sorted(recommended_items, key=lambda x: x["rating"], reverse=True)
        return recommended_items

    def print_recommendation(self):
        """
        print all items which should be recommended for each user
        """
        print('Recommendation: ')
        for u in range(5):
            recommended_items = self.recommend(u)

            if self.uuCF:
                print('    Recommend item(s):', recommended_items[:5], 'to user', u)

            else:
                print('    Recommend item', u, 'to user(s) : ', recommended_items[:5])

    def recommend_for_user(self, user_id):
        result = self.recommend(int(user_id))
        if len(result) > 5:
            return result[:5]
        return result

    def calculate_accuracy(self):
        r_cols = ['user_id', 'movie_id', 'rating', 'unix_timestamp']

        ratings_test = pd.read_csv(os.path.join(root, "data", "raw_data", "rating_test.csv"), sep='\t', names=r_cols)
        rate_test = ratings_test.values
        rate_test[:, :2] -= 1
        n_tests = rate_test.shape[0]
        SE = 0  # squared error
        for n in range(n_tests):
            pred = self.pred(rate_test[n, 0], rate_test[n, 1], normalized=0)
            SE += (pred - rate_test[n, 2]) ** 2

        RMSE = np.sqrt(SE / n_tests)
        print('User-user CF, RMSE =', RMSE)


if __name__ == "__main__":
    rs = CollaborativeFilter(k=20, uuCF=1)
    print(rs.recommend_for_user("1"))
