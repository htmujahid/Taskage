import React from "react";
import { useSWRConfig } from "swr";

function Controls({ _id, setEditMode, setControls, setIsCardLoading }) {
    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        await fetch(`/api/todos/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                setIsCardLoading(false);
                mutate("/api/todos");
            });
    }

    function handleEdit() {
        setControls(false);
        setEditMode(true);
    }

    return (
        <div className="flex justify-center rounded-md" role="group">
            <button
                type="button"
                className="py-1 px-2 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
                onClick={handleEdit}
            >
                <img src="./assets/icons/edit.svg" alt="" />
            </button>
            <button
                type="button"
                className="py-1 px-2 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
                onClick={handleDelete}
            >
                <img src="./assets/icons/delete.svg" alt="" />
            </button>
        </div>
    );
}

export default Controls;
