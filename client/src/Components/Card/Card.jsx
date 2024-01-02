import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ id, name, nameCommon, flag, continent, coatOfArms }) {
  const randomNumber = Math.random();

  let classContainer = "";

  if (randomNumber > 0.9) {
    classContainer = `${styles.container} ${styles.containerLarger}`;
  } else {
    classContainer = `${styles.container}`;
  }

  return (
    <Link to={`/detail/${id}`} className={classContainer}>
      {/* <h2>{id}</h2> */}
      <div className={styles.nameContainer}>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <div className={styles.nameCommonContainer}>
        <h3 className={styles.nameCommon}>{nameCommon}</h3>
      </div>
      <div className={styles.continentContainer}>
        <h3 className={styles.continent}>{continent}</h3>
      </div>
      <img className={styles.flagImage} src={flag} alt={name} />
      <div className={styles.coatOfArmsContainer}>
        {coatOfArms ? (
          <img className={styles.coatOfArmsImage} src={coatOfArms} alt={name} />
        ) : (
          <img className={styles.coatOfArmsImage} src={flag} alt={name} />
        )}
      </div>
    </Link>
  );
}

export default Card;
