// import React from 'react';

// export function Progress({ value, className }) {
//   return (
//     <div className={`progress-bar ${className}`}>
//       <div className="progress-bar-fill" style={{ width: `${value}%` }}></div>
//     </div>
//   );
// }


import React from 'react';

export function Progress({ value, className }) {
  return (
    <div className={`w-full h-4 bg-gray-200 rounded ${className}`}>
      <div
        className="h-full bg-blue-500 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
