require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const countryFunction = require("./models/Country");
const activityFunction = require("./models/Activity");
const countryNameFunction = require("./models/CountryName");
const country_activityFunction = require("./models/country_activity");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// AQUI SE CREAN LOS MODELOS PREVIAMENTE DEFINIDOS

countryFunction(sequelize);
activityFunction(sequelize);
countryNameFunction(sequelize);
country_activityFunction(sequelize);

// Y AQUI SE EXTRAEN

const { Country, Activity, CountryName, country_activity } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Country.belongsToMany(Activity, {
  through: country_activity,
  foreignKey: "CountryId",
});
Activity.belongsToMany(Country, {
  through: country_activity,
  foreignKey: "ActivityId",
});

Country.hasMany(CountryName, { as: "names", foreignKey: "countryId" });
CountryName.belongsTo(Country, { foreignKey: "countryId" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
