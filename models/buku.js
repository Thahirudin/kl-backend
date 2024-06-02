'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Buku.belongsToMany(models.User, { through: 'Favorit', foreignKey: 'bukuId', otherKey: 'userId' });
    }
  }
  Buku.init({
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Judul Wajib Diisi'
        }
      }
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Kategori Wajib Diisi'
        }
      }
    },
    ringkasan: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Ringkasan Wajib Diisi'
        }
      }
    },
    penulis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Penulis Wajib Diisi'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image Wajib Diisi'
        }
      }
    },
    readUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Read URL Wajib Diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Buku',
  });
  return Buku;
};
