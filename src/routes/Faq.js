import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Faq = () => {
  return (
    <div>
      <nav>
        <Link to="/">home</Link>
      </nav>
      <h1>FAQ</h1>
      <section className="faq">
        <h4>What is an art challenge?</h4>
        <p>An art challenge is a commitment an artist makes to complete some sort of
        series of work over a period of time.
        </p>
        <h4>What if I don't want random words for my art challenge?</h4>
        <p>Check out our <Link to="/themedchallenges">themed challenges</Link>.
        </p>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Faq;
