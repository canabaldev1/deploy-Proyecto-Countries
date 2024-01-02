const { DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
  sequelize.define(
    "CountryName",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      official: {
        type: DataTypes.STRING(100),
        // allowNull: false,
      },
      common: {
        type: DataTypes.STRING(100),
        // allowNull: false,
      },
      countryId: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      languageId: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
