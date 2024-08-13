import { configureStore } from '@reduxjs/toolkit'
import {type} from "@testing-library/user-event/dist/type";
import taskReducer from "./features/tasks/taskSlice.tsx"


export const store = configureStore({
    reducer: {
        task: taskReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch