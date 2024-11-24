import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
// import { getMessageSocket, io } from "../utils/Socket.js";

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user;
    const users = await User.find({ _id: { $ne: userId } });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

export const getMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user;
    const messages = await Message.find({
      $or: [
        { senderId: userId, recipientId: id },
        { senderId: id, recipientId: userId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }
    const message = new Message({
      senderId: userId,
      recipientId: id,
      text,
      image: imageUrl,
    });
    await message.save();
    // const getOnlineUsersFormMessages = getMessageSocket(id);
    // if (getOnlineUsersFormMessages) {
    //   io.to(getOnlineUsers).emit("sendMessage", message);
    // }

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
