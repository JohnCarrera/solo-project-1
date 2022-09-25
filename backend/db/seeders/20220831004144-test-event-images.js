'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'https://i.imgur.com/J33DzXc.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://i.imgur.com/VRy6042.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://i.imgur.com/HM0hjcV.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://i.imgur.com/KpSqIsj.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://i.imgur.com/gadjOM9.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://i.imgur.com/eskgVPX.jpg',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://i.imgur.com/9oobHrT.jpg',
        preview: true
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,11]}
    }, {});
  }
};
