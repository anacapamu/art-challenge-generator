import React from 'react';
import PropTypes from 'prop-types';
import InspirationArt from './InspirationArt';
import InspirationQuote from './InspirationQuote';

const InspirationBox = (props) => {
    const quoteComponents = props.quotes.map((quote, i) => {
        return (
            <InspirationQuote
                key = {i}
                quoteText = {quote.quoteText}
                quoteAuthor = {quote.quoteAuthor}>
            </InspirationQuote>
        );
    });

    const artComponents = props.arts.map((art, i) => {
        return (
            <InspirationArt
                key = {i}
                imageUrl = {art.imageUrl}
                imageAlt = {art.imageAlt}>
            </InspirationArt>
        );
    });

    return (
        <section id="inspo-box">
            <h2>Inspiration Box</h2>
            <div className="inspo-art">{artComponents}</div>
            <div className="inspo-quote">{quoteComponents}</div>
        </section>
    );
};

InspirationBox.propTypes = {
    quotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    arts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

export default InspirationBox;
