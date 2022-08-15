import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const WordPreview = (props) => {
    const downloadWords = () => {
        const element = document.createElement("a");
        const file = new Blob([`${props.words}`], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "ArtChallenge.txt";
        document.body.appendChild(element);
        element.click();
      };


    return (
        <section className="vertical-box">
            <h2>Your art challenge is:</h2>
            <div className="word-preview">
                <ol style={{maxHeight: '200px', overflow: 'auto'}}>
                    {props.words.map((word, index) => <li key={index}>{word}</li>)}</ol>
            </div>
            <Button text="download challenge" color="#30aee9" onClick={downloadWords}></Button>
        </section>
    );
};

WordPreview.propTypes = {
    words: PropTypes.array
};

export default WordPreview;
