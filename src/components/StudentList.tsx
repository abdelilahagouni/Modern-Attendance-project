import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export const StudentList = () => {
  const { state, dispatch } = useAttendance();
  const { students, selectedDate, selectedSubject, attendance, subjects } = state;

  const currentSubject = subjects.find(s => s.id === selectedSubject)!;

  const handleAttendance = (studentId: string, status: 'present' | 'absent' | 'late', hours: number) => {
    dispatch({
      type: 'MARK_ATTENDANCE',
      payload: {
        id: `${studentId}-${selectedDate}-${selectedSubject}`,
        studentId,
        date: selectedDate,
        subjectId: selectedSubject,
        status,
        hours
      },
    });
  };

  const getStudentAttendance = (studentId: string) => {
    return attendance.find(
      (a) => a.studentId === studentId && 
            a.date === selectedDate && 
            a.subjectId === selectedSubject
    );
  };

  const getTotalHours = (studentId: string) => {
    return attendance
      .filter(a => a.studentId === studentId && a.subjectId === selectedSubject && a.status === 'present')
      .reduce((sum, record) => sum + record.hours, 0);
  };

  const getAbsentHours = (studentId: string) => {
    return attendance
      .filter(a => a.studentId === studentId && a.subjectId === selectedSubject && a.status === 'absent')
      .reduce((sum, record) => sum + record.hours, 0);
  };

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours (Present/Absent)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => {
              const totalHours = getTotalHours(student.id);
              const absentHours = getAbsentHours(student.id);
              const attendance = getStudentAttendance(student.id);

              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={student.imageUrl}
                          alt={student.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Year {student.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {totalHours}/{currentSubject.maxHours}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {absentHours}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAttendance(student.id, 'present', 2)}
                        className={`p-2 rounded-full ${
                          attendance?.status === 'present'
                            ? 'bg-green-100 text-green-600'
                            : 'hover:bg-gray-100 text-gray-400'
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleAttendance(student.id, 'absent', 2)}
                        className={`p-2 rounded-full ${
                          attendance?.status === 'absent'
                            ? 'bg-red-100 text-red-600'
                            : 'hover:bg-gray-100 text-gray-400'
                        }`}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleAttendance(student.id, 'late', 1)}
                        className={`p-2 rounded-full ${
                          attendance?.status === 'late'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'hover:bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};