'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      {
        id: 101,
        userId: 101,
        groupId: 101,
        status: 'current'
      },
      {
        id: 102,
        userId: 102,
        groupId: 101,
        status: 'current'
      },
      {
        id: 103,
        userId: 103,
        groupId: 101,
        status: 'current'
      },
      {
        id: 104,
        userId: 106,
        groupId: 101,
        status: 'current'
      },
      {
        id: 105,
        userId: 104,
        groupId: 102,
        status: 'current'
      },
      {
        id: 106,
        userId: 105,
        groupId: 102,
        status: 'current'
      },
      {
        id: 107,
        userId: 107,
        groupId: 102,
        status: 'current'
      },
      {
        id: 108,
        userId: 109,
        groupId: 102,
        status: 'current'
      },
      {
        id: 109,
        userId: 103,
        groupId: 103,
        status: 'current'
      },
      {
        id: 110,
        userId: 110,
        groupId: 103,
        status: 'current'
      },
      {
        id: 111,
        userId: 107,
        groupId: 104,
        status: 'current'
      },
      {
        id: 112,
        userId: 109,
        groupId: 104,
        status: 'current'
      },
      {
        id: 113,
        userId: 110,
        groupId: 104,
        status: 'current'
      },
      {
        id: 114,
        userId: 104,
        groupId: 105,
        status: 'current'
      },
      {
        id: 115,
        userId: 108,
        groupId: 105,
        status: 'current'
      },
      {
        id: 116,
        userId: 107,
        groupId: 105,
        status: 'current'
      },
      {
        id: 117,
        userId: 102,
        groupId: 105,
        status: 'current'
      },
      {
        id: 118,
        userId: 103,
        groupId: 105,
        status: 'current'
      },
      {
        id: 119,
        userId: 101,
        groupId: 105,
        status: 'current'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,20]}
    }, {});
  }
};
