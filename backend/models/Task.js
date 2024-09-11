const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User'); // Importa o modelo User

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Nome do modelo User
      key: 'id',   // Chave primária do modelo User
    },
  }
}, {
  timestamps: true, // Inclui os campos createdAt e updatedAt
});

// Define a relação entre Task e User
Task.belongsTo(User, {
  foreignKey: {
    name: 'userId', // Nome da coluna de referência
    allowNull: false // Define que o usuário é obrigatório para cada tarefa
  }
});

module.exports = Task;
