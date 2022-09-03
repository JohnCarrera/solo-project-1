'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId',
        allowNull: true
      });

      Event.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });

      Event.hasMany(models.EventImage, {
        foreignKey: 'eventId'
      });

      Event.belongsToMany(models.User, {
        through: models.Attendance
      });
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    venueId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    capacity: DataTypes.DECIMAL,
    price: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
       exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Event;
};
