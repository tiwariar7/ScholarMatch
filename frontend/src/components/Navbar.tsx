import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

type Page = 'signin' | 'signup' | 'contact';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });


  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true"; 
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow-md border-b border-gray-300 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ScholarMatch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/indian-scholarships" className="nav-link">
              Find Indian Scholarships
            </Link>
            <Link to="/international-scholarships" className="nav-link">
              Find International Scholarships
            </Link>

            {isAuthenticated ? (
              <button 
                onClick={handleLogout} 
                className="nav-link text-red-600 dark:text-red-400"
              >
                Log-Out
              </button>
            ) : (
              <Link to="/sign-in" className="nav-link">Sign-In</Link>
            )}

            <Link to="/contact" className="nav-link">Contact</Link>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/indian-scholarships" className="mobile-nav-link">Find Indian Scholarships</Link>
            <Link to="/international-scholarships" className="mobile-nav-link">Find International Scholarships</Link>
            <Link to="/contact" className="mobile-nav-link">Contact</Link>

            {isAuthenticated ? (
              <button 
                onClick={handleLogout} 
                className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                Log-Out
              </button>
            ) : (
              <Link to="/sign-in" className="mobile-nav-link">Sign In</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
