import React from 'react';

export const Switch = ({ label, isChecked, onChange }) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!isChecked); // Call onChange with the opposite of isChecked
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <SwitchLabel>{label}</SwitchLabel>
      <SwitchToggle isOn={isChecked} onClick={handleToggle} />
    </div>
  );
};

export const SwitchLabel = ({ children }) => {
  return <span className="text-gray-700 dark:text-gray-300">{children}</span>;
};

export const SwitchToggle = ({ isOn, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
        isOn ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
      } flex items-center`}
      aria-pressed={isOn}
    >
      <span
        className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      ></span>
    </button>
  );
};
