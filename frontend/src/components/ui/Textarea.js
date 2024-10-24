// import React from 'react';

// export function Textarea({ className, ...props }) {
//   return (
//     <textarea className={`textarea ${className}`} {...props}></textarea>
//   );
// }


import React from 'react';

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    ></textarea>
  );
}
