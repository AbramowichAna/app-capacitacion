import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import TaskList from "./TaskList.tsx";

import {Task} from "./TaskFrom.tsx";
import TaskForm from "./TaskFrom.tsx";
import axios from "axios";
import {setTasks} from "../app/features/tasks/taskSlice.tsx";
import {Button} from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const taskState = useSelector((state: RootState) => state.task);
    console.log(taskState);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleOpen = (task?: Task) => {
        setEditingTask(task || null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/tasks');
                if (response.status === 200) {
                    dispatch(setTasks(response.data));
                }
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [dispatch]);

    return (
        <div>
            <header className="flex justify-between items-center py-10 px-10">
                <h1 className="text-3xl font-bold">
                    To do List
                </h1>
                <Button onClick={() => handleOpen()}>Create task</Button>
            </header>
            <br/>
            <br/>
            <div className="px-10">
                <TaskList onEdit={handleOpen}/>
            </div>

            {open && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                         aria-hidden="true"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div
                            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-xl font-semibold leading-6 text-gray-900"
                                                id="modal-title">
                                                {editingTask ? 'Edit Task' : 'Create Task'}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white pb-20 sm:flex sm:flex-col sm:px-6">
                                    <TaskForm task={editingTask} onClose={handleClose}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
