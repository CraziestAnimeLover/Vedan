import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return <h3 className="text-lg font-bold mb-2">{children}</h3>;
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-600">{children}</div>;
};
