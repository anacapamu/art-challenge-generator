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
const artAPIKey = process.env.REACT_APP_ART_API_KEY;
const wordsAPIKey = process.env.REACT_APP_WORDSAPI_API_KEY;
const backEndUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [wordsData, setWordsData] = useState([]);
  const [categoryID, setCategoryID] = useState(0);

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
      axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=${artAPIKey}`,
        { params: {
          ps: '100',
          p: `${getRandomNum(100)}`,
          imgonly: 'true',
          }
        })
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

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const getSurpriseWord = () => {
    axios.get(`http://api.wordnik.com/v4/words.json/randomWord?api_key=${wordsAPIKey}`,
      { params: {
        hasdictionarydef: 'true',
        excludepartofspeech: "adverb,interjection,pronoun,preposition,abbreviation,affix,article,auxiliary-verb,conjunction,definite-article,family-name,given-name,idiom,imperative,noun-plural,noun-posessive,past-participle,phrasal-prefix,proper-noun,proper-noun-plural,proper-noun-posessive,suffix,verb-intransitive,verb-transitive",
        mindictionarycount: '10000'
        }
      })
    .then(function (res) {
      setWordsData((prevWords) => {
        return [...prevWords, res.data.word]
      });
    }).catch(function (err) {
      console.error(err);
    });
  };

 const generateSurpriseWords = () => {
    setWordsData([]);

    let i = 1;
    while (i <= getRandomNum(10)) {
      getSurpriseWord();
      i ++
    };
  };

  const generateWords = (userPreferences) => {
    setWordsData([]);

    axios.get(`${backEndUrl}/categories`)
    .then((res) => {
      const data = res.data;

      // loop through data to get key with value selectedCategory
      // setCategoryID to equal to that key

    }).catch((err) => {
      console.log(err)
    });

    // need to check the amount of words for selectedCategory
    // if days > amount of words, error message and don't enter while loop

    let i = 1;
    while (i <= userPreferences.days) {
      getWord(categoryID);
      i ++
    };
  };

  const getWord = (categoryID) => {
    axios.get(`${backEndUrl}/categories/${categoryID}/words`)
    .then(function (res) {
      setWordsData((prevWords) => {
        return [...prevWords, res.data.word]
      });
    }).catch(function (err) {
      console.error(err);
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
          <WordPreview words = { wordsData }></WordPreview>
        </section><br></br>
        <section className="inspo-box">
          <InspirationBox quotes={ quoteData } arts={ artData }></InspirationBox>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;
