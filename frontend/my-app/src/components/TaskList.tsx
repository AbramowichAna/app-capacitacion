import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {useDispatch} from "react-redux";
import {deleteTask, editTask} from "../app/features/tasks/taskSlice.tsx";
import axios from "axios";

interface Task {
    id: string;
    title: string;
    description: string;
}

interface TaskListProps {
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {

    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.task.tasks);
    console.log(tasks)

    const handleDelete = async (id: string): Promise<void> => {
        try {
            const response = await axios.delete(`http://localhost:8000/tasks/` + id);

            if (response.status === 200) {
                dispatch(deleteTask(id));
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tasks.map(task => (
                <div key={task.id} className="relative flex flex-col justify-between bg-white rounded-lg shadow-md p-4">
                    <div className="pb-20">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                            <span
                                className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Pending</span>
                            <span
                                className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">In progress</span>
                            <span
                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Done</span>
                        </div>
                        <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gray-50 flex justify-end p-4 space-x-4">
                        <button
                            onClick={() => handleDelete(task.id)}
                            className="px-3 py-0.5 bg-red-400 text-white rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => onEdit(task)}
                            className="px-3 py-0.5 bg-blue-400 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
