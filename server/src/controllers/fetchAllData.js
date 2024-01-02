const axios = require("axios");
const { API_URL } = process.env;
console.log(API_URL);
const { Country, CountryName } = require("../db");

const fetchAllData = async () => {
  try {
    const { data } = await axios(API_URL);
    const countries = data.map((country) => {
      return {
        id: country.cioc || country.cca3,
        name: country.name.official,
        nameCommon: country.name.common,
        flag: country.flags.svg,
        coatOfArms: country.coatOfArms.svg,
        continent: country.continents && country.continents.toString(),
        capital: country.capital && country.capital.toString(),
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });
    await Country.bulkCreate(countries, {
      updateOnDuplicate: [
        "id",
        "name",
        "nameCommon",
        "flag",
        "continent",
        "capital",
        "subregion",
        "area",
        "population",
        "coatOfArms",
      ],
    });

    const languages = data.map((country) => {
      // extraer de la propiedad translations todos los valores

      // con Object.entries(country.translations) creo un array de arrays, el primer valor es el idioma en el que esta el nombre y el segundo es un objeto con los nombres

      return Object.entries(country.translations).map((name) => {
        // devuelvo un objeto con el id del pais, el idioma en el que voy a dar el nombre, y los nombres en ese idioma, oficial y comun. Falta hacerle flat() porque ahora mismo son un array de array de objetos, y necesito que sean un array de objetos para hacer el bulk create

        return {
          countryId: country.cioc || country.cca3,
          languageId: name[0],
          official: name[1].official,
          common: name[1].common,
        };
      });
    });

    await CountryName.bulkCreate(languages.flat(), {
      updateOnDuplicate: ["countryId", "languageId", "official", "common"],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchAllData;
