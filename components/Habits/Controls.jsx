import React, { useContext } from "react";
import { HabitContext } from "./index";

import { useSWRConfig } from "swr";

function Controls({
    _id,
    setEditMode,
    setControls,
    isCompleted,
    habit,
    setIsCardLoading,
}) {
    const { setHabits } = useContext(HabitContext) ?? {};

    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        setHabits((prev) => prev.filter((r) => r._id != _id));
        setIsCardLoading(false);
        await fetch(`/api/habits/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                mutate("/api/habits");
            });
    }

    function handleEdit() {
        setControls(false);
        setEditMode(true);
    }

    async function handleDone() {
        setIsCardLoading(true);
        await fetch(`/api/habits/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                updated_at: habit.updated_at,
                completed_at: isCompleted ? null : new Date().toISOString(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                setIsCardLoading(false);
                setControls(false);
                mutate("/api/habits");
            });
    }

    return (
        <div className="flex justify-center rounded-md" role="group">
            <button
                type="button"
                className="py-1 px-2 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
                onClick={handleDone}
            >
                <img src="./assets/icons/done.svg" alt="" />
            </button>
            <button
                type="button"
                className="py-1 px-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
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
