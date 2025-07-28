import React, { useState } from "react";
import { Menu, X, Code, ArrowRight, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLandingPage = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, openLogin, openSignUp } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <Code className="mr-2" size={28} />
              <span className="text-xl font-bold">VisualAlgo</span>
            </div>

            {/* Desktop Navigation - Only show on landing page */}
            {isLandingPage ?(
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="hover:text-gray-200 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="hover:text-gray-200 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#examples"
                  className="hover:text-gray-200 transition-colors"
                >
                  Examples
                </a>
              </div>
            ):
            <div className="hidden md:flex items-center space-x-8">
                <a
                  onClick={() => navigate("/dashboard")}
                  className="hover:text-gray-200 transition-colors"
                >
                  Playground
                </a>
                <a
                  onClick={() => navigate("/dashboard/history")}
                  className="hover:text-gray-200 transition-colors"
                >
                  History
                </a>
              </div>}

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User size={20} />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="text-white hover:text-gray-200 transition-colors"
                    onClick={openLogin}
                  >
                    Login
                  </button>
                  <button
                    className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center"
                    onClick={openSignUp}
                  >
                    Sign Up
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {isLandingPage && (
                  <>
                    <a
                      href="#features"
                      className="block hover:text-gray-200 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Features
                    </a>
                    <a
                      href="#how-it-works"
                      className="block hover:text-gray-200 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      How It Works
                    </a>
                    <a
                      href="#examples"
                      className="block hover:text-gray-200 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Examples
                    </a>
                  </>
                )}

                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-white">
                      <User size={16} />
                      <span>{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="block w-full text-left bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="block w-full text-left hover:text-gray-200 transition-colors"
                      onClick={() => {
                        openLogin();
                        setIsMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="block w-full text-left bg-white text-purple-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        openSignUp();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export { Navbar as default };
