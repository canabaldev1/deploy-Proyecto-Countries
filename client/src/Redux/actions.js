import axios from "axios";

// ACCIONES
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const EMPTY_COUNTRIES = "EMPTY_COUNTRIES";
export const FILTER = "FILTER";
export const FETCH_ACTIVITIES = "FETCH_ACTIVITIES;";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";

// funciones para el rerducer
export const searchCountries = (name) => {
  const endPoint = "/countries/?name=";
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

// export const searchCountries = (name) => {

export const fetchActivities = () => {
  const endPoint = "/activity";

  return async (dispatch) => {
    try {
      const { data } = await axios(endPoint);
      return dispatch({
        type: FETCH_ACTIVITIES,
        payload: data.activities,
      });
    } catch (error) {
      console.log(error.data);
    }
  };
};

export const deleteActivity = (id) => {
  const endPoint = "/activity";

  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endPoint, { data: { id } });
      return dispatch({
        type: FETCH_ACTIVITIES,
        payload: data.activities,
      });
    } catch (error) {
      console.log(error.data);
    }
  };
};
