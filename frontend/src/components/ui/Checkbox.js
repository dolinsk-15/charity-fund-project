// import React from 'react';

// export function Checkbox({ id, checked, onCheckedChange }) {
//   return (
//     <input
//       type="checkbox"
//       id={id}
//       checked={checked}
//       onChange={(e) => onCheckedChange(e.target.checked)}
//     />
//   );
// }


import React from 'react';

export function Checkbox({ id, checked, onCheckedChange, className }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
    />
  );
}
