import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Calendar } from 'lucide-react';

export const DateSelector = () => {
  const { state, dispatch } = useAttendance();

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <Calendar className="h-5 w-5 text-gray-500" />
      <input
        type="date"
        value={state.selectedDate}
        onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })}
        className="form-input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
};