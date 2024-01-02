const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "country_activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: false }
  );
};
