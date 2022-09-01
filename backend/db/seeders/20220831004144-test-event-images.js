'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      {
        id: 1,
        eventId: 1,
        url: 'https://imagehost.com/eventimage1',
        preview: true
      },
      {
        id: 2,
        eventId: 2,
        url: 'https://imagehost.com/eventimage2',
        preview: true
      },
      {
        id: 3,
        eventId: 3,
        url: 'https://imagehost.com/eventimage3',
        preview: true
      },
      {
        id: 4,
        eventId: 4,
        url: 'https://imagehost.com/eventimage4',
        preview: true
      },
      {
        id: 5,
        eventId: 5,
        url: 'https://imagehost.com/eventimage5',
        preview: true
      },
      {
        id: 6,
        eventId: 1,
        url: 'https://imagehost.com/eventimage11',
        preview: true
      },
      {
        id: 7,
        eventId: 2,
        url: 'https://imagehost.com/eventimage22',
        preview: true
      },
      {
        id: 8,
        eventId: 3,
        url: 'https://imagehost.com/eventimage33',
        preview: true
      },
      {
        id: 9,
        eventId: 4,
        url: 'https://imagehost.com/eventimage44',
        preview: true
      },
      {
        id: 10,
        eventId: 5,
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
