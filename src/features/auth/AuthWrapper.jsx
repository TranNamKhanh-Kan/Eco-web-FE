import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import ChangePasswordSuccess from "./ChangePasswordSuccess";
import VerifyEmail from "./VerifyEmail";

export default function AuthWrapper() {
  const [currentForm, setCurrentForm] = useState("login");
  const location = useLocation();
  const navigate = useNavigate();

  // Set initial form based on URL path
  useEffect(() => {
    const path = location.pathname;
    
    if (path === "/register") {
      setCurrentForm("register");
    } else if (path === "/verify-email") {
      setCurrentForm("verify-email");
    } else if (path === "/forgot-password") {
      setCurrentForm("forgot");
    } else if (path === "/change-password") {
      setCurrentForm("change-password");
    } else if (path === "/change-password-success") {
      setCurrentForm("changepasswordsuccess");
    } else {
      setCurrentForm("login");
    }
  }, [location.pathname]);

  const handleSwitch = (formType) => {
    setCurrentForm(formType);
    
    // Update URL when switching forms
    switch (formType) {
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "verify-email":
        navigate("/verify-email");
        break;
      case "forgot":
        navigate("/forgot-password");
        break;
      case "change-password":
        navigate("/change-password");
        break;
      case "changepasswordsuccess":
        navigate("/change-password-success");
        break;
      default:
        navigate("/login");
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return <Login onSwitch={handleSwitch} />;
      case "register":
        return <Register onSwitch={handleSwitch} />;
      case "verify-email":
        return <VerifyEmail onSwitch={handleSwitch} />;
      case "forgot":
        return <ForgotPassword onSwitch={handleSwitch} />;
      case "change-password":
        return <ChangePassword onSwitch={handleSwitch} />;
      case "changepasswordsuccess":
        return <ChangePasswordSuccess onSwitch={handleSwitch} />;
      default:
        return <Login onSwitch={handleSwitch} />;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
}
