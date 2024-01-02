import styles from "./Cards.module.css";
import { useSelector, useDispatch } from "react-redux";
import { searchCountries } from "../../Redux/actions";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useDebounce } from "../../assets/customHooks";

function Cards({ searchName, page, setPage }) {
  const dispatch = useDispatch();

  // custom hook - Demorar la peticion.
  // el valor de name se asigna 1 segundo DESPUES de que cambia el valor de searchName.
  name = useDebounce(searchName, 1000);

  useEffect(() => {
    dispatch(searchCountries(name));
    setPage(1);
  }, [name]);

  const countries = useSelector((state) => state.countries);
  const countriesToShow = useSelector((state) => state.countriesToShow);

  const [countriesToMap, setCountriesToMap] = useState([]);

  useEffect(() => {
    const length = 10;
    setCountriesToMap(
      countriesToShow.slice((page - 1) * length, page * length)
    );
  }, [countriesToShow, page, length]);

  return (
    <div className={styles.container}>
      {countries.length ? (
        <div className={styles.countryContainer}>
          {countriesToMap.map((country) => {
            return (
              <Card
                key={`card${country.id}`}
                id={country.id}
                name={country.name}
                nameCommon={country.nameCommon}
                flag={country.flag}
                coatOfArms={country.coatOfArms}
                continent={country.continent}
                activities={country.activities}
              />
            );
          })}
        </div>
      ) : (
        <h1>NO COUNTRY FOUND</h1>
      )}
    </div>
  );
}

export default Cards;
