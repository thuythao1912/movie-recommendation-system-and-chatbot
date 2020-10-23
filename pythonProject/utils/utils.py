import os
import sys
from pathlib import Path

sys.path.append(os.path.join('..'))
root = Path(os.path.abspath(__file__)).parents[1]

import pandas as pd
import json
import codecs
import numpy as np

def load_json(json_path):
    return pd.read_json(json_path)

def save_json(data, path):
    with codecs.open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)



