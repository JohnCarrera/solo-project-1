'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
      {
        id: 1,
        groupId: 1,
        address: '2115 SE PSL BLVD',
        city: 'Port St. Lucie',
        state: 'FL',
        lat: 20.22,
        lng: 26.45657
      },
      {
        id: 2,
        groupId: 2,
        address: "500 US HWY 52",
        city: 'Bourne' ,
        state: 'MA',
        lat: 10.26579,
        lng: 46.654
      },
      {
        id: 3,
        groupId: 3,
        address: '2500 US HWY 1',
        city: 'Stuart' ,
        state: 'FL',
        lat: 26.6579,
        lng: 25.456987
      },
      {
        id: 4,
        groupId: 3,
        address: "1502 S Indiantown RD",
        city: 'Jupiter' ,
        state: 'FL',
        lat: 24.564,
        lng: 78.66542
      },
      {
        id: 5,
        groupId: 5,
        address: "18255 Cedar St.",
        city: 'Steamboat Springs' ,
        state: 'CO',
        lat: 541.65497,
        lng: 854.26576
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,6]}
    }, {});
  }
};
