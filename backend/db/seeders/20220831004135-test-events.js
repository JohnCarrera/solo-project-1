'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        id: 101,
        venueId: 101,
        groupId: 101,
        name: 'Pickers Meet',
        description: 'First pick of the season!',
        type: 'In Person',
        capacity: 5,
        price: 30.00,
        startDate: '2022-09-13 07:00:00',
        endDate: '2022-09-13 15:00:00'
      },
      {
        id: 102,
        venueId: 101,
        groupId: 101,
        name: 'Autumn Apples',
        description: 'Come out to the orchard!',
        type: 'In Person',
        capacity: 6,
        price: 45.00,
        startDate: '2022-10-17 14:00:00',
        endDate: '2022-10-17 17:00:00'
      },
      {
        id: 103,
        venueId: null,
        groupId: 102,
        name: 'Anti-Crime Squad Meet 1',
        description: 'First meet of september',
        type: 'Online',
        capacity: 12,
        price: 0.00,
        startDate: '2022-09-01 17:30:00',
        endDate: '2022-09-01 18:30:00'
      },
      {
        id: 104,
        venueId: 104,
        groupId: 103,
        name: 'Play-date for the bebes',
        description: 'Play date at Tree Tops park!',
        type: 'In Person',
        capacity: 4,
        price: 10.00,
        startDate: '2022-10-01 12:30:00',
        endDate: '2022-10-01 15:30:00'
      },
      {
        id: 105,
        venueId: 104,
        groupId: 103,
        name: 'Play-date for the bebes v2',
        description: 'Play date at riverbend park',
        type: 'In Person',
        capacity: 4,
        price: 10.00,
        startDate: '2022-10-01 12:30:00',
        endDate: '2022-10-01 15:30:00'
      },
      {
        id: 106,
        venueId: null,
        groupId: 102,
        name: 'Anti-Crime Squad Meet 1',
        description: 'First meet of October',
        type: 'Online',
        capacity: 12,
        price: 0.00,
        startDate: '2022-10-01 17:30:00',
        endDate: '2022-10-01 18:30:00'
      },
      {
        id: 107,
        venueId: null,
        groupId: 104,
        name: 'Dr K\'s Mom-meet 1',
        description: 'First meet for the moms!',
        type: 'Online',
        capacity: 5,
        price: 30.00,
        startDate: '2022-10-03 17:30:00',
        endDate: '2022-10-03 19:30:00'
      },
      {
        id: 108,
        venueId: null,
        groupId: 104,
        name: 'Dr K\'s Mom-meet 2',
        description: 'Second meet for the moms!',
        type: 'Online',
        capacity: 5,
        price: 30.00,
        startDate: '2022-10-13 17:30:00',
        endDate: '2022-10-13 19:30:00'
      },
      {
        id: 109,
        venueId: 105,
        groupId: 105,
        name: 'Woodworker\'s Guild - Penmaking Workshop',
        description: 'Come learn to make custom pens! All materials and tools included in fee.',
        type: 'In Person',
        capacity: 8,
        price: 75.00,
        startDate: '2022-10-10 08:30:00',
        endDate: '2022-10-10 14:30:00'
      },
      {
        id: 110,
        venueId: 105,
        groupId: 105,
        name: 'Woodworker\'s Guild - Cutting Board 2-Day Workshop',
        description: 'Come learn to make custom cutting boards! All materials and tools included in fee.',
        type: 'In Person',
        capacity: 8,
        price: 200.00,
        startDate: '2022-10-24 08:30:00',
        endDate: '2022-10-25 14:30:00'
      },
      {
        id: 111,
        venueId: 105,
        groupId: 105,
        name: 'Woodworker\'s Guild - Box Maker\'s 2-Day Workshop',
        description: 'Come learn to make custom cutting boards! All materials and tools included in fee.',
        type: 'In Person',
        capacity: 8,
        price: 200.00,
        startDate: '2022-11-24 08:30:00',
        endDate: '2022-11-25 14:30:00'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,12]}
    }, {});
  }
};
