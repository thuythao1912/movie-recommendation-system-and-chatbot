import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import string
from pyvi import ViTokenizer, ViPosTagger, ViUtils


def tokenize(doc):
    return ViTokenizer.tokenize(doc)


def normalize(doc):
    return doc.lower()


def standardize(doc):
    return doc


def remove_punctuation(doc):
    for c in string.punctuation:
        doc = doc.replace(c, " ")

    return doc


def remove_stop_word(doc):
    return doc


def preprocess_step_1(doc):
    doc = normalize(doc)
    doc = standardize(doc)
    doc = remove_punctuation(doc)
    return doc


def preprocess_step_2(doc):
    remove_stop_word(doc)
    return doc


def add_accent(doc):
    print(ViUtils.add_accents(u'anh co yeu em khong'))

add_accent("a")