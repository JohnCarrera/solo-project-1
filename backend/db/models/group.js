'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsToMany(models.User, {
          through: models.Membership
        });

      Group.belongsTo(models.User,{
          foreignKey: 'organizerId',
          allowNull: false
        });

      Group.hasMany(models.Venue, {
          //foreignKey: 'groupId'
        });

      Group.hasMany(models.GroupImage, {
        //foreignKey: 'groupId'
      });

      Group.hasMany(models.Event, {
        //foreignKey: 'groupId'
      })
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
