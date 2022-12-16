import React from "react";

import { deleteList } from "@/lib/app/workspace/lists";
import { useSWRConfig } from "swr";

function ListOptions({ list, setIsEditMode, setIsOptions }) {
    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsOptions(false);
        await deleteList(list._id);
        mutate("/api/workspace/lists");
    }
    return (
        <div
            id="dropdownNavbar"
            className="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-md w-36"
        >
            <ul className="py-1 text-sm text-gray-700 w-full">
                <li>
                    <button
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                        onClick={() => {
                            setIsEditMode((prevIsEditMode) => !prevIsEditMode);
                            setIsOptions(false);
                        }}
                    >
                        Edit
                    </button>
                </li>
                <li>
                    <button
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </li>
            </ul>
            <div className="py-1">
                <button className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 ">
                    Set Color
                </button>
            </div>
        </div>
    );
}

export default ListOptions;
