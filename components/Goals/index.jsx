import React, { createContext, useEffect, useState } from "react";
export const GoalContext = createContext();

import Card from "./Card";
import Form from "./Form";
import Skelton from "./Skelton";
import { useGoals } from "@/lib/app/goals";

function index() {
    const { data, error } = useGoals();
    const [goals, setGoals] = useState(data);

    const contextData = {
        goals,
        setGoals,
    };

    useEffect(() => {
        if (!data) {
            setGoals([]);
        }
        if (data !== undefined && data.error !== "Not authenticated") {
            setGoals(data);
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return <Skelton />;

    return (
        <GoalContext.Provider value={contextData}>
            <div className="my-10">
                <Form />
            </div>
            {goals.length === 0 && (
                <div className="text-center text-gray-500">No goals yet</div>
            )}
            <div className="my-6">
                <div className="flex flex-col gap-6">
                    {goals &&
                        goals.map((goal) => (
                            <Card key={goal._id} goal={goal} />
                        ))}
                </div>
            </div>
        </GoalContext.Provider>
    );
}

export default index;
