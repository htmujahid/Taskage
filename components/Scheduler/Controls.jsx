import React, { useState } from "react";
import { useSWRConfig } from "swr";

function Controls({
    task,
    setControls,
    isCompleted,
    setEditMode,
    setIsRunning,
    isRunning,
    setIsCardLoading,
}) {
    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        await fetch(`/api/scheduler/${task._id}`, {
            method: "DELETE",
        });
        mutate("/api/scheduler");
        setIsCardLoading(false);
    }

    async function handlePlay() {
        let updatedInterval = task.intervals;
        if (isRunning) {
            updatedInterval[updatedInterval.length - 1].completed_at =
                new Date().toISOString();
        } else {
            const newInterval = {
                started_at: new Date().toISOString(),
                completed_at: null,
            };
            updatedInterval.push(newInterval);
        }
        setIsCardLoading(true);
        await fetch(`/api/scheduler/${task._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intervals: updatedInterval,
                completed_at: null,
            }),
        });
        setIsCardLoading(false);
        setIsRunning(!isRunning);
        setControls(false);
        mutate("/api/scheduler");
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
            {!isCompleted && (
                <button
                    type="button"
                    className="py-1 px-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
                    onClick={handlePlay}
                >
                    <img
                        src={`./assets/icons/${
                            isRunning ? "pause" : "play"
                        }.svg`}
                        alt=""
                    />
                </button>
            )}
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
