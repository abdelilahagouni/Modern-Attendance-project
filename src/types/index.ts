export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  course: string;
  year: number;
  imageUrl?: string;
  password: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  subjectId: string;
  status: 'present' | 'absent' | 'late';
  hours: number;
  notes?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  year: number;
  maxHours: number;
  professor: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Student | null;
  role: 'student' | 'admin' | null;
}