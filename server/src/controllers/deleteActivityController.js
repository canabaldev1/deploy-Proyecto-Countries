const { Activity, Country } = require("../db");

module.exports = async (req, res) => {
  const { id } = req.body;

  try {
    await Activity.destroy({
      where: { id },
    });

    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["id", "name", "nameCommon"],
        through: { attributes: [] },
      },
    });
    res.status(200).json({ delete: true, activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
