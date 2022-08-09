import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import Button from "../components/Button";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/profile')
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">home</Link>
      </nav>
      <div>
        <h1>Sign up for a free account</h1>
        <p>
          Already have an account?{' '}
          <Link to='/signin'>
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <Button text="sign up" color="#2559c6"></Button>
      </form>
    </div>
  );
};

export default SignUp;
