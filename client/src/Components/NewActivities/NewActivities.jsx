import React, { useEffect, useState } from "react";
import styles from "./NewActivities.module.css";
import { useDebounce } from "../../assets/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { searchCountries, emptySearchCountries } from "../../Redux/actions";
import validate from "../../assets/validate";
import axios from "axios";

function NewActivities() {
  // Todo lo necesario para la busqueda de los paises a agregar a las actividades

  const [searchName, setSearchName] = useState("");
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [created, setCreated] = useState(false);

  const name = useDebounce(searchName, 500);

  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    if (name) {
      dispatch(searchCountries(name));
    } else {
      dispatch(emptySearchCountries());
    }
  }, [name]);

  const handleSearchName = (event) => {
    event.preventDefault();
    setSearchName(event.target.value);
  };

  // Reunir informacion de la actividad y su creacion

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [activityError, setActivityError] = useState({});

  const handleActivityParameters = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const newActivity = { ...activity, [key]: value };

    const currentError = validate(newActivity, setActivityError);

    setIsButtonDisabled(Boolean(Object.keys(currentError).length));

    setActivity(newActivity);
  };

  const handleClickOnCountries = (event) => {
    event.preventDefault();

    const { id, name } = event.target;
    const namecommon = event.target.dataset.namecommon;

    let stateCountries = [...activity.countries];
    const condition = stateCountries.some((country) => country.id === id);

    if (condition) {
      stateCountries = stateCountries.filter((country) => country.id !== id);
    } else {
      stateCountries = [
        ...stateCountries,
        { id, name, nameCommon: namecommon },
      ];
    }

    const newActivity = { ...activity, countries: stateCountries };

    const currentError = validate(newActivity, setActivityError);

    setIsButtonDisabled(Boolean(Object.keys(currentError).length));

    setActivity(newActivity);
  };

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let activityParams = {
      ...activity,
      countries: activity.countries.map((country) => country.id),
    };
    // const response = await dispatch(addActivity(activityParams));

    const endPoint = "http://localhost:3001/activity";

    try {
      const { data } = await axios.post(endPoint, activityParams);

      if (data) {
        setShowNotification(true);
        setCreated(data.created);
      }

      setActivity({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
      setSearchName("");

      setIsButtonDisabled(true);
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.optionContainer}>
          <label htmlFor="name">Name of the new activity</label>
          <input
            onChange={handleActivityParameters}
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={activity.name}
            required
            className={styles.inputs}
          />
        </div>
        <div className={styles.optionContainer}>
          <label htmlFor="difficulty">
            Difficulty (where 1 is very easy and 5 is extremely difficult)
          </label>

          <select
            onChange={handleActivityParameters}
            name="difficulty"
            id="difficulty"
            value={activity.difficulty}
            required
            className={styles.inputs}
          >
            {["", 1, 2, 3, 4, 5].map((n) => {
              return (
                <option key={n} value={n}>
                  {n}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.optionContainer}>
          <label htmlFor="duration">Duration in minutes</label>
          <input
            onChange={handleActivityParameters}
            type="number"
            id="duration"
            name="duration"
            required
            value={activity.duration}
            min={0}
            className={styles.inputs}
          />
        </div>
        <div className={styles.optionContainer}>
          <label htmlFor="season">Season of the year</label>
          <select
            onChange={handleActivityParameters}
            id="season"
            name="season"
            value={activity.season}
            className={styles.inputs}
          >
            {["", "Summer", "Fall", "Winter", "Spring"].map((n) => {
              return (
                <option key={n} value={n}>
                  {n}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.optionContainer}>
          <label htmlFor="countries">Countries where can be done</label>
          <input
            type="text"
            id="countries"
            name="countries"
            onChange={handleSearchName}
            value={searchName}
            className={styles.inputs}
          />

          <label className={styles.countryLabels}>
            Countries searched <span>Click to add</span>
          </label>
          <div className={styles.countryTagContainer}>
            {countries.map((country) => {
              return (
                <button
                  onClick={handleClickOnCountries}
                  className={styles.countryTag}
                  id={country.id}
                  key={`search${country.id}`}
                  name={country.name}
                  data-namecommon={country.nameCommon}
                >
                  {country.nameCommon}
                </button>
              );
            })}
          </div>

          {activity.countries.length ? (
            <label className={styles.countryLabels}>
              Countries selected <span>Click to remove</span>
            </label>
          ) : (
            ""
          )}
          {activity.countries.length ? (
            <div className={styles.countryTagContainer}>
              {activity.countries.map((country) => {
                return (
                  <button
                    onClick={handleClickOnCountries}
                    className={styles.countryTag}
                    id={country.id}
                    key={`search${country.id}`}
                    name={country.name}
                    data-namecommon={country.nameCommon}
                  >
                    {country.nameCommon ? country.nameCommon : ""}
                  </button>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <button
          className={isButtonDisabled ? styles.buttonDisabled : styles.button}
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          Create activity
        </button>
        <div>
          {Object.keys(activityError).map((key) => (
            <p key={`ck${key}`}> Error: {activityError[key]}</p>
          ))}
        </div>
      </form>
      {showNotification &&
        (created ? (
          <div className={styles.notification}>
            <p>ACTIVITY SUCCESSFULLY CREATED</p>
            <button onClick={handleClose}>Close</button>
          </div>
        ) : (
          <div className={styles.notification}>
            <p>THE ACTIVITY WAS UPDATED</p>
            <button onClick={handleClose}>Close</button>
          </div>
        ))}
    </div>
  );
}

export default NewActivities;
