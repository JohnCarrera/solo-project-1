'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        id: 101,
        organizerId: 101,
        name: "Mike's Mangos",
        about: 'Just a group of dudes picking fruit.',
        type: 'In Person',
        private: false,
        city: 'Port St. Lucie',
        state: 'FL',
      },
      {
        id: 102,
        organizerId: 104,
        name: "Angel's Angels",
        about: 'Officer Angel\'s anti-crime squad.' ,
        type: 'Online',
        private: false,
        city: 'Bourne',
        state: 'MA',
      },
      {
        id: 103,
        organizerId: 103,
        name: "Bubanje Crew",
        about: 'Playdates for babies 0-2 years.' ,
        type: 'In Person',
        private: true,
        city: 'Stuart',
        state: 'FL',
      },
      {
        id: 104,
        organizerId: 105,
        name: "Dr. K's weekly support group",
        about: 'Support group for new moms' ,
        type: 'Online',
        private: true,
        city: 'Jupiter',
        state: 'FL',
      },
      {
        id: 105,
        organizerId: 106,
        name: "Woodworker's Guild",
        about: 'Come talk shop and work on projects with woodworkers of all skill levels' ,
        type: 'In Person',
        private: false,
        city: 'Steamboat Springs',
        state: 'CO',
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
