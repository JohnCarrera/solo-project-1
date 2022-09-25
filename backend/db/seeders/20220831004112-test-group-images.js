'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'https://i.imgur.com/qEG2YPU.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://i.imgur.com/gSS2n01.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://i.imgur.com/azSjZHi.jpg',
        preview: true
      },
      {
        groupId: 4,
        url: 'https://i.imgur.com/vHh6W1K.jpg',
        preview: true
      },
      {
        groupId: 5,
        url: 'https://i.imgur.com/JhxcNpx.jpg',
        preview: true
      },
    {
        groupId: 6,
        url: 'https://i.imgur.com/AkvxTOa.jpg',
        preview: true
      },
      {
        groupId:7,
        url: 'https://i.imgur.com/krOe105.jpg',
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
