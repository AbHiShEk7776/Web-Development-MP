// src/components/ui/button.js

import React from 'react';

// Button component
export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false 
}) => {
  // Define button styles based on the variant
  const baseStyle = 'px-4 py-2 font-semibold text-sm rounded focus:outline-none transition duration-200';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500',
  };

  const appliedStyles = `${baseStyle} ${disabled ? variantStyles.disabled : variantStyles[variant]} ${className}`;

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={appliedStyles} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};
