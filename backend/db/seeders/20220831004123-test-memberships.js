'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        id: 1,
        userId: 1,
        groupId: 1,
        status: 'current'
      },
      {
        id: 2,
        userId: 2,
        groupId: 1,
        status: 'current'
      },
      {
        id: 3,
        userId: 3,
        groupId: 1,
        status: 'current'
      },
      {
        id: 4,
        userId: 6,
        groupId: 1,
        status: 'current'
      },
      {
        id: 5,
        userId: 4,
        groupId: 2,
        status: 'current'
      },
      {
        id: 6,
        userId: 5,
        groupId: 2,
        status: 'current'
      },
      {
        id: 7,
        userId: 7,
        groupId: 2,
        status: 'current'
      },
      {
        id: 8,
        userId: 9,
        groupId: 2,
        status: 'current'
      },
      {
        id: 9,
        userId: 3,
        groupId: 3,
        status: 'current'
      },
      {
        id: 10,
        userId: 10,
        groupId: 3,
        status: 'current'
      },
      {
        id: 11,
        userId: 7,
        groupId: 4,
        status: 'current'
      },
      {
        id: 12,
        userId: 9,
        groupId: 4,
        status: 'current'
      },
      {
        id: 13,
        userId: 10,
        groupId: 4,
        status: 'current'
      },
      {
        id: 14,
        userId: 10,
        groupId: 6,
        status: 'current'
      },
      {
        id: 15,
        userId: 10,
        groupId: 8,
        status: 'current'
      },
      {
        id: 16,
        userId: 7,
        groupId: 9,
        status: 'current'
      },
      {
        id: 17,
        userId: 2,
        groupId: 5,
        status: 'current'
      },
      {
        id: 18,
        userId: 3,
        groupId: 5,
        status: 'current'
      },
      {
        id: 19,
        userId: 1,
        groupId: 5,
        status: 'current'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,20]}
    }, {});
  }
};
