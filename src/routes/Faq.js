import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Faq = () => {
  return (
    <div className="fit-content">
      <nav>
        <Link to="/">home</Link>
      </nav>
      <h1>FAQ</h1>
      <section>
        <h4>What is an art challenge?</h4>
        <p>An art challenge is a commitment an artist makes to complete some sort of
        series of work over a set amount of time. It can be a great way to improve skills,
        build portfolio, and/or to get over art block.
        </p>
        <h4>What if I don't want random words for my art challenge?</h4>
        <p>Check out <Link to="/themedchallenges">themed challenges</Link> shared by our users!
        </p>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Faq;
