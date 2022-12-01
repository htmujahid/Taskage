import React, { useEffect, useState } from "react";
import Card from "./Card";
import Form from "./Form";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function index() {
    const { data, error } = useSWR("/api/goals", fetcher);
    const [goals, setGoals] = useState(data);

    useEffect(() => {
        if (!data) {
            setGoals([]);
        }
        if (data !== undefined && data.error !== "Not authenticated") {
            setGoals(data);
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return (
        <React.Fragment>
            <div className="my-10">
                <Form />
            </div>
            <div className="my-6">
                <div className="flex flex-col gap-6">
                    {goals &&
                        goals.map((goal) => (
                            <Card key={goal._id} goal={goal} />
                        ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default index;
