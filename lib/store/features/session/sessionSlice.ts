import { Tasks } from "@/models/Task";
import { TTask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SessionUser = {
  id: string;
  email: string;
  username: string;
};

export interface ISessionState {
  user: SessionUser | null;
  tasks: TTask[];
}

export const initialState: ISessionState = {
  user: null,
  tasks: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SessionUser>) {
      state.user = action.payload;
      return state;
    },
    disconnect() {
      return initialState;
    },
    setTasks(state: ISessionState, action: PayloadAction<TTask[]>) {
      state.tasks = action.payload;
      return state;
    },
    addTask(state: ISessionState, action: PayloadAction<TTask>) {
      state.tasks.push(action.payload);
      return state;
    },
    updateTask(state: ISessionState, action: PayloadAction<TTask>) {
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload._id) {
          return action.payload;
        }
        return task;
      });
      return state;
    },
    deleteTask(state: ISessionState, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      return state;
    },
  },

  selectors: {
    selectUser: (state) => state.user,
    selectTasks: (state) => state.tasks,
    selectTaskById: (state, id: string) =>
      state.tasks.find((task) => task._id === id),
    selectUserId: (state) => state.user!.id,
  },
});

export const {
  setUser,
  disconnect,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
} = sessionSlice.actions;
export const { selectUser, selectUserId, selectTasks, selectTaskById } =
  sessionSlice.selectors;
export default sessionSlice;
