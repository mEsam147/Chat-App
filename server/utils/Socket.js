import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("User connected");
  const userId = socket.handshake.query.userId;
  if (!userId) {
    socket.disconnect();
    return;
  }
  userSocketMap.set(userId, socket.id);
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    console.log("User disconnected");
    userSocketMap.delete(userId);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

export function getMessageSocket(userId) {
  return userSocketMap[userId];
}

export { app, io, server };
