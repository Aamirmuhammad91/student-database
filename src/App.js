// App.js
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDetails from './components/StudentDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import { loadData, saveData } from './dataStorage';

export const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loadedData = await loadData();
      setStudents(loadedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    saveData(students);
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage students={students} addStudent={addStudent} updateStudent={updateStudent} deleteStudent={deleteStudent} />} />
        <Route path="/student/:studentId" element={<StudentDetails students={students} />} />
      </Routes>
      <Footer />
    </Router>
  );
};
