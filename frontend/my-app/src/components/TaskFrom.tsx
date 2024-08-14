import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {addTask, editTask} from "../app/features/tasks/taskSlice.tsx";
import axios from "axios";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
}


interface TaskFormProps {
    task?: Task;
    onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({task, onClose }) => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState<Omit<Task, 'id'>>({ title: '', description: '', status:'Pending'});
    const isEdit = Boolean(task);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
        if (typeof e === 'string') {
            setFormState({
                ...formState,
                status: e,
            });
        } else {
            const { name, value } = e.target;
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    };

    const handleStatusChange = (status: string) => {
        setFormState({
            ...formState,
            status: status,
        });
    };


    useEffect(() => {
        if (task) {
            setFormState(task);
        }
    }, [task]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTask = { ...formState };

        try {
            if (isEdit && task) {
                const response = await axios.patch(`http://localhost:8000/tasks/${task.id}`, updatedTask);
                if (response.status === 200) {
                    dispatch(editTask(response.data));
                }
            } else {

                const response = await axios.post('http://localhost:8000/tasks', {
                    ...updatedTask
                });
                if (response.status === 201) {
                    dispatch(addTask(response.data));
                }
            }
        } catch (error) {
            console.error('Failed to save the task:', error);
        }

        onClose();
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 p-4">
            <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Title
                        </label>
                        <div className="mt-2 flex justify-between" >
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={formState.title}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <Menu as="div" className="relative inline-block text-left pl-3">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        {formState.status}
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1 flex flex-col">
                                        <MenuItem type="button" as="button"
                                                  onClick={() => handleChange('Pending')}
                                                  className="block w-full px-2 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                            <span
                                                className="block px-4 py-2 text-sm text-gray-700">Pending</span>
                                        </MenuItem>
                                        <MenuItem type="button" as="button"
                                                  onClick={() => handleChange('In progress')}
                                                  className="block w-full px-2 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                            <span
                                                className="block px-4 py-2 text-sm text-gray-700">In progress</span>
                                        </MenuItem>
                                        <MenuItem type="button" as="button"
                                                  onClick={() => handleChange('Completed')}
                                                  className="block w-full px-2 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                            <span
                                                className="block px-4 py-2 text-sm text-gray-700">Completed</span>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>

                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                placeholder="Description"
                                value={formState.description}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-50 flex justify-end p-4 pr-10 space-x-4">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isEdit ? 'Save' : 'Create'}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
            </div>
        </form>

    );
}

export default TaskForm;
