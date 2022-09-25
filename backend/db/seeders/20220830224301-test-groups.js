'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: "fsociety",
        about: 'The group is highly secretive, electing to meet' +
            'and communicate in person, rather than through digital ' +
            'means which may be traceable. fsociety is responsible ' +
            'for the massive distributed denial of service (DDoS) ' +
            'attack that took E-Corp offline',
        type: 'In person',
        private: true,
        city: 'Coney Island',
        state: 'NY',
      },
      {
        organizerId: 2,
        name: "Anonymous",
        about: 'Anonymous is a decentralized international activist and ' +
            'hacktivist collective and movement primarily known for its various ' +
            'cyberattacks against several governments, ' +
            'and government agencies, corporations and the Church of Scientology.',
        type: 'Online',
        private: false,
        city: 'Anonymous',
        state: 'CA',
      },
      {
        organizerId: 3,
        name: "Warez Scene",
        about: 'The Warez scene, often referred to as The Scene, is a worldwide,' +
            'underground, organized network of pirate groups specializing in ' +
            'obtaining and illegally releasing digital media for free before ' +
            'their official sale date',
        type: 'Online',
        private: true,
        city: 'Austin',
        state: 'TX',
      },
      {
        organizerId: 4,
        name: "Chaos Computer Club",
        about: 'Chaos Computer Club, otherwise knows as CCC is a rare \'hacktivist\' ' +
            'group that operates on some type of moral code. ' +
            'CCC is known for having consulted with legal teams ' +
            'at many times before hacks, and lives in the legal gray area',
        type: 'Online',
        private: true,
        city: 'Bourne',
        state: 'MA',
      },
      {
        organizerId: 5,
        name: "The Operators",
        about: 'The operator is a crewmember on a hovercraft that assists his fellow ' +
            'redpill crewmembers with information on events, resources, and other ' +
            'protection while they are jacked into the Matrix.',
        type: 'In person',
        private: false,
        city: 'Underground',
        state: 'ND',
      },
      {
        organizerId: 6,
        name: "WikiLeaks",
        about: 'WikiLeaks is an international non-profit organisation that publishes ' +
            'news leaks and classified media provided by anonymous sources.',
        type: 'Online',
        private: false,
        city: 'Philadelphia',
        state: 'PA',
      },
      {
        organizerId: 7,
        name: "Short-Circuit Engineering Squad",
        about: 'The Short-Circuit Engineers are a group of computer, software, and electrical ' +
            'engineers dedicated to the science and art of Artificial intelligence. ' +
            'The group is led by Johnny-5, a sentient AI robot born of a ' +
            'secret military experiment',
        type: 'Online',
        private: false,
        city: 'Philadelphia',
        state: 'PA',
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
