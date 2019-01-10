module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define("burger", {
    // Giving the Author model a name of type STRING
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN
  });

  burgers.associate = function(models) {
    // Associating burgers with Posts
    // When an burgers is deleted, also delete any associated Posts
    burgers.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return burgers;
};
