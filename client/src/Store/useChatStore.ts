import { create } from "zustand";
import { FormData } from "../types/FormData";
import axios from "../utils/Axios";
import { useUserStore } from "./UseUserStore";

type message = {
  _id?: string;
  senderId?: string;
  recipientId?: string;
  text?: string;
  image?: string;
  createdAt?: string;
};
interface State {
  messages: message[];
  user: FormData[] | null;
  loading: boolean;
  chatLoading: boolean;
  userConversation: FormData | null;
  setUserConversation: (userConversation: null | FormData) => void;
  getChatUsers: () => Promise<void>;
  getMessages: () => void;
  sendMessage: (data: message) => void;
  socketToSendMessage: () => void;
  socketOffInConversation: () => void;
}
export const useChatStore = create<State>((set, get) => ({
  messages: [],
  user: null,
  loading: false,
  chatLoading: false,
  userConversation: null,
  setUserConversation: (userConversation: FormData | null) => {
    set({ userConversation });
  },
  getChatUsers: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/message/users");

      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false, user: null });
      console.log(error);
    }
  },
  getMessages: async () => {
    const { userConversation } = get();
    if (!userConversation?._id) return;

    set({ chatLoading: true });
    try {
      const res = await axios.get(`/message/${userConversation?._id}`);

      set({ messages: res.data, chatLoading: false });
      get().socketToSendMessage();
    } catch (error) {
      set({ chatLoading: false });
      console.log(error);
    }
  },
  sendMessage: async (data: message) => {
    // set({ chatLoading: true });
    const { userConversation, messages } = get();
    // const socket = useU().getState()?.socket;
    try {
      const res = await axios.post(`/message/${userConversation?._id}`, data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
      // set({ chatLoading: false });
    }
  },

  socketToSendMessage: () => {
    const { userConversation } = get();
    const socket = useUserStore.getState()?.socket;
    if (!socket || !userConversation) return;
    try {
      if (!userConversation) return;
      socket.on("sendMessage", (message) => {
        const sameUser = message.senderId === userConversation;
        if (!sameUser) return;
        set({ messages: [...get().messages, message] });
      });
    } catch (error) {
      console.log(error);
    }
  },
  socketOffInConversation: () => {
    const socket = useUserStore.getState()?.socket;
    if (!socket) return;
    try {
      socket.off("sendMessage");
    } catch (error) {
      console.log(error);
    }
  },
}));
