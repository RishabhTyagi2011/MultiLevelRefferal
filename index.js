const express = require("express");
const { sequelize } = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const earningRoutes = require("./routes/EarningRoutes");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/earnings", earningRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

http.listen(3000, async () => {
  console.log("Server running on http://localhost:3000");

  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync();
    console.log("Database synced");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
});
