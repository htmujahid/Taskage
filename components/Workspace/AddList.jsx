import { createList } from "@/lib/app/workspace/lists";
import React, { useState } from "react";
import { useSWRConfig } from "swr";
function AddList() {
    const [title, setTitle] = useState("");
    const [isAddMode, setIsAddMode] = useState(false);
    const { mutate } = useSWRConfig();

    async function handleSubmit() {
        setIsAddMode(false);
        const data = {
            title,
        };
        await createList(data);
        setTitle("");
        mutate("/api/workspace/lists");
    }

    return (
        <div className="bg-white w-72 h-fit rounded-lg shadow shrink-0 ">
            <div className="flex justify-between items-center p-2">
                {isAddMode ? (
                    <input
                        className="text-lg font-semibold w-full"
                        value={title}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleSubmit}
                    ></input>
                ) : (
                    <button
                        className="text-lg text-gray-500 font-semibold w-full text-left"
                        onClick={() => setIsAddMode(true)}
                    >
                        Add List
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddList;
