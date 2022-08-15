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
        <section className="inspo-corner">
            <div className="inspo-header">
                <h2>Inspiration Corner</h2>
                <p className="commentary">Feeling stuck? Get inspired by a
                random art piece and quote here!</p>
            </div>
            <div className="inspo-box-content">
                <div className="inspo-art">{artComponents}</div>
                <div className="inspo-quote">{quoteComponents}</div>
            </div>
        </section>
    );
};

InspirationBox.propTypes = {
    quotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    arts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

export default InspirationBox;
