import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InspirationBox from "./components/InspirationBox";
import Button from "./components/Button";

const quoteAPI = process.env.REACT_APP_QUOTE_API;
const artAPI = process.env.REACT_APP_ART_API;

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    const getQuote = () => {
      axios.get(`${quoteAPI}`)
      .then((res) => {
        const newQuote = {
          quoteText: res.data.quote,
          quoteAuthor: res.data.author
        };
        setQuoteData([newQuote]);
      }).catch((err) => {
        console.log(err)
      });
    };
    getQuote();
  }, []);

  useEffect(() => {
    const getArt = () => {
      axios.get(`${artAPI}`)
      .then((res) => {
        const newArt = {
          imageUrl: res.data.artObjects[`${getRandomNum(100)}`].webImage.url,
          imageAlt: res.data.artObjects[`${getRandomNum(100)}`].title
        };
        setArtData([newArt]);
      }).catch((err) => {
        console.log(err)
      });
    };
    getArt();
  }, []);

  const getRandomNum = (ceiling) => {
    return Math.round(Math.random() * ceiling);
  }

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div>
      <header>
        <h1>Art Challenge Generator</h1>
        <nav>
          <Link to="/faq">faq</Link> |{" "}
          <Link to="/themedchallenges">themed challenges</Link>
          <Button text="sign in" onClick={navigateToSignIn} color="#2559c6"></Button>
        </nav>
      </header>
      <main>
        <InspirationBox quotes={quoteData} arts={artData}></InspirationBox>
      </main>
    </div>
  );
};

export default App;
