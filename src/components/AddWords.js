import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <form onSubmit = {addWords}>
                <div>
                    <h4>Add words to a category</h4><br></br>
                    <label>Category:</label>
                    <select onChange={ ((e) => setSelectedCategory(e.target.value) )}
                        defaultValue="choose">
                    <option value="choose" disabled >
                        -- Select category--</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>
                        {category.category}</option>)}
                    </select><br></br>
                    <label>Words: </label>
                    <input type="text" placeholder="Batman Superman Spiderman"
                    value={inputWords} onChange={(e) => setInputWords(e.target.value)}></input>
                </div>
                <input type="submit" value="submit words" className="btn"
                style={{ backgroundColor: "#30aee9" }}></input>
            </form>
        </div>
    );
  };

export default AddWords;
