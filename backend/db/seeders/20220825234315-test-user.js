'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'mike@mikedf.com',
        username: 'warriorAngel',
        firstName: 'Mike',
        lastName: 'Favo',
        hashedPassword: bcrypt.hashSync('password1'),
      },
      {
        id: 2,
        email: 'antonio@freewowgolds.com',
        username: 'arrowdei',
        firstName: 'Antonio',
        lastName: 'Cola',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        email: 'lorenzo@rocketGame.com',
        username: 'bubishka',
        firstName: 'Lorenzo',
        lastName: 'Carrera',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id: 4,
        email: 'angel@bornepd.gov',
        username: 'angelMcMangel',
        firstName: 'Angel',
        lastName: 'Cola',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        id: 5,
        email: 'beanmcmean@curd.com',
        username: 'beanMcMean',
        firstName: 'Bean',
        lastName: 'Curd',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        id: 6,
        email: 'john@carreradesign.com',
        username: 'badreg',
        firstName: 'John',
        lastName: 'Carrera',
        hashedPassword: bcrypt.hashSync('password6'),
      },
      {
        id: 7,
        email: 'drkatrinapsyd@lotusmhg.com',
        username: 'drkatrinac',
        firstName: 'Katrina',
        lastName: 'Carrera',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        id: 8,
        email: 'cheno@moarwetfoodz.com',
        username: 'chenchen',
        firstName: 'Cheno',
        lastName: 'Carrera',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        id: 9,
        email: 'lunabean@blackcats.org',
        username: 'chicharron',
        firstName: 'Luna',
        lastName: 'Carrera',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        id: 10,
        email: 'ivykbaby@kfinancial.com',
        username: 'ivybaby',
        firstName: 'Ivy',
        lastName: 'Kess',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: [
        'warriorAngel',
        'arrowdei',
        'bubishka',
        'angelMcMangel',
        'beanMcMean',
        'badreg',
        'drkatrinac',
        'chenchen',
        'chicharron',
        'ivybaby'
      ]}
    }, {});
  }
};
