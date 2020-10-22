const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/mysql.database');
const Task = require('../tasks/task.model');

const USER_MODEL_NAME = 'user';

class User extends Model {}

const userSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

User.init(userSchema, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: USER_MODEL_NAME // We need to choose the model name
});

User.Tasks = User.hasMany(Task.model, {
  foreignKey: 'userId',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  as: 'tasks'
});

module.exports = {
  model: User,
  schema: userSchema
};
