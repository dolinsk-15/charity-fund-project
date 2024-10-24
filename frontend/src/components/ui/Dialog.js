// import React from 'react';

// export function Dialog({ open, onOpenChange, children }) {
//   // Implement dialog functionality
//   return open ? (
//     <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
//       <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   ) : null;
// }

// export function DialogContent({ children }) {
//   return <div>{children}</div>;
// }

// export function DialogHeader({ children }) {
//   return <div className="dialog-header">{children}</div>;
// }

// export function DialogTitle({ children }) {
//   return <h3>{children}</h3>;
// }


import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  // Функциональность диалога
  return open ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
}

export function DialogContent({ children }) {
  return <div className="mt-4">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="border-b pb-2 mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h3 className="text-xl font-bold">{children}</h3>;
}
