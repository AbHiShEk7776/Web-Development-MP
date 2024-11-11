// src/components/ui/dialog.js

import React from 'react';

export const Dialog = ({ isOpen, title, children, onClose, className = '', actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg z-60 max-w-lg w-full ${className}`}>
        {title && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
        {actions && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export const DialogTrigger = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 dark:bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-500 dark:hover:bg-blue-400 transition duration-200"
    >
      {children}
    </button>
  );
};

export const DialogContent = ({ children }) => {
  return (
    <div className="p-4 text-gray-800 dark:text-gray-200">
      {children}
    </div>
  );
};

export const DialogHeader = ({ children }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-600 pb-2">
      {children}
    </div>
  );
};

export const DialogTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
      {children}
    </h3>
  );
};

export const DialogDescription = ({ children }) => {
  return (
    <p className="text-gray-600 dark:text-gray-400 mt-1">
      {children}
    </p>
  );
};

export const DialogClose = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 transition duration-200"
    >
      &times;
    </button>
  );
};
