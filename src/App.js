import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InspirationBox from './components/InspirationBox';

const quoteAPI = process.env.REACT_APP_QUOTE_API;
const artAPI = process.env.REACT_APP_ART_API;

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    getQuote();
    getArt();
  }, []);

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

  const getArt = () => {
    axios.get(`${artAPI}`)
    .then((res) => {
      const newArt = {
        imageUrl: res.data.artObjects[0].webImage.url,
        imageAlt: res.data.artObjects[0].title
      };
      setArtData([newArt]);
    }).catch((err) => {
      console.log(err)
    });
  };

  return (
    <div>
      <header>
        <h1>Art Challenge Generator</h1>
      </header>
      <main>
        <InspirationBox quotes={quoteData} arts={artData}></InspirationBox>
      </main>
    </div>
  );
};

export default App;
