// backend/models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Certifique-se de que o caminho está correto

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Valida que o campo é um e-mail válido
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true // Adiciona os campos createdAt e updatedAt
});

module.exports = User;
