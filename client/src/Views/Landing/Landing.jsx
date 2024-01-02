import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import LandingButton from "../../Components/LandingButton/LandingButton";

function Landing(params) {
  return (
    <div className={style.container}>
      <LandingButton />
    </div>
  );
}

export default Landing;
