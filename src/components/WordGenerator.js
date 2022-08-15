import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import axios from 'axios';

const backEndUrl = process.env.REACT_APP_BACKEND_URL;

const WordGenerator = (props) => {
    const [days, setDays] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const getCategories = () => {
          axios.get(`${backEndUrl}/categories`)
          .then((res) => {
            setCategories(res.data)
          }).catch((err) => {
            console.log(err)
          });
        };
        getCategories();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        props.onGenerate ({ days, selectedCategory });

        setDays(1);
        setSelectedCategory("");
        e.target.reset();
    };

    const onClick = (e) => {
        e.preventDefault();

        props.onGenerateSurprise();
    };

    return (
        <div>
            <form className="vertical-box" onSubmit = {onSubmit}>
                <h2>Create a challenge</h2>
                <label>Number of days in challenge: </label>
                <input type="number" placeholder="1" min="1"
                onChange={ ((e) => setDays(e.target.value)) }></input>
                <label>Category:</label>
                    <select onChange={ ((e) => setSelectedCategory(e.target.value) )}
                        defaultValue="choose">
                    <option value="choose" disabled >
                        -- Select category--</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>
                        {category.category}</option>)}
                    </select>
                <input type="submit" value="generate challenge" className="btn"
                    style={{ backgroundColor: "#30aee9" }}></input>
            </form>
            <p className="commentary">Adventurous? Don't care for the number of days<br></br> or curated categories?
                Click the button below!</p>
            <Button text="surprise me" onClick={onClick} color="#ffbb01"></Button>
        </div>
    );
  };

WordGenerator.propTypes = {
    onGenerate: PropTypes.func,
    onGenerateSurprise: PropTypes.func
};

export default WordGenerator;
