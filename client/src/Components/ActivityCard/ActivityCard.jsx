import React from "react";
import styles from "./ActivityCard.module.css";

function ActivityCard({
  id,
  name,
  difficulty,
  season,
  duration,
  Countries,
  handleDelete,
}) {
  return (
    <div key={`div${id}`} className={styles.activityContainer}>
      <div>
        <p className={styles.line}>
          ID: <span> {id} </span>
        </p>
        <p className={styles.line}>
          Name: <span> {name} </span>
        </p>
        <p className={styles.line}>
          Difficulty: <span> {difficulty} </span>
        </p>
        <p className={styles.line}>
          Season: <span> {season} </span>
        </p>
        <p className={styles.line}>
          Duration: <span> {duration} </span>
        </p>
        <p className={styles.line}>
          {Countries.length > 1 ? "Countries: " : "Country: "}
          <span>
            {new Intl.ListFormat("en-GB").format(
              Countries.map((country) => country.nameCommon)
            )}
          </span>
        </p>
      </div>
      <button className={styles.button} id={id} onClick={handleDelete}>
        Delete activity
      </button>
    </div>
  );
}

export default ActivityCard;
