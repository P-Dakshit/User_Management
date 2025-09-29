const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User_Data = sequelize.define('User_Data', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true }, primaryKey: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
    password: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'users',       // matches your existing table
    timestamps: true,         // adds created_at, updated_at
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User_Data;