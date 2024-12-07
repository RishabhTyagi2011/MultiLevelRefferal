const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "users",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    referral_code: { type: DataTypes.STRING, unique: true, allowNull: false },
    referred_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  { timestamps: true }
);

module.exports = User;
