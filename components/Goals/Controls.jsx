import React, { useContext } from "react";
import { GoalContext } from "./index";

import { useSWRConfig } from "swr";
import { deleteGoal } from "@/lib/app/goals";

function Controls({ _id, setEditMode, setControls, setIsCardLoading }) {
    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        await deleteGoal(todo._id);
        setIsCardLoading(false);
        mutate("/api/goals");
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
