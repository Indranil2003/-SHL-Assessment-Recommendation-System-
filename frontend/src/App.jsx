


import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('https://shl-assessment-recommendation-s-production.up.railway.app/recommend', {
        query,
        top_k: 10
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Assessment Recommender</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter your query"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {loading && <p className="loading-text">Loading recommendations...</p>}

      {!loading && recommendations.length === 0 && (
        <p className="no-results">No recommendations yet. Try a search!</p>
      )}

      <div className="results-container">
        {recommendations.map((item, index) => (
          <div key={index} className="recommendation-card">
            <h3 className="card-title">{item["Assessment Name"]}</h3>
            <p>
              <strong>URL:</strong>{' '}
              <a href={item.Link} target="_blank" rel="noopener noreferrer">
                {item.Link}
              </a>
            </p>
            <p><strong>Remote Testing Support:</strong> {item["Remote Testing Support"]}</p>
            <p><strong>Adaptive/IRT Support:</strong> {item["Adaptive/IRT Support"]}</p>
            <p><strong>Duration:</strong> {item.Duration} mins</p>
            <p><strong>Test Type:</strong> {item["Test Type"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;








// import { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Import custom CSS

// function App() {
//   const [query, setQuery] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/recommend', {
//         query,
//         top_k: 10
//       });
//       setRecommendations(response.data.recommendations);
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       <h1 className="title">Assessment Recommender</h1>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter your query"
//           className="search-input"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={handleSearch} className="search-button">
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </div>

//       {loading && <p className="loading-text">Loading recommendations...</p>}

//       {!loading && recommendations.length === 0 && (
//         <p className="no-results">No recommendations yet. Try a search!</p>
//       )}

//       <div className="results-container">
//         {recommendations.map((item, index) => (
//           <a
//             key={index}
//             href={item.Link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="recommendation-card-link"
//           >
//             <div className="recommendation-card">
//               <h3 className="card-title">{item["Assessment Name"]}</h3>
//               <p><strong>URL:</strong> {item.Link}</p>
//               <p><strong>Remote Testing Support:</strong> {item["Remote Testing Support"]}</p>
//               <p><strong>Adaptive/IRT Support:</strong> {item["Adaptive/IRT Support"]}</p>
//               <p><strong>Duration:</strong> {item.Duration} mins</p>
//               <p><strong>Test Type:</strong> {item["Test Type"]}</p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
