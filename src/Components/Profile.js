import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../Profile.css'; 

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signup');
  };

  useEffect(() => {
    if (!user?.accessToken) {
      navigate('/signup');
    }
  }, [user, navigate]);

  return (
    <div className="profile-container">
      <div className="navbar">
        <Link to="/signup">Signup</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <div className="profile-content">
        <h2>Profile</h2>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password:{user.password}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
