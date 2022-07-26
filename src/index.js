import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import ThemedChallenges from './routes/ThemedChallenges';
import Faq from './routes/Faq';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Profile from './routes/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import SubmitChallenge from './routes/SubmitChallenge';
import AddWords from './routes/AddWords';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="faq" element={<Faq />} />
          <Route path="themedchallenges" element={<ThemedChallenges />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path="/submitchallenge" element={<ProtectedRoute><SubmitChallenge /></ProtectedRoute>}/>
          <Route path="/addwords" element={<ProtectedRoute><AddWords /></ProtectedRoute>}/>
        </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);
