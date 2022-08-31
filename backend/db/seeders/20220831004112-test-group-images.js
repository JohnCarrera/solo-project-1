'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        id: 1,
        groupId: 1,
        url: 'https://imagehost.com/groupimage1',
        preview: true
      },
      {
        id: 2,
        groupId: 2,
        url: 'https://imagehost.com/groupimage2',
        preview: true
      },
      {
        id: 3,
        groupId: 3,
        url: 'https://imagehost.com/groupimage3',
        preview: true
      },
      {
        id: 4,
        groupId: 4,
        url: 'https://imagehost.com/groupimage4',
        preview: true
      },
      {
        id: 5,
        groupId: 5,
        url: 'https://imagehost.com/groupimage5',
        preview: true
      },
      {
        id: 6,
        groupId: 1,
        url: 'https://imagehost.com/groupimage11',
        preview: true
      },
      {
        id: 7,
        groupId: 2,
        url: 'https://imagehost.com/groupimage22',
        preview: true
      },
      {
        id: 8,
        groupId: 3,
        url: 'https://imagehost.com/groupimage33',
        preview: true
      },
      {
        id: 9,
        groupId: 4,
        url: 'https://imagehost.com/groupimage44',
        preview: true
      },
      {
        id: 10,
        groupId: 5,
        url: 'https://imagehost.com/groupimage55',
        preview: true
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
