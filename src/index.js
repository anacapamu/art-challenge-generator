import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import ThemedChallenges from './routes/ThemedChallenges';
import Faq from './routes/Faq';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="faq" element={<Faq />} />
      <Route path="themedchallenges" element={<ThemedChallenges />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
