import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const WordGenerator = (props) => {
    const [days, setDays] = useState(1);
    const [wordsType, setWordsType] = useState("noun");

    const onSubmit = (e) => {
        e.preventDefault();

        props.onGenerate({ days, wordsType });

        setDays(1);
    };

    return (
        <form className="vertical-box" onSubmit = {onSubmit}>
            <h2>Create a challenge</h2>
            <label>Number of days in challenge: </label>
            <input type="number" placeholder="1" min="1" max="100"
            onChange={ ((e) => setDays(e.target.value)) }></input>
            <label>Type of words:</label>
                <select onChange={ ((e) => setWordsType(e.target.value)) }>
                    <option value="noun">noun</option>
                    <option value="verb">verb</option>
                    <option value="adjective">adjective</option>
                </select>
            <input type="submit" value="generate challenge" className="btn"
                style={{ backgroundColor: "#30aee9" }}></input>
        </form>
    );
  };

WordGenerator.propTypes = {
    onGenerate: PropTypes.func
};

export default WordGenerator;
