import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/loginandregister.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {

      // Friendly Error Messages
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/invalid-credential":
          setError("No account found. Please register your account first.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please wait and try again later.");
          break;

        default:
          setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {error && <p className="error">{error}</p>}

        <br />
        <p>
          Don’t have an account?{" "}
          <a href="/register" className="link">Register here</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
