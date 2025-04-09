// New optimized code

// import React from 'react';


// function ResultsDisplay({ results }) {
//   if (!results || results.length === 0) {
//     return (
//       <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
//         <p className="text-gray-500">No results yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">Recommendations:</h2>
//       <ul className="space-y-3">
//         {results.map((item, index) => (
//           <li
//             key={index}
//             className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <span className="font-medium text-gray-800">{item.title}</span>
//             <span className="text-gray-600"> ({item.skill} - {item.level}) - {item.duration} mins</span>
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
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
              {item.description}
            </a>
            <div className="text-gray-600">
              Type: {item.test_type.join(', ')} | Duration: {item.duration} mins | Remote: {item.remote_support} | Adaptive: {item.adaptive_support}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsDisplay;
