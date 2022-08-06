import React from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <main>
      <nav>
        <Link to="/">home</Link>
      </nav>
      <h1>FAQ</h1>
      <p><h4>What is an art challenge?</h4>
      An art challenge is a commitment an artist makes to complete some sort of
      series of work over a period of time.
      </p>
      <p><h4>What if I don't want random words for my art challenge?</h4>
        Check out our themed challenges.
      </p>
    </main>
  );
};

export default Faq;
