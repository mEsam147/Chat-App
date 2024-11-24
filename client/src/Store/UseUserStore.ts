import { create } from "zustand";
import { UserData } from "../types/FormData";
import axios from "../utils/Axios";
import { io, Socket } from "socket.io-client";

interface State {
  user: null | UserData;
  loading: boolean;
  isUpdate: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  usersOnline: string[];
  socket: null | Socket;
  register: (UserData: UserData) => void;
  login: (UserData: UserData) => void;
  logout: () => void;
  getMe: () => void;
  updateProfile: (UserData: UserData) => void;
  connectSocket: () => void;
  disConnectSocket: () => void;
}

export const useUserStore = create<State>((set, get) => ({
  user: null,
  loading: false,
  loginLoading: false,
  registerLoading: false,
  isUpdate: false,
  usersOnline: [],
  socket: null,

  register: async (UserData: UserData) => {
    try {
      set({ registerLoading: true });
      const res = await axios.post("/user/register", UserData);
      set({ user: res.data.user, registerLoading: false });
      get().connectSocket();
    } catch (error) {
      console.error(error);
      set({ registerLoading: false });
      throw error;
    }
  },
  login: async (UserData: UserData) => {
    try {
      set({ loginLoading: true });
      const res = await axios.post("/user/login", UserData);
      set({ user: res.data.user, loginLoading: false });
      get().connectSocket();
    } catch (error) {
      console.error(error);
      set({ loginLoading: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await axios.post("/user/logout");
      set({ user: null });
      get().disConnectSocket();
      return response;
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  getMe: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/user/me");
      set({ user: res.data.user, loading: false });
      get().connectSocket();
    } catch (error) {
      set({ loading: false, user: null });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (UserData: UserData) => {
    try {
      set({ isUpdate: true });
      const res = await axios.put("/user/updateProfile", UserData);
      console.log(res);
      // set({ user: res.data.user, isUpdate: false });
      set((state) => ({
        user: {
          ...state.user,
          profileImage: res.data.profileImage,
          fullname: res.data.fullname,
        },
        isUpdate: false,
      }));
    } catch (error) {
      console.error(error);
      set({ isUpdate: false });
      throw error;
    }
  },

  connectSocket: async () => {
    const { user } = get();
    if (!user || !user._id) return;
    const socketUrl = "http://localhost:8000";
    const socketOptions = {
      query: {
        userId: user?._id,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    };
    const socket = io(socketUrl, socketOptions);
    socket.on("connect", () => {
      set({ socket });
      socket.on("getOnlineUsers", (users: string[]) => {
        set({ usersOnline: users });
      });
    });
    socket.on("disconnect", () => {
      set({ socket: null });
    });
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  },
  disConnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.off("getOnlineUsers"); 

      socket.disconnect();
      set({ socket: null });
    }
  },
}));
