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
      console.log(response.data.recommendations);
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
      <h3 className="card-title">{item.description}</h3>
      <p>
        <strong>URL:</strong>{' '}
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.url}
        </a>
      </p>
      <p><strong>Remote Support:</strong> {item.remote_support}</p>
      <p><strong>Adaptive Support:</strong> {item.adaptive_support}</p>
      <p><strong>Duration:</strong> {item.duration} mins</p>
      <p><strong>Test Type:</strong> {item.test_type}</p>
    </div>
  ))}
</div>

    </div>
  );
}

export default App;





// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [query, setQuery] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post('https://shl-assessment-recommendation-s-production.up.railway.app/recommend', {
//         query,
//         top_k: 10
//       });
//       setRecommendations(response.data.recommendations);
//       console.log(response.data.recommendations);
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
//           <div key={index} className="recommendation-card code-style">
//             <p><strong>"url"</strong>: "<a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>"</p>
//             <p><strong>"adaptive_support"</strong>: "{item.adaptive_support}"</p>
//             <p><strong>"description"</strong>: "{item.description}"</p>
//             <p><strong>"duration"</strong>: {item.duration}</p>
//             <p><strong>"remote_support"</strong>: "{item.remote_support}"</p>
//             <p><strong>"test_type"</strong>: [{item.test_type.map((type, i) => `"${type}"`).join(', ')}]</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
