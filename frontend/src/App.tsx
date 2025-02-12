import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IndianScholarships from './pages/IndianScholarships';
import InternationalScholarships from './pages/InternationalScholarships';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [currentPage, setCurrentPage] = useState<'signin' | 'signup' | 'contact'>('signin');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/indian-scholarships" element={<IndianScholarships />} />
          <Route path="/international-scholarships" element={<InternationalScholarships />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
