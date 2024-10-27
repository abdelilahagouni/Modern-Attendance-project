import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

export const Stats = () => {
  const { state } = useAttendance();
  const { students, attendance, selectedDate } = state;

  const todayStats = {
    total: students.length,
    present: attendance.filter(a => a.date === selectedDate && a.status === 'present').length,
    absent: attendance.filter(a => a.date === selectedDate && a.status === 'absent').length,
    late: attendance.filter(a => a.date === selectedDate && a.status === 'late').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <p className="text-2xl font-semibold text-gray-900">{todayStats.total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <UserCheck className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Present</p>
            <p className="text-2xl font-semibold text-gray-900">{todayStats.present}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <UserX className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <p className="text-2xl font-semibold text-gray-900">{todayStats.absent}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Late</p>
            <p className="text-2xl font-semibold text-gray-900">{todayStats.late}</p>
          </div>
        </div>
      </div>
    </div>
  );
};