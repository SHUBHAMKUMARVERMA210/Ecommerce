import React, { useState } from "react";
import "./LoginSignup.css";
import LostPassword from "../LostPassword/LostPassword";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [view, setView] = useState("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleActionChange = (newAction) => {
    setAction(newAction);
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");
    setPhoneNumber("");
    setErrors({});
    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (action === "Sign Up") {
      if (!firstName) newErrors.firstName = "First Name is required";
      if (!lastName) newErrors.lastName = "Last Name is required";
      if (!userName) newErrors.userName = "Username is required";
      if (!address) newErrors.address = "Address is required";
      if (!phoneNumber) {
        newErrors.phoneNumber = "Phone Number is required";
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
      }
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid";
      }
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (action === "Login") {
      if (!userName) newErrors.userName = "Username is required";
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setServerError("");

      const url =
        action === "Sign Up"
          ? "http://localhost:8085/signup"
          : "http://localhost:8085/login";
      const payload =
        action === "Sign Up"
          ? {
              firstName,
              lastName,
              userName,
              email,
              password,
              address,
              phoneNumber,
            }
          : { userName, password };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          setServerError(errorData.message || "An error occurred");
          throw new Error("Network response was not ok");
        }

        // Clear input fields after successful submission
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        setPhoneNumber("");
        setErrors({}); // Clear any validation errors
        setLoading(false);

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        console.log(
          action === "Sign Up" ? "Sign Up Success:" : "Login Success:",
          data
        );
      } catch (error) {
        console.error("Error during submission:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      {view === "form" ? (
        <>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          {serverError && <div className="server-error">{serverError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              {action === "Sign Up" && (
                <>
                  <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    {errors.firstName && (
                      <span className="error">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    {errors.lastName && (
                      <span className="error">{errors.lastName}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    {errors.userName && (
                      <span className="error">{errors.userName}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                    {errors.address && (
                      <span className="error">{errors.address}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    {errors.phoneNumber && (
                      <span className="error">{errors.phoneNumber}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                      type="email"
                      placeholder="Email Id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {errors.confirmPassword && (
                      <span className="error">{errors.confirmPassword}</span>
                    )}
                  </div>
                </>
              )}
              {action === "Login" && (
                <>
                  <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    {errors.userName && (
                      <span className="error">{errors.userName}</span>
                    )}
                  </div>
                  <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {errors.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="forgot-password">
              Lost Password?{" "}
              <span onClick={() => setView("lostPassword")}>Click Here</span>
            </div>
            <div className="submit-container">
              <button type="submit" className="submit" disabled={loading}>
                {loading
                  ? "Loading..."
                  : action === "Sign Up"
                  ? "Sign Up"
                  : "Login"}
              </button>
              <button
                type="button"
                className="submit gray"
                onClick={() =>
                  handleActionChange(action === "Sign Up" ? "Login" : "Sign Up")
                }
              >
                {action === "Sign Up" ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <LostPassword onBack={() => setView("form")} />
      )}
    </div>
  );
};

export default LoginSignup;
