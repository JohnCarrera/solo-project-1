'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
      {
        id: 101,
        groupId: 101,
        address: '2115 SE PSL BLVD',
        city: 'Port St. Lucie',
        state: 'FL',
        lat: 20.22,
        lng: 26.45657
      },
      {
        id: 102,
        groupId: 102,
        address: "500 US HWY 52",
        city: 'Bourne' ,
        state: 'MA',
        lat: 10.26579,
        lng: 46.654
      },
      {
        id: 103,
        groupId: 103,
        address: '2500 US HWY 1',
        city: 'Stuart' ,
        state: 'FL',
        lat: 26.6579,
        lng: 25.456987
      },
      {
        id: 104,
        groupId: 103,
        address: "1502 S Indiantown RD",
        city: 'Jupiter' ,
        state: 'FL',
        lat: 24.564,
        lng: 78.66542
      },
      {
        id: 105,
        groupId: 105,
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
