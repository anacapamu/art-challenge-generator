import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InspirationBox from "./components/InspirationBox";
import Button from "./components/Button";
import WordGenerator from './components/WordGenerator';
import WordPreview from './components/WordPreview';
import { UserAuth } from './context/AuthContext';
import Footer from './components/Footer';

const quoteAPI = process.env.REACT_APP_QUOTE_API;
const backEndUrl = process.env.REACT_APP_BACKEND_URL;
const proxyServer = process.env.REACT_APP_PROXY_SERVER;

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [challengeData, setChallengeData] = useState([]);

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
      axios.get(`${proxyServer}/art`)
      .then((res) => {
        let random = getRandomNum(99);
        const newArt = {
          imageUrl: res.data.artObjects[`${random}`].webImage.url,
          imageAlt: res.data.artObjects[`${random}`].title
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

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const getSurpriseWord = () => {
    axios.get(`${proxyServer}/word`)
    .then(function (res) {
      setChallengeData((prevWords) => {
        return [...prevWords, res.data.word]
      });
    }).catch(function (err) {
      console.error(err);
    });
  };

 const generateSurpriseWords = () => {
    setChallengeData([]);

    let i = 1;
    while (i <= getRandomNum(10)) {
      getSurpriseWord();
      i ++
    };
  };

  const generateWords = async (userPreferences) => {
    setChallengeData([]);

    const words = await getWords(userPreferences.selectedCategory);

    if (words.length < userPreferences.days) {
      return alert(`Enter a number that is equal to or less than ${words.length}`)
    }

    let indexes = [];
    let j = 0;
    while ( j < words.length ) {
      indexes.push(j);
      j++;
    };

    shuffle(indexes);

    let i = 1;
    while (i <= userPreferences.days) {
      getRandomWord(words, indexes[0]);
      indexes.shift()
      i ++
    };
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const getWords = (categoryID) => {
    return axios.get(`${backEndUrl}/categories/${categoryID}/words`)
    .then(function (res) {
      return res.data.words
    }).catch(function (err) {
      console.error(err);
    });
  };

  const getRandomWord = (words, index) => {
    let newWord = words[index];

    setChallengeData((prevWords) => {
      return [...prevWords, newWord]
    });
  };

  const { user } = UserAuth();

  return (
    <div>
      <header>
        <h1>Art Challenge Generator</h1>
        <nav>
          <Link to="/faq">faq</Link> |{ " " }
          <Link to="/themedchallenges">themed challenges</Link>
          <Button text={ user ? "profile": "sign in" }
            onClick={ user ? navigateToProfile : navigateToSignIn }
            color={ user ? "#fe67b8": "#2559c6" }></Button>
        </nav>
      </header>
      <main>
        <section className="home-box">
          <WordGenerator onGenerateSurprise = { generateSurpriseWords }
            onGenerate = { generateWords }></WordGenerator>
          <WordPreview words = { challengeData }></WordPreview>
        </section><br></br>
        <InspirationBox quotes={ quoteData } arts={ artData }></InspirationBox>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;
