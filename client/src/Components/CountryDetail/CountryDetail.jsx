import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./CountryDetail.module.css";

function CountryDetail() {
  const { id } = useParams();
  const ENDPOINT = `/countries/`;

  const [country, setCountry] = useState({});
  const [imghandler, setImghandler] = useState(styles.imgPair);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const { data } = await axios(ENDPOINT + id);
        const { country } = data;
        setCountry(country);
      } catch (error) {}
    };
    fetchCountry();
    return () => {
      setCountry({});
    };
  }, [id]);

  return (
    <div className={styles.container}>
      {country.id ? (
        <div className={styles.containerInfo}>
          <div className={styles.info}>
            <p className={styles.line}>
              Identification: <span> {country.id} </span>
            </p>
            <p className={styles.line}>
              Official name: <span> {country.name} </span>
            </p>
            <p className={styles.line}>
              Common Name: <span> {country.nameCommon} </span>
            </p>
            <p className={styles.line}>
              Continent: <span> {country.continent} </span>
            </p>
            <p className={styles.line}>
              Capital: <span> {country.capital} </span>
            </p>

            {country.subregion ? (
              <p className={styles.line}>
                Subregion: <span> {country.subregion} </span>
              </p>
            ) : (
              ""
            )}

            <p className={styles.line}>
              Area:{" "}
              <span>
                {" "}
                {new Intl.NumberFormat("en", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(country.area)}
                {" m2"}
              </span>
            </p>

            {country.population ? (
              <p className={styles.line}>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat("en", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(country.population)}
                  {" people"}
                </span>
              </p>
            ) : null}

            {country.Activities.length ? (
              <p className={styles.line}>
                Activities:{" "}
                <span>
                  {new Intl.ListFormat("en-GB").format(
                    country.Activities.map((act) => act.name)
                  )}
                </span>
              </p>
            ) : (
              ""
            )}
          </div>

          <div className={styles.imgContainer}>
            {country.coatOfArms ? (
              <div className={styles.imgPair}>
                <img
                  className={styles.image}
                  src={country.flag}
                  alt={`flag of ${country.name}`}
                />
                <p className={styles.line}>Flag</p>
              </div>
            ) : (
              <div className={styles.noCoatOfArms}>
                <img
                  className={styles.image}
                  src={country.flag}
                  alt={`flag of ${country.name}`}
                />
                <p className={styles.line}>Flag</p>
              </div>
            )}
            {country.coatOfArms ? (
              <div className={imghandler}>
                <img
                  className={styles.image}
                  src={country.coatOfArms}
                  alt={`coat of arms of ${country.name}`}
                />
                <p className={styles.line}>Coat of Arms</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        "Cargando..."
      )}
    </div>
  );
}

export default CountryDetail;
