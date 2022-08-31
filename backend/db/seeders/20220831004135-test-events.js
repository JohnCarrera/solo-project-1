'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        venueId: 'mike@mikedf.com',
        groupId: 'warriorAngel',
        name: 'Mike',
        description: 'Favo',
        type: bcrypt.hashSync('password1'),
        capacity
      },
      {
        id: 2,
        venueId: 'antonio@freewowgolds.com',
        groupId: 'arrowdei',
        name: 'Antonio',
        description: 'Cola',
        type: bcrypt.hashSync('password2')
        capacity
      },
      {
        id: 3,
        venueId: 'lorenzo@rocketgame.com',
        groupId: 'bubishka',
        name: 'Lorenzo',
        description: 'Carrera',
        type: bcrypt.hashSync('password3')
        capacity
      },
      {
        id: 4,
        venueId: 'angel@bornepd.gov',
        groupId: 'angelMcMangel',
        name: 'Angel',
        description: 'Cola',
        type: bcrypt.hashSync('password4')
        capacity
      },
      {
        id: 5,
        venueId: 'beanmcmean@curd.com',
        groupId: 'beanMcMean',
        name: 'Bean',
        description: 'Curd',
        type: bcrypt.hashSync('password5')
        capacity
      },
      {
        id: 6,
        venueId: 'john@carreradesign.com',
        groupId: 'badreg',
        name: 'John',
        description: 'Carrera',
        type: bcrypt.hashSync('password6'),
        capacity
      },
      {
        id: 7,
        venueId: 'drkatrinapsyd@lotusmhg.com',
        groupId: 'drkatrinac',
        name: 'Katrina',
        description: 'Carrera',
        type: bcrypt.hashSync('password7')
        capacity
      },
      {
        id: 8,
        venueId: 'cheno@moarwetfoodz.com',
        groupId: 'chenchen',
        name: 'Cheno',
        description: 'Carrera',
        type: bcrypt.hashSync('password8')
        capacity
      },
      {
        id: 9,
        venueId: 'lunabean@blackcats.org',
        groupId: 'chicharron',
        name: 'Luna',
        description: 'Carrera',
        type: bcrypt.hashSync('password9')
        capacity
      },
      {
        id: 10,
        venueId: 'ivykbaby@kfinancial.com',
        groupId: 'ivybaby',
        name: 'Ivy',
        description: 'Kess',
        type: bcrypt.hashSync('password10')
        capacity
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
