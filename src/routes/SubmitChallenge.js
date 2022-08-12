import React from "react";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button"
import Footer from "../components/Footer";

const SubmitChallenge = () => {
  const [ imageUpload, setImageUpload ] = useState(null);
  const [ selectedChallenge, setSelectedChallenge ] = useState("")

  const uploadFile = () => {
    if (imageUpload == null) return;

    const weeklyImageRef = ref(storage, `weekly-challenges/${imageUpload.name + v4()}`);
    const monthlyImageRef = ref(storage, `monthly-challenges/${imageUpload.name + v4()}`);

    let imageRef = ""

    if (selectedChallenge === "monthly") {
        imageRef = monthlyImageRef;
    } else {
        imageRef = weeklyImageRef;
    }

    uploadBytes(imageRef, imageUpload).then(() => {
        console.log("Challenge succcessfully uploaded.");
        navigateToThemedChallenges();
      }).catch((err) => {
        console.log(err)
      });
    };

  const navigate = useNavigate();

  const navigateToThemedChallenges = () => {
    navigate("/themedchallenges");
  };

  return (
    <div>
      <nav>
        <Link to="/">home</Link> |{" "}
        <Link to="/profile">profile</Link>
      </nav>
      <main>
          <h2>Share an Art Challenge</h2>
          <div className="vertical-box">
            <label>Choose challenge type: </label>
              <select onChange={ ((e) => setSelectedChallenge(e.target.value)) }>
                <option value="weekly">weekly challenge</option>
                <option value="monthly">monthly challenge</option>
              </select>
              <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg"
                  onChange={(e) => { setImageUpload(e.target.files[0]); }}/>
            <Button text="upload challenge" onClick={uploadFile} color="#30aee9"></Button>
          </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default SubmitChallenge;
