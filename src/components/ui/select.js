import React from "react";
import { Listbox } from "@headlessui/react";

export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <SelectTrigger>
            <SelectValue value={value || placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </div>
      </Listbox>
    </div>
  );
};

export const SelectTrigger = ({ children }) => {
  return (
    <Listbox.Button className="flex justify-between items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200">
      {children}
    </Listbox.Button>
  );
};

export const SelectValue = ({ value }) => {
  return <span className="text-gray-800 dark:text-gray-300">{value}</span>;
};

export const SelectContent = ({ children }) => {
  return (
    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
      {children}
    </Listbox.Options>
  );
};

export const SelectItem = ({ value, children }) => {
  return (
    <Listbox.Option
      value={value}
      className={({ active, selected }) =>
        `cursor-pointer select-none relative px-4 py-2 ${
          active ? "bg-blue-600 text-white" : "text-gray-900 dark:text-gray-200"
        } ${selected ? "font-semibold" : "font-normal"}`
      }
    >
      {children}
    </Listbox.Option>
  );
};

{
  /* Fallback standard select element (optional) */
}
{
  /* <select
        className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select> */
}
