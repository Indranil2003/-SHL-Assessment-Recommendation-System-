import React, { useState } from 'react';


function QueryForm({ onResults }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://shl-assessment-recommendation-s-production.up.railway.app/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    onResults(data.recommendations);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <label
        htmlFor="query"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Enter your assessment query
      </label>
      <textarea
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your query here..."
        rows={5}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default QueryForm;
