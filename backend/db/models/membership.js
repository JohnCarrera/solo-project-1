'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Membership.hasOne(models.Group, {
      //   foreignKey: 'groupId',
      //   as: 'groupMemberIds'
      // })

      // Membership.hasOne(models.User, {
      //   foreignKey: 'id'
      // });

      Membership.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'Membership'
      });
    }
  }
  Membership.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Membership',
    scopes: {
        userMembership: {
          attributes:  ["status"]
        },
        newMember: {
            attributes: [
                'groupId',
                ['userId', 'memberId'],
                'status'
            ]
        }
      }
  });
  return Membership;
};
