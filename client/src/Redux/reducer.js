import {
  EMPTY_COUNTRIES,
  SEARCH_COUNTRIES,
  FILTER,
  FETCH_ACTIVITIES,
  DELETE_ACTIVITY,
} from "./actions";

const initialState = {
  countries: [],
  countriesToShow: [],
  filterData: {
    order: "ascending",
    continents: [],
    activities: [],
  },
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesToShow: action.payload,
      };

    case EMPTY_COUNTRIES:
      return {
        ...state,
        countries: [],
        countriesToShow: [],
      };

    case FILTER:
      const filterData = action.payload;
      const { order, continents, activities } = filterData;

      let filteredCountries = [...state.countries];
      filteredCountries = continents.length
        ? filteredCountries.filter((country) =>
            continents.some((continent) => continent === country.continent)
          )
        : filteredCountries;

      filteredCountries = activities.length
        ? filteredCountries.filter((country) => {
            const activitiesOfCountry = country.Activities.map(
              (act) => act.name
            );

            return activities.some((act) => activitiesOfCountry.includes(act));
          })
        : filteredCountries;

      if (order === "ascending") {
        filteredCountries = filteredCountries.sort();
      } else {
        filteredCountries = filteredCountries.sort().reverse();
      }

      return { ...state, countriesToShow: filteredCountries, filterData };

    case FETCH_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
