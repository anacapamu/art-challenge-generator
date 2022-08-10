import React from 'react';
import PropTypes from 'prop-types';

const InspirationArt = (props) => {
    return (
        <section>
            <img className="inspo-art" src={`${props.imageUrl}`} alt={`"${props.imageAlt}"`}></img>
        </section>
    );
};

InspirationArt.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired
  };

export default InspirationArt;
