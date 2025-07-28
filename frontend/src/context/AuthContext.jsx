import React, { createContext, useContext, useState, useEffect } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for logged in user on app load
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
    setShowSignUp(false);
    // Redirect to dashboard after successful login/registration
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const openSignUp = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleTryNow = () => {
    if (user) {
      window.location.href = "/dashboard";
    } else {
      openLogin();
    }
  };

  const value = {
    user,
    isLoading,
    showLogin,
    showSignUp,
    login,
    logout,
    openLogin,
    openSignUp,
    closeModals,
    handleTryNow,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Login
            onClose={closeModals}
            onSwitchToSignUp={() => {
              setShowLogin(false);
              setShowSignUp(true);
            }}
            onSuccess={(userData, token) => {
              login(userData, token);
            }}
          />
        </div>
      )}

      {/* SignUp Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <SignUp
            onClose={closeModals}
            onSwitchToLogin={() => {
              setShowSignUp(false);
              setShowLogin(true);
            }}
            onSuccess={(userData, token) => {
              login(userData, token);
            }}
          />
        </div>
      )}
    </AuthContext.Provider>
  );
};
