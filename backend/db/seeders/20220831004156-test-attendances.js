'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Attendances', [
    {
        id: 101,
        eventId: 109,
        userId: 101,
        status: 'member'
      },
      {
        id: 102,
        eventId: 109,
        userId: 102,
        status: 'member'
      },
      {
        id: 103,
        eventId: 109,
        userId: 103,
        status: 'waitlist'
      },
      {
        id: 104,
        eventId: 109,
        userId: 104,
        status: 'pending'
      },
      {
        id: 105,
        eventId: 109,
        userId: 107,
        status: 'member'
      },
      {
        id: 106,
        eventId: 109,
        userId: 108,
        status: 'waitlist'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
