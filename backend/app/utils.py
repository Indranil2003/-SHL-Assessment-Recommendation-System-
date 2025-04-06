# utils.py

import pandas as pd

def load_assessment_data(file_path: str):
    df = pd.read_csv(file_path)
    return df
