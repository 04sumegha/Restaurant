import React, { useState } from "react";
import axios from 'axios'
import "./User.css";
import {useNavigate} from 'react-router-dom'

const User = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async(event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:8000/api/user/login", {
        email,
        password
      })

      console.log(result);

      window.localStorage.setItem("cookies", result.data.data.token);
      window.localStorage.setItem("userId" , result.data.data.userId);
      window.localStorage.setItem("email", result.data.data.email);

      navigate("/");

    } 
    
    catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message + ". Or try creating an account instead");
    }
  }

  const handleRegister = async(event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:8000/api/user/register", {
        name,
        email,
        password
      })

      console.log(result);

      window.localStorage.setItem("cookies", result.data.data.token);
      window.localStorage.setItem("userId" , result.data.data.userId);
      window.localStorage.setItem("email", result.data.data.email);

      navigate("/");

    } 
    
    catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message + ". Try logging in instead");
    }
  }

  return (
    <div className="auth">
      {login && (
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <div className="field">
            <input type="email" name="email" placeholder="Enter Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <input type="password" name="password" placeholder="Enter Your Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          <p>Don't Have An Account?</p>
          <button onClick={() => setLogin(false)}>Register</button>
        </form>
      )}

      {!login && (
        <form onSubmit={handleRegister}>
          <h3>Register</h3>
          <div className="field">
            <input type="text" name="name" placeholder="Enter Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <input type="email" name="email" placeholder="Enter Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <input type="password" name="password" placeholder="Enter Your Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Create Account</button>
          <p>Already Have An Account?</p>
          <button onClick={() => setLogin(true)}>Login</button>
        </form>
      )}
    </div>
  );
};

export default User;
