import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ThemedChallenges = () => {
  return (
    <main>
      <nav>
        <Link to="/">home</Link>
        <Button text="submit a challenge" color="#30aee9"></Button>
      </nav>
        <h1>Themed Challenges</h1>
        <h2>Weekly Art Challenges</h2>
        <img src="src/img/FallArtChallenge.png" alt="Fall art challenge"></img>
        <img src="src/img/HobbiesArtChallenge.png" alt="Hobbies art challenge"></img>
        <img src="src/img/SummerArtChallenge.png" alt="Summer art challenge"></img>
        <h2>Monthly Art Challenges</h2>
    </main>
  );
};

export default ThemedChallenges;
