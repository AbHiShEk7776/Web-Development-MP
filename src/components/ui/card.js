// src/components/ui/card.js

import React from 'react';

export const Card = ({ title, children, className = '', footer }) => {
  if (!children) {
    return <div>No content to display</div>; // or any fallback UI
  }
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md rounded-lg overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white text-lg font-semibold">
          {title}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-t border-gray-300 dark:border-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

export const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 border-b border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-xl font-semibold text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </h2>
  );
};

export const CardDescription = ({ children, className }) => {
  return (
    <p className={`text-gray-600 dark:text-gray-400 text-sm ${className}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className }) => {
  return (
    <div className={`p-4 border-t border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </div>
  );
};
