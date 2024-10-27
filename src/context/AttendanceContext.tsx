import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Student, AttendanceRecord, Course, Subject } from '../types';

interface State {
  students: Student[];
  attendance: AttendanceRecord[];
  courses: Course[];
  subjects: Subject[];
  selectedDate: string;
  selectedSubject: string;
}

type Action =
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'MARK_ATTENDANCE'; payload: AttendanceRecord }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_SUBJECT'; payload: string }
  | { type: 'ADD_COURSE'; payload: Course };

const initialState: State = {
  students: [
    {
      id: '1',
      name: 'Salma Saadaoui',
      rollNumber: '2010205587',
      email: 'salma.saadaoui@example.com',
      course: 'Computer Science',
      year: 4,
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      password: '2010205587'
    },
    {
      id: '2',
      name: 'Abdelilah Agouni',
      rollNumber: '2010205588',
      email: 'abdelilah.agouni@example.com',
      course: 'Computer Science',
      year: 4,
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
      password: '2010205588'
    }
  ],
  attendance: [],
  courses: [
    { id: '1', name: 'Computer Science', code: 'CS' }
  ],
  subjects: [
    // 4th Year
    { id: 'ai4', name: 'Artificial Intelligence', code: 'CS401', year: 4, maxHours: 45, professor: 'Dr. Smith' },
    { id: 'dm4', name: 'Data Mining', code: 'CS402', year: 4, maxHours: 40, professor: 'Dr. Johnson' },
    { id: 'wn4', name: 'Wireless Networks', code: 'CS403', year: 4, maxHours: 35, professor: 'Dr. Williams' },
    // 3rd Year
    { id: 'db3', name: 'Database Systems', code: 'CS301', year: 3, maxHours: 45, professor: 'Dr. Brown' },
    { id: 'os3', name: 'Operating Systems', code: 'CS302', year: 3, maxHours: 40, professor: 'Dr. Davis' },
    // 2nd Year
    { id: 'ds2', name: 'Data Structures', code: 'CS201', year: 2, maxHours: 45, professor: 'Dr. Wilson' },
    { id: 'alg2', name: 'Algorithms', code: 'CS202', year: 2, maxHours: 40, professor: 'Dr. Taylor' },
    // 1st Year
    { id: 'prog1', name: 'Programming Fundamentals', code: 'CS101', year: 1, maxHours: 50, professor: 'Dr. Anderson' },
    { id: 'math1', name: 'Mathematics', code: 'CS102', year: 1, maxHours: 45, professor: 'Dr. Thomas' }
  ],
  selectedDate: new Date().toISOString().split('T')[0],
  selectedSubject: 'ai4'
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };
    case 'MARK_ATTENDANCE':
      return {
        ...state,
        attendance: [
          ...state.attendance.filter(a => 
            !(a.studentId === action.payload.studentId && 
              a.date === action.payload.date && 
              a.subjectId === action.payload.subjectId)
          ),
          action.payload
        ]
      };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_SUBJECT':
      return { ...state, selectedSubject: action.payload };
    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, action.payload] };
    default:
      return state;
  }
};

const AttendanceContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AttendanceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AttendanceContext.Provider value={{ state, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);