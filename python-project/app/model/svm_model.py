import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from app.transformer.feature_transformer import FeatureTransformer
from sklearn.linear_model import SGDClassifier

class SVMModel(object):
    def __init__(self):
        self.clf = self._init_pipeline()

    @staticmethod
    def _init_pipeline():
        pipe_line = Pipeline([
            ("transformer", FeatureTransformer()),
            ("vect", CountVectorizer()),
            ("tfidf", TfidfTransformer()),
            ("clf-svm", SGDClassifier(loss='log', penalty='l2', alpha=1e-3, max_iter=1000, random_state=None))
        ])

        return pipe_line