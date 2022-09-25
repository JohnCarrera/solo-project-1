'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: 'Abandoned arcade',
        city: 'Coney Island',
        state: 'NY',
        lat: 20.22,
        lng: 26.45657
      },
      {
        groupId: 2,
        address: "Anonymous online space",
        city: 'Sacramento' ,
        state: 'CA',
        lat: 10.26579,
        lng: 46.654
      },
      {
        groupId: 3,
        address: 'Scene HQ',
        city: 'Kemah' ,
        state: 'TX',
        lat: 26.6579,
        lng: 25.456987
      },
      {
        groupId: 4,
        address: "CCC Web HQ",
        city: 'Jupiter' ,
        state: 'FL',
        lat: 24.564,
        lng: 78.66542
      },
      {
        groupId: 5,
        address: "The Nebuchadnezzar",
        city: 'Xion' ,
        state: 'OR',
        lat: 541.65497,
        lng: 854.26576
      },
      {
        groupId: 6,
        address: "500 Market Street",
        city: 'Philadelphia' ,
        state: 'PA',
        lat: 541.65497,
        lng: 854.26576
      },
      {
        groupId: 7,
        address: "Astoria Military Base",
        city: 'Astoria' ,
        state: 'OR',
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
