import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import "./ThemedChallenges.css"
import Footer from "../components/Footer";

const ThemedChallenges = () => {
  const imagesPerRow = 3;

  const [weeklyImageUrls, setWeeklyImageUrls] = useState([]);
  const [monthlyImageUrls, setMonthlyImageUrls] = useState([]);
  const [nextWeeklyImage, setNextWeeklyImage ] = useState(imagesPerRow)
  const [nextMonthlyImage, setNextMonthlyImage ] = useState(imagesPerRow)

  const navigate = useNavigate();

  const navigateToSubmitChallenge = () => {
    navigate("/submitchallenge");
  };

  useEffect(() => {
    const weeklyImagesRef = ref(storage, "weekly-challenges/");

    listAll(weeklyImagesRef).then((response) => {
      response.items.forEach((image) => {
        getDownloadURL(image).then((weeklyImageUrl) => {
          setWeeklyImageUrls((prev) => [...prev, weeklyImageUrl]);
        });
      });
    });
  }, []);

  useEffect(() => {
    const monthlyImagesRef = ref(storage, "monthly-challenges/");

    listAll(monthlyImagesRef).then((response) => {
      response.items.forEach((image) => {
        getDownloadURL(image).then((monthlyImageUrl) => {
          setMonthlyImageUrls((prev) => [...prev, monthlyImageUrl]);
        });
      });
    });
  }, []);

  const handleMoreWeeklyImages = () => {
    setNextWeeklyImage(nextWeeklyImage + imagesPerRow)
  };

  const handleMoreMonthlyImages = () => {
    setNextMonthlyImage(nextMonthlyImage + imagesPerRow)
  };

  return (
    <div className="themed-challenges">
      <nav>
        <Link to="/">home</Link>
        <Button text="share a challenge" color="#fe67b8"
          onClick={navigateToSubmitChallenge}></Button>
      </nav>
      <h1>Themed Challenges</h1>
      <h2>Weekly Challenges</h2><br></br>
      {weeklyImageUrls.slice(0,nextWeeklyImage).map((weeklyImageUrl, index) => {
        return <img key={index} src={weeklyImageUrl} alt="weekly challenge"/>
      })}<br></br>
      {nextWeeklyImage < weeklyImageUrls.length && (
          <Button text="load more weekly challenges" color="#30aee9"
          onClick={handleMoreWeeklyImages}></Button>)}
      <p></p>
      <h2>Monthly Challenges</h2><br></br>
      {monthlyImageUrls.slice(0,nextMonthlyImage).map((monthlyImageUrl, index) => {
        return <img key={index} src={monthlyImageUrl} alt="monthly challenge"/>
      })}<br></br>
      {nextMonthlyImage < monthlyImageUrls.length && (
        <Button text="load more monthly challenges" color="#30aee9"
        onClick={handleMoreMonthlyImages}></Button>)}
      <Footer></Footer>
    </div>
  );
};

export default ThemedChallenges;
