'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bukus', [
      {
        judul: 'Belajar Sequelize',
        kategori: 'Pendidikan',
        ringkasan: 'Buku ini membahas tentang cara menggunakan Sequelize ORM untuk Node.js.',
        penulis: 'John Doe',
        imageUrl: 'http://example.com/image1.jpg',
        readUrl: 'http://example.com/read1.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        judul: 'Pemrograman JavaScript',
        kategori: 'Pendidikan',
        ringkasan: 'Panduan lengkap tentang pemrograman JavaScript modern.',
        penulis: 'Jane Smith',
        imageUrl: 'http://example.com/image2.jpg',
        readUrl: 'http://example.com/read2.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        judul: 'Kisah Nabi',
        kategori: 'Religi',
        ringkasan: 'Kisah-kisah Nabi yang dapat memberikan pelajaran hidup.',
        penulis: 'Ahmad Al Habsyi',
        imageUrl: 'http://example.com/image3.jpg',
        readUrl: 'http://example.com/read3.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        judul: 'Cerita Rakyat Nusantara',
        kategori: 'Dongeng',
        ringkasan: 'Kumpulan cerita rakyat dari berbagai daerah di Indonesia.',
        penulis: 'Rina Wijaya',
        imageUrl: 'http://example.com/image4.jpg',
        readUrl: 'http://example.com/read4.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        judul: 'Motivasi Hidup',
        kategori: 'Other',
        ringkasan: 'Buku yang memberikan motivasi dan inspirasi dalam menjalani hidup.',
        penulis: 'Mario Teguh',
        imageUrl: 'http://example.com/image5.jpg',
        readUrl: 'http://example.com/read5.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
