import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { BookOpen } from 'lucide-react';

export const SubjectSelector = () => {
  const { state, dispatch } = useAttendance();
  const { subjects, selectedSubject } = state;

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <BookOpen className="h-5 w-5 text-gray-500" />
      <select
        value={selectedSubject}
        onChange={(e) => dispatch({ type: 'SET_SUBJECT', payload: e.target.value })}
        className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name} ({subject.code}) - Year {subject.year}
          </option>
        ))}
      </select>
    </div>
  );
};