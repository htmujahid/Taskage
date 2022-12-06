import React, { useContext, useEffect, useState } from "react";
import { GoalContext } from "./index";

import { useSWRConfig } from "swr";
import Wrapper from "../Common/Wrapper";
import Form from "../Form/Form";
import FormWrapper from "../Form/FormWrapper";
import Date from "../Form/Date";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Full from "../Common/Full";
import Discard from "../Form/Discard";

function Edit({ goal, setEditMode }) {
    const { setGoals } = useContext(GoalContext) ?? {};
    const { mutate } = useSWRConfig();
    const [startDate, setStartDate] = useState(goal.start_date);
    const [endDate, setEndDate] = useState(goal.end_date);
    const [title, setTitle] = useState(goal.title);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !title.trim() ||
            !startDate.trim() === "" ||
            !endDate.trim() === ""
        ) {
            return;
        }

        const data = {
            title,
            start_date: startDate,
            end_date: endDate,
        };

        setIsLoading(true);
        setGoals((prev) => {
            const newGoals = prev.map((goal) => {
                if (goal.id === goal.id) {
                    return data;
                }
                return goal;
            });
            return newGoals;
        });
        setIsLoading(false);
        setEditMode(false);

        await fetch(`/api/goals/${goal._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                mutate("/api/goals");
            });
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <FormWrapper type={1}>
                    <Date
                        date={startDate}
                        setDate={setStartDate}
                        placeholder="Start Date"
                        required
                    />
                    <Date
                        date={endDate}
                        setDate={setEndDate}
                        placeholder="End Date"
                        required
                    />
                </FormWrapper>
                <FormWrapper type={4}>
                    <Full>
                        <Input
                            text={title}
                            setText={setTitle}
                            placeholder="Enter Goal"
                            className={"mb-0"}
                            required
                        />
                    </Full>
                    <FormWrapper type={2} className={"w-full"}>
                        <Discard setEditMode={setEditMode}>Discard</Discard>
                        <Submit isLoading={isLoading}>Add Goal</Submit>
                    </FormWrapper>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default Edit;
