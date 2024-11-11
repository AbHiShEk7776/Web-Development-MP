// src/components/MarketDropdownMenu.js

import React from 'react';
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu';
import { Navigate, useNavigate } from "react-router-dom"; 

export const MarketDropdownMenu = () => {
  const items = [
    { label: 'Stock Prediction', value: 'stockPrediction' },
    { label: 'News', value: 'news' },
    { label: 'Current Market Scenario', value: 'marketScenario' },
  ];
  const navigate = useNavigate();
  // Function to handle the item selection
  const handleItemSelect = (item) => {
    switch (item.value) {
      case 'stockPrediction':
        console.log('Navigate to Stock Prediction page');
        navigate("/recos")
        break;
      case 'news':
        console.log('Navigate to News page');
        navigate("/news")
        break;
      case 'marketScenario':
        console.log('Navigate to Current Market Scenario page');
        navigate("/market-scenario")
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu items={items} buttonLabel="Market Options" onItemSelect={handleItemSelect}>
      <DropdownMenuLabel>Market Options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {items.map((item) => (
        <DropdownMenuItem key={item.value} onClick={() => handleItemSelect(item)}>
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
};

export default MarketDropdownMenu;
