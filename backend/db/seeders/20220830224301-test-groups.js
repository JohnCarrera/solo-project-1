'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        id: 1,
        organizerId: 1,
        name: "Mike's Mangos",
        about: 'Just a group of dudes picking fruit.',
        type: 'social',
        private: false,
        city: 'Port St. Lucie',
        state: 'FL',
      },
      {
        id: 2,
        organizerId: 4,
        name: "Angel's Angels",
        about: 'Officer Angel\'s anti-crime squad.' ,
        type: 'social',
        private: false,
        city: 'Bourne',
        state: 'MA',
      },
      {
        id: 3,
        organizerId: 3,
        name: "Bubanje Crew",
        about: 'Playdates for babies 0-2 years.' ,
        type: 'social',
        private: true,
        city: 'Stuart',
        state: 'FL',
      },
      {
        id: 4,
        organizerId: 5,
        name: "Dr. K's weekly support group",
        about: 'Support group for new moms' ,
        type: 'social',
        private: true,
        city: 'Jupiter',
        state: 'FL',
      },
      {
        id: 5,
        organizerId: 3,
        name: "Woodworker's Guild",
        about: 'Come talk shop and work on projects with woodworkers of all skill levels' ,
        type: 'social',
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
