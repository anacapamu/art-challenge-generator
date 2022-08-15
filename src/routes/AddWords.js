import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const backEndUrl = process.env.REACT_APP_BACKEND_URL;

const AddWords = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [inputWords, setInputWords] = useState("");

    useEffect(() => {
        const getCategories = () => {
            return axios.get(`${backEndUrl}/categories`)
            .then((res) => {
              setCategories(res.data)
            }).catch((err) => {
              console.log(err)
            });
          };
        getCategories();
    }, []);

    const addWords = (e) => {
        e.preventDefault();

        let editedWords = inputWords.toLowerCase();
        let wordsArray = editedWords.split(" ");

        wordsArray.forEach((word) => {
            let formatted_word = {};
            formatted_word["word"] = word;
            axios.post(`${backEndUrl}/categories/${selectedCategory}/words`, formatted_word)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
        });

        setInputWords("");
        e.target.reset();
    };

    return (
        <div className="fit-content">
            <nav>
            <Link to="/">home</Link> |{" "}
            <Link to="/profile">profile</Link>
             </nav>
            <form onSubmit = {addWords}>
                <h1>Add Words to a Category</h1>
                <div className="vertical-box">
                    <label>Category:</label>
                    <select onChange={ ((e) => setSelectedCategory(e.target.value) )}
                        defaultValue="choose">
                    <option value="choose" disabled >
                        -- Select category--</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>
                        {category.category}</option>)}
                    </select>
                    <p className="commentary">Each word should be separated by a space.</p>
                    <label>Words: </label>
                    <input type="text" placeholder="Batman Superman Spiderman"
                    value={inputWords} onChange={(e) => setInputWords(e.target.value)}></input>
                    <input type="submit" value="submit words" className="btn"
                    style={{ backgroundColor: "#30aee9" }}></input>
                </div>
            </form>
            <Footer></Footer>
        </div>
    );
  };

export default AddWords;
