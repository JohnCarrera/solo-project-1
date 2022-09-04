'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      {
        id: 101,
        eventId: 101,
        url: 'https://imagehost.com/eventimage1',
        preview: true
      },
      {
        id: 102,
        eventId: 102,
        url: 'https://imagehost.com/eventimage2',
        preview: true
      },
      {
        id: 103,
        eventId: 103,
        url: 'https://imagehost.com/eventimage3',
        preview: true
      },
      {
        id: 104,
        eventId: 104,
        url: 'https://imagehost.com/eventimage4',
        preview: true
      },
      {
        id: 105,
        eventId: 105,
        url: 'https://imagehost.com/eventimage5',
        preview: true
      },
      {
        id: 106,
        eventId: 101,
        url: 'https://imagehost.com/eventimage11',
        preview: true
      },
      {
        id: 107,
        eventId: 102,
        url: 'https://imagehost.com/eventimage22',
        preview: true
      },
      {
        id: 108,
        eventId: 103,
        url: 'https://imagehost.com/eventimage33',
        preview: true
      },
      {
        id: 109,
        eventId: 104,
        url: 'https://imagehost.com/eventimage44',
        preview: true
      },
      {
        id: 110,
        eventId: 105,
        url: 'https://imagehost.com/eventimage55',
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
