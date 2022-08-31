'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      Group.belongsToMany(models.User, {
          through: models.Membership
        });

      Group.belongsTo(models.User, {
          foreignKey: 'organizerId',
          allowNull: false
        });

      Group.hasMany(models.Venue);

      Group.hasMany(models.GroupImage);

      Group.hasMany(models.Event);
    }
  }
  Group.init({
    organizerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    about: DataTypes.STRING,
    type: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
