import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Button from "../components/Button";

const Profile = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate('/');
      alert('You have successfully logged out.')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>User Email: {user && user.email}</p>
      <Button text="log out" onClick={handleLogOut} color="#2559c6"></Button>
    </div>
  );
};

export default Profile;
