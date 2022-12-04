import React, { useState, useEffect } from "react";
import Card from "./Card";
import Form from "./Form";
import useSWR from "swr";
import Skelton from "./Skelton";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function index() {
    const { data, error } = useSWR("/api/habits", fetcher);
    const [habits, setHabits] = useState(data);

    const [accomplished, setAccomplished] = useState([]);
    const [unaccomplished, setUnaccomplished] = useState([]);

    useEffect(() => {
        if (!data) {
            setHabits([]);
        }
        if (data !== undefined && data.error !== "Not authenticated") {
            setHabits(data);
        }
    }, [data]);

    useEffect(() => {
        if (habits) {
            setAccomplished(
                habits.filter((habit) => {
                    if (habit.routine === "daily") {
                        return (
                            new Date(habit.updated_at).toDateString() ===
                                new Date().toDateString() &&
                            habit.updated_at !== null
                        );
                    } else if (habit.routine === "weekly") {
                        return (
                            new Date(
                                new Date(habit.updated_at).getTime() -
                                    7 * 24 * 60 * 60 * 1000
                            ).toDateString() > new Date().toDateString() &&
                            habit.updated_at !== null
                        );
                    } else if (habit.routine === "monthly") {
                        return (
                            new Date(
                                new Date(habit.updated_at).getTime() -
                                    30 * 24 * 60 * 60 * 1000
                            ).toDateString() > new Date().toDateString() &&
                            habit.updated_at !== null
                        );
                    }
                })
            );
            setUnaccomplished(
                habits.filter((habit) => {
                    if (habit.routine === "daily") {
                        return (
                            new Date(habit.updated_at).toDateString() !==
                                new Date().toDateString() ||
                            habit.updated_at === null
                        );
                    } else if (habit.routine === "weekly") {
                        return (
                            new Date(
                                new Date(habit.updated_at).getTime() -
                                    7 * 24 * 60 * 60 * 1000
                            ).toDateString() < new Date().toDateString() ||
                            habit.updated_at === null
                        );
                    } else if (habit.routine === "monthly") {
                        return (
                            new Date(
                                new Date(habit.updated_at).getTime() -
                                    30 * 24 * 60 * 60 * 1000
                            ).toDateString() < new Date().toDateString() ||
                            habit.updated_at === null
                        );
                    }
                })
            );
        }
    }, [habits]);

    if (error) return <div>failed to load</div>;
    if (!data) return <Skelton />;

    return (
        <React.Fragment>
            <div className="my-10">
                <Form />
            </div>
            {unaccomplished.length > 0 && (
                <div className="my-6">
                    <div className="flex flex-col gap-6">
                        {unaccomplished.map((habit) => (
                            <Card key={habit._id} habit={habit} />
                        ))}
                    </div>
                </div>
            )}
            <div className="container-lg mx-auto">
                {accomplished.length > 0 && unaccomplished.length > 0 && (
                    <div className="w-full border border-gray-300 h-min"></div>
                )}
            </div>

            {habits.length === 0 && (
                <div className="text-center text-gray-500">No habits yet</div>
            )}
            {accomplished.length > 0 && (
                <div className="my-6">
                    <div className="flex flex-col gap-6">
                        {accomplished.map((habit) => (
                            <Card key={habit._id} habit={habit} />
                        ))}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default index;
