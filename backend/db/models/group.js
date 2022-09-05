'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      Group.belongsToMany(models.User, {
          through: models.Membership,
          foreignKey: 'groupId'
        });

      Group.hasMany(models.Membership, {
        foreignKey: 'groupId',
        as: 'groupMemberIds '
      });

      Group.belongsTo(models.User, { //fk refers to fk in this table ==> difference is belongs vs has
          foreignKey: 'organizerId',
          allowNull: false,
          as: 'Organizer'
        });

      Group.hasMany(models.Venue, { //fk refers to foreign key in venue table
        foreignKey: 'groupId'
      });

      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId'
      });

      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
      });
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
    scopes: {
      eventRoute: {
        attributes: ['id', 'name', 'city', 'state']
      },
      eventIdRoute: {
        attributes: ['id', 'name', 'private', 'city', 'state']
      }
    }
  });
  return Group;
};
