import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import clsx from "clsx";

// Tabs Root Component
export const Tabs = ({ defaultValue, children, className, ...props }) => (
  <RadixTabs.Root defaultValue={defaultValue} className={clsx("tabs-root", className)} {...props}>
    {children}
  </RadixTabs.Root>
);

// Tabs List Component
export const TabsList = React.forwardRef(({ children, className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={clsx("flex gap-4 border-b pb-2", className)}
    {...props}
  >
    {children}
  </RadixTabs.List>
));

// Tabs Trigger Component
export const TabsTrigger = React.forwardRef(({ value, children, className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    value={value}
    className={clsx(
      "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300",
      "hover:text-blue-500 hover:dark:text-blue-400 focus:outline-none",
      "data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600",
      className
    )}
    {...props}
  >
    {children}
  </RadixTabs.Trigger>
));

// Tabs Content Component
export const TabsContent = React.forwardRef(({ value, children, className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    value={value}
    className={clsx("py-4", className)}
    {...props}
  >
    {children}
  </RadixTabs.Content>
));

// Set display names for better debugging
Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";
