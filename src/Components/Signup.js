import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../style.css'; 

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();

  const generateAccessToken = () => Math.random().toString(36).substring(2, 18);

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are mandatory');
      return;
    }

    if (password !== confirmPassword) { 
      setError("Passwords don't match");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      accessToken: generateAccessToken(),
    };

    login(newUser);
    setSuccess('Signup successful!');
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  useEffect(() => {
    if (user?.accessToken) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return (
    <div className="signup-container">
      <div className="navbar">
        <div className="nav-links">
          <Link to="/signup">Signup</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>

      <div className="signup-form">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
