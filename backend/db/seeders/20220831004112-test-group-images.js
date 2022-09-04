'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        id: 101,
        groupId: 101,
        url: 'https://imagehost.com/groupimage1',
        preview: true
      },
      {
        id: 102,
        groupId: 102,
        url: 'https://imagehost.com/groupimage2',
        preview: true
      },
      {
        id: 103,
        groupId: 103,
        url: 'https://imagehost.com/groupimage3',
        preview: true
      },
      {
        id: 104,
        groupId: 104,
        url: 'https://imagehost.com/groupimage4',
        preview: true
      },
      {
        id: 105,
        groupId: 105,
        url: 'https://imagehost.com/groupimage5',
        preview: true
      },
      {
        id: 106,
        groupId: 101,
        url: 'https://imagehost.com/groupimage11',
        preview: true
      },
      {
        id: 107,
        groupId: 102,
        url: 'https://imagehost.com/groupimage22',
        preview: true
      },
      {
        id: 108,
        groupId: 103,
        url: 'https://imagehost.com/groupimage33',
        preview: true
      },
      {
        id: 109,
        groupId: 104,
        url: 'https://imagehost.com/groupimage44',
        preview: true
      },
      {
        id: 110,
        groupId: 105,
        url: 'https://imagehost.com/groupimage55',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,11]}
    }, {});
  }
};
