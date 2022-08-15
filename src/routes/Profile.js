import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const navigateToSubmitChallenge = () => {
    navigate("/submitchallenge");
  };

  const navigateToAddWords = () => {
    navigate("/addwords");
  };

  return (
    <div className="fit-content">
      <nav>
        <Link to="/">home</Link>
        <Button text="log out" onClick={handleLogOut} color="#2559c6"></Button>
      </nav>
      <h1>Profile</h1>
      <p>User Email: <span style={{ color: "#30aee9" }}>{user && user.email}</span></p>
      <p>User perks:</p>
      <Button text="share a challenge" color="#fe67b8"
          onClick={navigateToSubmitChallenge}></Button>
      <Button text="add words" color="#fe67b8"
          onClick={navigateToAddWords}></Button>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
