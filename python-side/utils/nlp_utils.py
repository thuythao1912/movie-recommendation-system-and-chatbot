import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import string
from pyvi import ViTokenizer, ViPosTagger, ViUtils
from fuzzysearch import find_near_matches


def tokenize(doc):
    return ViTokenizer.tokenize(doc)


def normalize(doc):
    return doc.lower()


def standardize(doc):
    return doc


def remove_punctuation(doc):
    for c in string.punctuation:
        if c != "_":
            doc = doc.replace(c, " ")
    return doc


def remove_stop_word(doc):
    return doc


def preprocess_step_1(doc):
    doc = normalize(doc)
    doc = standardize(doc)
    doc = remove_punctuation(doc)
    return doc


def approximate_search(substring, string):
    output = {"matched": "", "score": 0}
    result = find_near_matches(substring, string, max_deletions=1, max_insertions=1, max_substitutions=0)
    print(result)
    if len(result) > 0:
        output["matched"] = result[0].matched
        output["score"] = 1 -(round(result[0].dist / len(substring), 2))
    return output

def remove_accents(doc):
    return ViUtils.remove_accents(doc).decode('utf-8')


