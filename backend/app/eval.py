import requests
import re

def recall_at_k(relevant, retrieved, k):
    retrieved_k = retrieved[:k]
    hits = len(set(relevant) & set(retrieved_k))
    return hits / len(relevant) if relevant else 0

def average_precision_at_k(relevant, retrieved, k):
    score = 0.0
    hits = 0
    for i in range(min(k, len(retrieved))):
        if retrieved[i] in relevant:
            hits += 1
            score += hits / (i + 1)
    return score / min(len(relevant), k) if relevant else 0

def f1_score_at_k(relevant, retrieved, k):
    retrieved_k = retrieved[:k]
    hits = len(set(relevant) & set(retrieved_k))
    precision = hits / k if k else 0
    recall = hits / len(relevant) if relevant else 0
    return (2 * precision * recall) / (precision + recall) if (precision + recall) else 0

def preprocess_query(query):
    # Lowercase and remove extra spaces
    return re.sub(r'\s+', ' ', query.strip().lower())

def evaluate(test_cases, k=3):
    recalls = []
    maps = []
    f1s = []

    for case in test_cases:
        query = preprocess_query(case['query'])
        relevant = case['relevant']

        try:
            response = requests.post("https://shl-assessment-recommendation-s-production.up.railway.app/recommend", json={
                "query": query,
                "top_k": k
            })
            response.raise_for_status()
            data = response.json()

            retrieved = [item['Assessment Name'] for item in data.get('recommendations', [])]

            recall = recall_at_k(relevant, retrieved, k)
            map_score = average_precision_at_k(relevant, retrieved, k)
            f1 = f1_score_at_k(relevant, retrieved, k)

            recalls.append(recall)
            maps.append(map_score)
            f1s.append(f1)

            print("=" * 60)
            print(f"Query: {case['query']}")
            print(f"Preprocessed: {query}")
            print(f"Relevant: {relevant}")
            print(f"Retrieved: {retrieved}")
            print(f"Recall@{k}: {recall:.4f}")
            print(f"MAP@{k}: {map_score:.4f}")
            print(f"F1@{k}: {f1:.4f}")

        except Exception as e:
            print(f"Error evaluating query '{query}':", str(e))

    print("\n" + "=" * 60)
    print(f"Overall Recall@{k}: {sum(recalls)/len(recalls):.4f}" if recalls else "No valid recall scores.")
    print(f"Overall MAP@{k}: {sum(maps)/len(maps):.4f}" if maps else "No valid MAP scores.")
    print(f"Overall F1@{k}: {sum(f1s)/len(f1s):.4f}" if f1s else "No valid F1 scores.")

if __name__ == "__main__":
    test_cases = [
    {
        "query": "AI coding test",
        "relevant": [
            "Java Programming Test",
            "C++ Programming Test",
            "Python Programming Test",
            "Machine Learning Test"
        ]
    },
    {
        "query": "numerical aptitude",
        "relevant": [
            "Numerical Reasoning Test",
            "Data Analysis Test",
            "Calculation Test",
            "SHL Verify Interactive – Numerical Reasoning"
        ]
    },
    {
        "query": "communication and soft skills",
        "relevant": [
            "Verbal Reasoning Test",
            "Situational Judgment Test",
            "Personality Questionnaire (OPQ)",
            "Customer Service Phone Solution"
        ]
    },
    {
        "query": "project management skills",
        "relevant": [
            "Project Management Skills Test",
            "Agile Project Management Test",
            "Operations Management Test",
            "Business Analysis Test"
        ]
    }
]



    evaluate(test_cases, k=3)
