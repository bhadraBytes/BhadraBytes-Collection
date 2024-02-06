import React, { useState } from "react";
import { auth } from "../lib/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import signInWithEmailAndPassword
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Next.js router

  const handleLogin = async () => {
    try {
      const authUser = await signInWithEmailAndPassword(auth, email, password);

      // Redirect to home page
      router.push("/");

      // Show login success message
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Show login error message
      toast.error("Error logging in. Please check your credentials.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleLogin(); // Call the handleLogin function
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="forgot-password">
        <a href="#">Forgot your password?</a>
      </div>
      <div className="create-account">
        <p>
          Don't have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
