import { Todo } from "@/app";
import axios from "axios";
import { create } from "zustand";

type TodoListStore = {
  list: Todo[];
  setList: (list: Todo[]) => void;
  addTodo: (title: string) => void;
  updateTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const API_URL = "http://localhost:4000";

export const useTodoList = create<TodoListStore>((set) => ({
  list: [],
  setList: (list) => {
    set(() => ({ list }));
  },
  addTodo: async (title) => {
    try {
      const res = await axios.post(`${API_URL}/todos`, { title });
      const newTodo: Todo = {
        id: res.data.id,
        title: res.data.title,
        isDone: res.data.is_done,
      };
      set((state) => ({ list: [...state.list, newTodo] }));
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  },
  updateTodo: async (id) => {
    try {
      const res = await axios.put(`${API_URL}/todos/${id}`);
      const updated = {
        id: res.data.id,
        title: res.data.title,
        isDone: res.data.is_done,
      };
      set((state) => ({
        list: state.list.map((t) => (t.id === id ? updated : t)),
      }));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  },
  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      set((state) => ({ list: state.list.filter((t) => t.id !== id) }));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  },
}));
