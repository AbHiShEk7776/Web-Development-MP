// src/components/ui/dropdown-menu.js

import React, { useState } from 'react';

export const DropdownMenu = ({ items, buttonLabel, onItemSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onItemSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
          type="button" 
          className="inline-flex justify-between w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {buttonLabel}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.9l3.71-3.69a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0l-4.25-4.25a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuTrigger = ({ onClick }) => (
  <button
    className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
    onClick={onClick}
  >
    Open Menu
  </button>
);

export const DropdownMenuContent = ({ children }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
    {children}
  </div>
);

export const DropdownMenuItem = ({ children, onClick }) => (
  <button
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition duration-150"
    onClick={onClick}
  >
    {children}
  </button>
);

export const DropdownMenuLabel = ({ children }) => (
  <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
    {children}
  </div>
);

// Separator for dividing items in the Dropdown Menu
export const DropdownMenuSeparator = () => (
  <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
);
