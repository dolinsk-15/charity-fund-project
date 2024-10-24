// import React from 'react';

// export function Card({ children, className }) {
//   return (
//     <div className={`card ${className}`}>
//       {children}
//     </div>
//   );
// }

// export function CardHeader({ children }) {
//   return <div className="card-header">{children}</div>;
// }

// export function CardTitle({ children }) {
//   return <h2 className="card-title">{children}</h2>;
// }

// export function CardContent({ children }) {
//   return <div className="card-content">{children}</div>;
// }


import React from 'react';

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="border-b pb-2 mb-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
