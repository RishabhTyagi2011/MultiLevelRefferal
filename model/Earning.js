const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Earnings = sequelize.define(
  "earnings",
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    referral_level: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    purchase_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { timestamps: true }
);

module.exports = Earnings;
