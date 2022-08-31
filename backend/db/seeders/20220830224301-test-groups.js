'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        id: 1,
        organizerId: 1,
        name: "Mike's Mangos",
        about: 'Just a group of dudes picking fruit.',
        type: 'In Person',
        private: false,
        city: 'Port St. Lucie',
        state: 'FL',
      },
      {
        id: 2,
        organizerId: 4,
        name: "Angel's Angels",
        about: 'Officer Angel\'s anti-crime squad.' ,
        type: 'Online',
        private: false,
        city: 'Bourne',
        state: 'MA',
      },
      {
        id: 3,
        organizerId: 3,
        name: "Bubanje Crew",
        about: 'Playdates for babies 0-2 years.' ,
        type: 'In Person',
        private: true,
        city: 'Stuart',
        state: 'FL',
      },
      {
        id: 4,
        organizerId: 5,
        name: "Dr. K's weekly support group",
        about: 'Support group for new moms' ,
        type: 'Online',
        private: true,
        city: 'Jupiter',
        state: 'FL',
      },
      {
        id: 5,
        organizerId: 3,
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
