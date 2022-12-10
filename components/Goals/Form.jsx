import React, { useContext, useEffect, useRef, useState } from "react";
import { GoalContext } from "./index";

import { useSWRConfig } from "swr";
import Submit from "@/components/Form/Submit";
import Date from "@/components/Form/Date";
import Input from "@/components/Form/Input";
import FormWrapper from "@/components/Form/FormWrapper";
import Form from "@/components/Form/Form";
import Wrapper from "@/components/Common/Wrapper";
import Full from "@/components/Common/Full";
import { createGoal } from "@/lib/app/goals";

function FormComponent() {
    const { mutate } = useSWRConfig();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !startDate.trim() || !endDate.trim()) {
            return;
        }

        const data = {
            title,
            start_date: startDate,
            end_date: endDate,
        };

        setIsLoading(true);

        await createGoal(data);

        setTitle("");
        setStartDate("");
        setEndDate("");
        setIsLoading(false);

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
                    <Full>
                        <Submit isLoading={isLoading}>Add Goal</Submit>
                    </Full>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
