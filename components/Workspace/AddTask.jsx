import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

import { createTask } from "@/lib/app/workspace/tasks";

function Form({ listId }) {
    const [title, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const [isFormOpen, setIsFormOpen] = useState(false);

    const { mutate } = useSWRConfig();

    useEffect(() => {
        console.log(date);
    }, [date]);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsFormOpen(false);
        if (title === "" || date === "") return;

        console.log(title)
        const data = {
            title,
            description,
            date,
            list_id: listId,
        };

        await createTask(data);
        console.log(data)
        setTask("");
        setDescription("");
        setDate("");
        mutate("/api/workspace/tasks");
    }

    return (
        <div>
            {!isFormOpen ? (
                <div className="p-2 text-sm text-blue-600">
                    <button
                        onClick={() => {
                            setIsFormOpen(true);
                        }}
                    >
                        <svg
                            className="w-4 h-4 inline mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Add Task
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="py-2">
                    <input
                        type="text"
                        placeholder="Task"
                        className="mx-2 focus:outline-none"
                        value={title}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="mx-2 focus:outline-none text-xs"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex items-center justify-between mx-2 ">
                        <input
                            type="date"
                            placeholder="date"
                            className={`focus:outline-none text-xs text-gray-400 w-[100px]`}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        {/* <div
                            type="button"
                            onClick={() => {
                                setIsRepeat(!isRepeat);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                                className={`${isRepeat && "text-blue-500"}`}
                                fill="currentColor"
                            >
                                <path d="M4.562 18.167q-.708 0-1.218-.511-.511-.51-.511-1.218V5.562q0-.729.511-1.229.51-.5 1.218-.5H6v-2h1.625v2h4.75v-2H14v2h1.438q.708 0 1.218.5.511.5.511 1.229v4.959h-1.729V9H4.562v7.438h5.73v1.729ZM16 20.208q-1.542 0-2.688-.989-1.145-.99-1.354-2.469h1.313q.25 1.062.989 1.646.74.583 1.74.583 1.188 0 2.031-.844.844-.843.844-2.031 0-1.187-.844-2.021-.843-.833-2.031-.833-.604 0-1.135.24-.532.239-.948.656h1.166v1.229h-3.291v-3.292h1.229v1.25q.583-.625 1.344-.968.76-.344 1.635-.344 1.708 0 2.906 1.198 1.198 1.198 1.198 2.906 0 1.687-1.198 2.885-1.198 1.198-2.906 1.198ZM4.562 7.5h10.876V5.562H4.562Zm0 0V5.562 7.5Z" />
                            </svg>
                        </div> */}
                        <div className="flex gap-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFormOpen(false);
                                }}
                                className="text-sm px-2 bg-gray-600 text-white border rounded-md border-gray-600 hover:bg-white hover:text-gray-600 duration-300"
                            >
                                Cancel
                            </button>
                            <input
                                type="submit"
                                value="Add"
                                className="text-sm px-2 bg-blue-600 text-white border rounded-md border-blue-600 hover:bg-white hover:text-blue-600 duration-300"
                            />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Form;
