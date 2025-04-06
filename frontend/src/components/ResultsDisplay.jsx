// // src/components/ResultsDisplay.jsx
// import React from 'react';

// function ResultsDisplay({ results }) {
//   if (!results || results.length === 0) {
//     return <p className="mt-4 text-gray-500">No results yet.</p>;
//   }

//   return (
//     <div className="mt-4">
//       <h2 className="text-lg font-bold mb-2">Recommendations:</h2>
//       <ul className="list-disc ml-5 space-y-1">
//         {results.map((item, index) => (
//           <li key={index}>
//             {item.title} ({item.skill} - {item.level}) - {item.duration} mins
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ResultsDisplay;


import React from 'react';


function ResultsDisplay({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-500">No results yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Recommendations:</h2>
      <ul className="space-y-3">
        {results.map((item, index) => (
          <li
            key={index}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="font-medium text-gray-800">{item.title}</span>
            <span className="text-gray-600"> ({item.skill} - {item.level}) - {item.duration} mins</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsDisplay;
