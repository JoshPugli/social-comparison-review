import React, { useState, useRef } from "react";
import "./Reframe.module.scss";
import axios from "axios";

const Platform = () => {
  const [advice, setAdvice] = useState("");

  const getAdvice = async () => {
    const response = await axios.get("https://localhost:8000/information");
    setAdvice(response.data.slip.advice);
  }

  return (
    <div style={{ fontSize: "30px", marginTop: "30vh" }}>
      WOW! You have just recieved some great advice on how to reframe your thoughts about social media!
    </div>
  );
};

export default Platform;
