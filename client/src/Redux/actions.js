import axios from "axios";

// ACCIONES
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const EMPTY_COUNTRIES = "EMPTY_COUNTRIES";
export const FILTER = "FILTER";

// funciones para el rerducer
export const searchCountries = (name) => {
  const endPoint = "http://localhost:3001/countries/?name=";
  const nameToSearch = name || "";

  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint + nameToSearch);
      return dispatch({
        type: SEARCH_COUNTRIES,
        payload: data.countries,
      });
    } catch (error) {
      console.log(error.data);

      return dispatch({
        type: EMPTY_COUNTRIES,
      });
    }
  };
};

export const emptySearchCountries = () => {
  return {
    type: EMPTY_COUNTRIES,
  };
};

export const filterCountries = (filterData) => {
  return {
    type: FILTER,
    payload: filterData,
  };
};
