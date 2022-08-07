import React from "react";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"

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

    console.log(imageRef)

    uploadBytes(imageRef, imageUpload).then(() => {
        console.log("Challenge succcessfully uploaded.");
        navigateToThemedChallenges();
      });
  };

  const navigate = useNavigate();

  const navigateToThemedChallenges = () => {
    navigate("/themedchallenges");
  };

  return (
    <section>
        <h2>Upload a Challenge</h2>
        <label>Choose challenge type: </label>
            <select onChange={ ((e) => setSelectedChallenge(e.target.value)) }>
                <option value="weekly">weekly challenge</option>
                <option value="monthly">monthly challenge</option>
                </select>
        <input className="btn" type="file" onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}/>
      <Button text="upload challenge" onClick={uploadFile} color="#30aee9"></Button>
    </section>
  );
}

export default SubmitChallenge;
