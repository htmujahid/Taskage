import React, { useContext, useState } from "react";
import { SchedulerContext } from "./index";

import { useSWRConfig } from "swr";
import { deleteScheduler } from "@/lib/app/scheduler";

function Controls({
    task,
    setControls,
    isCompleted,
    setEditMode,
    setIsRunning,
    isRunning,
    setIsCardLoading,
}) {
    const { setTasks } = useContext(SchedulerContext) ?? {};

    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        await deleteScheduler(task._id);
        setIsCardLoading(false);
        mutate("/api/scheduler");
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
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                setIsCardLoading(false);
                setIsRunning(!isRunning);
                setControls(false);
                mutate("/api/scheduler");
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
                <img src="/assets/icons/edit.svg" alt="" />
            </button>
            {!isCompleted && (
                <button
                    type="button"
                    className="py-1 px-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none"
                    onClick={handlePlay}
                >
                    <img
                        src={`/assets/icons/${
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
                <img src="/assets/icons/delete.svg" alt="" />
            </button>
        </div>
    );
}

export default Controls;
