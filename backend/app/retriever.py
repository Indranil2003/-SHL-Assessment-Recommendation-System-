
import pandas as pd  
from sentence_transformers import SentenceTransformer, util 
# model = SentenceTransformer("multi-qa-mpnet-base-dot-v1") #  

class AssessmentRetriever:  
    def __init__(self, data: pd.DataFrame):  
        self.data = data  
        # Load a pre-trained model  
        self.model = SentenceTransformer('all-MiniLM-L6-v2')  
        # self.model = SentenceTransformer('all-roberta-large-v1') 
        # Embed the assessment texts  
        self.assessment_embeddings = self._embed_assessments()  

    def _embed_assessments(self):  
        # Combine relevant fields into a single string for semantic embedding  
        assessment_texts = self.data.apply(  
            lambda row: f"{row['Assessment Name']} {row['Test Type']} Remote: {row['Remote Testing Support']} "  
                        f"IRT: {row['Adaptive/IRT Support']} Duration: {row['Duration']}",   
            axis=1  
        )  
        return self.model.encode(assessment_texts.tolist(), convert_to_tensor=True)  
        
    def search(self, query: str, top_k: int = 10):                 
        # Embed the query  
        query_embedding = self.model.encode(query, convert_to_tensor=True)  
        scores = util.cos_sim(query_embedding, self.assessment_embeddings)[0]  

        # Prevent top_k from exceeding number of items  
        top_k = min(top_k, scores.shape[0])  

        # Get top results  
        top_results = scores.topk(k=top_k)  

        results = []  
        for score, idx in zip(top_results.values, top_results.indices):  
            row = self.data.iloc[int(idx)]  # Ensure idx is an integer  
            results.append({              
    # "Assessment Name": row["Assessment Name"],  
    # "Link": row["URL"],  
    # "Remote Testing Support": row["Remote Testing Support"],  
    # "Adaptive/IRT Support": row["Adaptive/IRT Support"],  
    # "Duration": int(row["Duration"]),  
    # "Test Type": row["Test Type"],  
    # "Score": float(score)
            "url": row["URL"],
            "adaptive_support": row["Adaptive/IRT Support"],
            "description": f"{row['Assessment Name']} test assessing skills in {row['Skills']}.",
            "duration": int(row["Duration"]),
            "remote_support": row["Remote Testing Support"],
            "test_type": [row["Test Type"]]

})

        return results  
