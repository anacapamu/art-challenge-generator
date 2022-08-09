import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InspirationBox from "./components/InspirationBox";
import Button from "./components/Button";
import WordGenerator from './components/WordGenerator';
import WordPreview from './components/WordPreview';

const quoteAPI = process.env.REACT_APP_QUOTE_API;
const artAPI = process.env.REACT_APP_ART_API;
const wordsAPIKey = process.env.REACT_APP_WORDSAPI_API_KEY;

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [wordsData, setWordsData] = useState([]);

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

  const getWord = (wordType) => {
    const options = {
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      params: {
        random: 'true',
        partofspeech: `${wordType}`
      },
      headers: {
        'X-RapidAPI-Key': `${wordsAPIKey}`,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (res) {
      console.log(res.data.word)
      return res.data.word
    }).catch(function (err) {
      console.error(err);
    });
  };

 const generateWords = (userPreferences) => {
    const words = []
    let i = 1;

    while (i <= userPreferences.days) {
      let newWord = getWord(userPreferences.wordType);
      words.push(newWord)
      i ++
    };
    console.log(words);
    return setWordsData(words);
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
        <WordGenerator onGenerate={ generateWords }></WordGenerator>
        <WordPreview words = { wordsData }></WordPreview>
        <InspirationBox quotes={quoteData} arts={artData}></InspirationBox>
      </main>
    </div>
  );
};

export default App;
