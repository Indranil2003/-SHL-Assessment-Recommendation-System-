# SHL Assessment Recommender

A smart, single-page web application that takes a **natural language job description or skill requirement** as input and returns a list of relevant **SHL individual test recommendations**. The goal is to simplify and speed up assessment selection using NLP and intelligent mapping.

## 🧠 How It Works

- User inputs a job description or role-based query.
- The backend leverages a **fine-tuned LLM (like Mistral)** and a matching engine to parse the input and recommend the most suitable SHL tests.
- Output is presented on the same page with test **title, skill, level, and duration**.

---

## ⚙️ Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: FastAPI (Python)
- **LLM Integration**: Mistral-based custom recommendation logic
- **Deployment**: Railway (Backend)

---

## 🚀 Output (Example)

> **Input**: *“Looking for an assessment for Java of duration 40 minutes ”*\
> **Output**:

```
"Assessment Name": "Java Programming Test",
            "Link": "https://www.shl.com/solutions/products/product-catalog/view/java-8-new/",
            "Remote Testing Support": "Yes",
            "Adaptive/IRT Support": "Yes",
            "Duration": 40,
            "Test Type": "Technical"
```

---

## 🛠️ Getting Started

### 🔹 Backend Setup (FastAPI)

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Make sure the backend is running at `http://127.0.0.1:8000`.

### 🔹 Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Access the app at http\://localhost:5173



---

## 📆 File Structure

```
assessment_recommender/
├── backend/
│   ├── app/
│   │   ├── __pycache__/
│   │   ├── data/
│   │   ├── __init__.py
│   │   ├── eval.py
│   │   ├── generator.py
│   │   ├── main.py
│   │   ├── retriever.py
│   │   └── utils.py
│   ├── venv/
│   └── nixpacks.toml
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── QueryForm.jsx
│   │   │   └── ResultsDisplay.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## ✨ Features

- Natural language understanding with LLM
- Clean UI for fast interaction
- Real-time results without page reloads (SPA)
- Modular and extendable

