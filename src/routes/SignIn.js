import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Button from "../components/Button";
import Footer from '../components/Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/profile')
    } catch (e) {
      setError(e.message)
      console.log(error)
    }
  };

  return (
    <div className="fit-content">
      <nav>
        <Link to="/">home</Link>
      </nav>
      <div>
        <h1>Sign in to your account</h1>
        <p>
          Don't have an account yet?{' '}
          <Link to='/signup'>
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address: </label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' />
        </div>
        <div>
          <label >Password: </label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' />
        </div>
        <Button text="sign in" color="#2559c6"></Button>
      </form>
      <Footer></Footer>
    </div>
  );
};

export default SignIn;
