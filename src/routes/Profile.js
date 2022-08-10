import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Button from "../components/Button";
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

  return (
    <div>
      <nav>
        <Link to="/">home</Link>
      </nav>
      <h1>Profile</h1>
      <p>User Email: {user && user.email}</p>
      <Button text="submit a challenge" color="#30aee9"
          onClick={navigateToSubmitChallenge}></Button>
      <Button text="log out" onClick={handleLogOut} color="#2559c6"></Button>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
