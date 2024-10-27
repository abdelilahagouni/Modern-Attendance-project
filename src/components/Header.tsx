import React from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
            <h1 className="ml-4 text-xl font-semibold text-gray-900">Student Attendance System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
            <UserCircle className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>
      </div>
    </header>
  );
};