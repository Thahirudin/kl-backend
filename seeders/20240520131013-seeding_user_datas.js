'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        nama: 'Thahirudin',
        profile: 'Admin profile',
        ttl: new Date('1990-01-01'),
        jk: 'L',
        email: 'tohiruzain098@gmail.com',
        role: 'admin',
        password: hashPassword('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  }
};
