import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "This is task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "This is task 2",
    completed: false,
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description, completed } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.completed = completed;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
