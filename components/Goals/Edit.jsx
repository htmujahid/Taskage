import React, { useContext, useEffect, useState } from "react";
import { GoalContext } from "./index";

import { useSWRConfig } from "swr";
import Wrapper from "@/components/Common/Wrapper";
import Form from "@/components/Form/Form";
import FormWrapper from "@/components/Form/FormWrapper";
import Date from "@/components/Form/Date";
import Input from "@/components/Form/Input";
import Submit from "@/components/Form/Submit";
import Full from "@/components/Common/Full";
import Discard from "@/components/Form/Discard";
import { updateGoal } from "@/lib/app/goals";

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

        await updateGoal(goal._id, data);
        setIsLoading(false);
        setEditMode(false);

        mutate("/api/goals");
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
