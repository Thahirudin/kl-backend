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
          msg: 'Judul is required'
        }
      }
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Kategori is required'
        }
      }
    },
    ringkasan: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Ringkasan is required'
        }
      }
    },
    penulis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Penulis is required'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Image URL is required'
        }
      }
    },
    readUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Read URL is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Buku',
  });
  return Buku;
};
