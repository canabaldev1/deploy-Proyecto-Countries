const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nameCommon: {
        type: DataTypes.STRING(100),
      },
      flag: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { isUrl: true },
      },
      coatOfArms: {
        type: DataTypes.STRING(100),
        // allowNull: false,
        validate: { isUrl: true },
      },
      continent: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "No capital",
      },
      subregion: DataTypes.STRING(30),
      area: DataTypes.INTEGER, // revisar si se necesitan decimaless con las pruebas
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
