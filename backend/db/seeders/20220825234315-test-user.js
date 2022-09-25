'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'samsepiol@Bleetz.com',
        username: 'samsepiol1',
        firstName: 'Sam',
        lastName: 'Sepiol',
        hashedPassword: bcrypt.hashSync('password1'),
      },
      {
        email: 'john@anonymous.com',
        username: 'anon01',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'jack@scene.net',
        username: 'jackSparrow',
        firstName: 'Jack',
        lastName: 'Sparrow',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'wauholland@ccc.net',
        username: 'chaosWau',
        firstName: 'Wau',
        lastName: 'Holland',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'tank@nebuchadnezzar.crew',
        username: 'tankop1',
        firstName: 'Tank',
        lastName: 'Chong',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'julian@wikileaks.com',
        username: 'jassange',
        firstName: 'Julian',
        lastName: 'Assange',
        hashedPassword: bcrypt.hashSync('password6'),
      },
      {
        email: 'number5@sc.net',
        username: 'johnny5',
        firstName: 'Johnny',
        lastName: 'Five',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        email: 'john.smith@gmail.com',
        username: 'johnnysmith',
        firstName: 'John',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('secret password'),
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
