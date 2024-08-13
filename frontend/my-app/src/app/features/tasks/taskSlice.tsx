import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Task {
    id: string;
    title: string;
    description: string;
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action:PayloadAction<string>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload);
            if (index !== -1) {
                state.tasks.splice(index, 1);
            }
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const {id, title, description} = action.payload;
            const task = state.tasks.find(task => task.id === id)
            if (task) {
                task.title = title;
                task.description = description;
            }
        }, setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
    },
})

export const { addTask, deleteTask , editTask, setTasks} = taskSlice.actions

export default taskSlice.reducer