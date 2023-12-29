import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/admin/login", {
        username,
        password,
      });
      if (response.data.msg === "success") {
        localStorage.setItem("admin", JSON.stringify(response.data.user));
        navigate("/");
        setIncorrectCredentials(false);
      } else {
        setIncorrectCredentials(true);
      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  return (
    <div className="login-container">
      <form className="signIn" onSubmit={handleSubmit}>
        <h2 className="heading-signIn">Admin Sign In</h2>
        <div className="username-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {incorrectCredentials && (
          <p className="text-danger">Incorrect username or password.</p>
        )}
        <button
          className="btn btn-lg btn-primary btn-block signIn-btn"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
