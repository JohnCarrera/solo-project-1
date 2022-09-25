'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: 'Member'
      },
      {
        userId: 2,
        groupId: 2,
        status: 'Member'
      },
      {
        userId: 3,
        groupId: 3,
        status: 'Member'
      },
      {
        userId: 4,
        groupId: 4,
        status: 'Member'
      },
      {
        userId: 5,
        groupId: 5,
        status: 'Member'
      },
      {
        userId: 6,
        groupId: 6,
        status: 'Member'
      },
      {
        userId: 7,
        groupId: 7,
        status: 'Member'
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
