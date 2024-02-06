import React, { useState } from "react";
import { auth } from "../lib/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    try {
      // Create a new user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Combine first name and last name into a single string
      const fullName = `${firstName} ${lastName}`;

      // Update user profile with the full name
      await updateProfile(user, { displayName: fullName });

      console.log('User registered successfully!');
      router.push("/");
      toast.success("Signup successful!");
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error("Error signing up. Please check your credentials.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSignup(); // Call the handleSignup function
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Signup</button>
        </div>
      </form>
      <div className="already-have-account">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
