import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, trim: true },
    image: { type: String, trim: true },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
