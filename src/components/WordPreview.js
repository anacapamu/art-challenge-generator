import React from 'react';
import PropTypes from 'prop-types';

const WordPreview = (props) => {
    return (
        <section>
            Your words are: {props.words}
        </section>
    );
};

WordPreview.propTypes = {
    words: PropTypes.array
};

export default WordPreview;
