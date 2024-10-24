// import React from 'react';

// export function Switch({ checked, onCheckedChange }) {
//   return (
//     <label className="switch">
//       <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
//       <span className="slider"></span>
//     </label>
//   );
// }


import React from 'react';

export function Switch({ checked, onCheckedChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 
        peer-checked:bg-blue-500 transition duration-300`}
      ></div>
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 
        peer-checked:translate-x-5`}
      ></span>
    </label>
  );
}
