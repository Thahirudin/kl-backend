'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favorit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Favorit.belongsTo(models.User, { foreignKey: 'userId' });
      Favorit.belongsTo(models.Buku, { foreignKey: 'bukuId' });
    }
  }
  Favorit.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userId harus diisi'
        },
        notEmpty: {
          msg: 'userId tidak boleh kosong'
        }
      }
    },
    bukuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'bukuId harus diisi'
        },
        notEmpty: {
          msg: 'bukuId tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Favorit',
  });
  return Favorit;
};
