const socketIO = require("socket.io");
const userModels = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected with socket id:", socket.id);
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`user ${userId} joined as ${userType}`);

      if (userType === "user") {
        await userModels.findByIdAndUpdate(userId, { socketId: socket.id });

        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location" });
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log("Sending message to socketId:", socketId, messageObject);

  if (io) {
      io.to(socketId).emit(messageObject.event, messageObject.data);
    console.error("Socket.io not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
