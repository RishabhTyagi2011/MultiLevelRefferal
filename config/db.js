const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost", // Your database host
  username: "myuser", // Your database username
  password: "mysecretpassword", // Your database password
  database: "mydb", // Your database name
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
