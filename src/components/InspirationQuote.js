import React from 'react';
import PropTypes from 'prop-types';

const InspirationQuote = (props) => {
    return (
        <section>
            <p className="quote">"{props.quoteText}"</p>
            <p className="author">- {props.quoteAuthor}</p>
        </section>
    );
};

InspirationQuote.propTypes = {
    quoteText: PropTypes.string.isRequired,
    quoteAuthor: PropTypes.string.isRequired
  };

export default InspirationQuote;
