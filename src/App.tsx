import React from 'react';
import { AttendanceProvider } from './context/AttendanceContext';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { DateSelector } from './components/DateSelector';
import { SubjectSelector } from './components/SubjectSelector';
import { Stats } from './components/Stats';
import { StudentList } from './components/StudentList';
import { useAuth } from './context/AuthContext';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex space-x-4 mb-6">
            <DateSelector />
            <SubjectSelector />
          </div>
          <Stats />
          <StudentList />
        </div>
      </main>
    </div>
  );
};

const AppContent = () => {
  const { state } = useAuth();
  return state.isAuthenticated ? <Dashboard /> : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <AttendanceProvider>
        <AppContent />
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;