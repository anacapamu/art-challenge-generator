import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import "./ThemedChallenges.css"

const ThemedChallenges = () => {
  const [weeklyImageUrls, setWeeklyImageUrls] = useState([]);
  const [monthlyImageUrls, setMonthlyImageUrls] = useState([]);

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

  return (
    <main>
      <nav>
        <Link to="/">home</Link>
        <Button text="submit a challenge" color="#30aee9"
          onClick={navigateToSubmitChallenge}></Button>
      </nav>
      <h1>Themed Challenges</h1>
      <h2>Weekly Challenges</h2>
      {weeklyImageUrls.map((weeklyImageUrl) => {
        return <img src={weeklyImageUrl} alt="weekly challenge"/>;
      })}
      <h2>Monthly Challenges</h2>
      {monthlyImageUrls.map((monthlyImageUrl) => {
        return <img src={monthlyImageUrl} alt="monthly challenge"/>;
      })}
    </main>
  );
};

export default ThemedChallenges;
