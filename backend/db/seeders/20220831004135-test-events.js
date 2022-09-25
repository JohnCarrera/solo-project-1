'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        venueId: 1,
        groupId: 1,
        name: 'E-Corp DDOS Strategy and Planning',
        description: 'Select fsociety members, chosen for their ' +
            'particular expertise, will meet at HQ to plan the next hack',
        type: 'In person',
        capacity: 5,
        price: 0,
        startDate: '2022-12-13 07:00:00',
        endDate: '2022-12-13 15:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Strategic Meeting',
        description: 'Members will plan for the next organizational shift within ' +
            'Anonymous and audit secrecy and security policies',
        type: 'Online',
        capacity: 100,
        price: 50.00,
        startDate: '2022-11-25 10:00:00',
        endDate: '2022-11-25 18:00:00'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Work on WideVine exploit',
        description: 'Members will meet online to collaborate on the latest exploit ' +
            'for the popular WideVine streaming media security and DRM software.',
        type: 'Online',
        capacity: 120,
        price: 1200.00,
        startDate: '2022-10-01 11:00:00',
        endDate: '2022-10-01 19:00:00'
      },
      {
        venueId: 4,
        groupId: 4 ,
        name: 'CCC Group Study: Historical Corporate Software Vulnerabilities',
        description: 'CCC members will gather and enjoy a lecture on the hisory ' +
            'of corporate hacking and social engineering povided by our own experts. Catering Provided by The Snack Hack',
        type: 'In person',
        capacity: 80,
        price: 53.50,
        startDate: '2022-10-22 14:00:00',
        endDate: '2022-10-22 16:00:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'Intro to Operators: a Beginner Course',
        description: 'Our very own Dozer will lead us through an all-day course ' +
            'dedicated to new Operators. The course all the basics as well as ' +
            'tips & tricks by Tank himself. Lunch will be provided!',
        type: 'In person',
        capacity: 7,
        price: 0,
        startDate: '2023-01-01 06:00:00',
        endDate: '2023-01-01 18:00:00'
      },
      {
        venueId: 6,
        groupId: 6,
        name: 'WikiLeaks: 10-Year Anniversary Symposium On Data Gathering ',
        description: 'Our own Julian Assange and Kristinn Hrafnsson will lead  ' +
            'a symposium on data gathering in the digital world. This is a rare ' +
            'WL event that will be open to the general public. Food trucks will ' +
            'be available on-site at lunch!',
        type: 'In person',
        capacity: 200,
        price: 150.00,
        startDate: '2023-03-15 18:00:00',
        endDate: '2023-03-15 22:00:00'
      },
      {
        venueId: 7,
        groupId: 7,
        name: 'Engineering Squad Intro to Circuitry',
        description: 'Johnny 5 will talk about the ins-and outs of circuitry for robotics. ' +
            'This important skill is highly desired in the world of AI robotics and will surely ' +
            'boost your standing at your next hometown robotics competition. Price includes refreshments!' +
            'be available on-site at lunch!',
        type: 'In person',
        capacity: 30,
        price: 150.00,
        startDate: '2023-03-02 08:00:00',
        endDate: '2023-03-02 17:00:00'
      },


    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      id: { [Op.between]: [0,12]}
    }, {});
  }
};
