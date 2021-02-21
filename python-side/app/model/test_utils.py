import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]
import utils.nlp_utils as nlp

if __name__ == "__main__":
    print(nlp.standardize("bạn khỏe k"))
