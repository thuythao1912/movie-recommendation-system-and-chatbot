import os
import sys
from pathlib import Path

sys.path.append(os.path.join('../..'))
root = Path(os.path.abspath(__file__)).parents[2]

from app.model.intent_recognizer import IntentRecognizer

global intent_recognizer
intent_recognizer = IntentRecognizer()