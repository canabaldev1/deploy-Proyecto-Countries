import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingButton.module.css";
import MIlogo from "../../assets/logo.svg";

function LandingButton(params) {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.text}>
          <h3 className={style.subtittle}>Welcome to</h3>
          <h2 className={style.tittle}>COUNTRY EXPLORER</h2>
          <h3 className={style.subtittle}>Let's begin our travel together</h3>
          <Link to="/home" className={style.button}>
            EXPLORE COUNTRIES
          </Link>
        </div>
        <img src={MIlogo} alt="" />
      </div>
    </div>
  );
}

export default LandingButton;
