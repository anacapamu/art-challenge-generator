import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Footer from '../components/Footer';
import AddWords from '../components/AddWords';

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
    <div className="fit-content">
      <nav>
        <Link to="/">home</Link>
        <Button text="log out" onClick={handleLogOut} color="#2559c6"></Button>
      </nav>
      <h1>Profile</h1>
      <p>User Email: <span style={{ color: "#30aee9" }}>{user && user.email}</span></p>
      <Button text="share a challenge" color="#fe67b8"
          onClick={navigateToSubmitChallenge}></Button><p></p>
      <div>
        <h2>Secret user perk</h2><p></p>
        <AddWords></AddWords>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
