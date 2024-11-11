// src/components/LogoutButton.js

import React from 'react';
import { LogOut } from 'lucide-react'; // Using Lucide icon for logout

const LogoutButton = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="ml -auto flex items-center bg-red-600 text-white py-1.5 px-3 rounded-md shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </button>
  );
};

export default LogoutButton;
