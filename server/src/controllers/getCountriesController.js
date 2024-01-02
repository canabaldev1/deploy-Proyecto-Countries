const { Country } = require("../db");
const { Activity } = require("../db");
// const { CountryName } = require("../db");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { name } = req.query;
  const atributesToInclude = [
    "id",
    "name",
    "nameCommon",
    "flag",
    "continent",
    "coatOfArms",
  ];
  try {
    let countries = [];
    if (name) {
      countries = await Country.findAll({
        include: [
          {
            model: Activity,
            attributes: ["id", "name", "difficulty", "duration"],
            through: {
              attributes: [], // revisar el comportamiento de esta propiedad
            },
          },
        ],
        attributes: atributesToInclude,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
            {
              nameCommon: {
                [Op.iLike]: `%${name}%`,
              },
            },
          ],
        },
        order: [["nameCommon", "ASC"]], //ORDENAR
      });
      if (!countries.length) {
        return res.status(404).json({ error: "Country Not Found" });
      }
    } else {
      countries = await Country.findAll({
        attributes: atributesToInclude,
        include: [
          {
            model: Activity,
            attributes: ["id", "name", "difficulty", "duration"],
            through: {
              attributes: [], // revisar el comportamiento de esta propiedad
            },
          },
          //   {
          //     model: CountryName,
          //     as: "names",
          //     attributes: ["common", "official", "languageId"],
          //   },
        ],
        order: [["name", "ASC"]], //ORDENAR
      });
    }
    res.status(200).json({ countries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
