import React, { useContext, useEffect, useState } from "react";
import { HabitContext } from "./index";

import { useSWRConfig } from "swr";
import Submit from "@/components/Form/Submit";
import Input from "@/components/Form/Input";
import FormWrapper from "@/components/Form/FormWrapper";
import Form from "@/components/Form/Form";
import Wrapper from "@/components/Common/Wrapper";
import Full from "@/components/Common/Full";
import Select from "@/components/Form/Select";
import { createHabit } from "@/lib/app/habits";
const routineOptions = [
    { value: "", text: "Select a routine" },
    { value: "daily", text: "Daily" },
    { value: "weekly", text: "Weekly" },
    { value: "monthly", text: "Monthly" },
];
function FormComponent() {
    const { setHabits } = useContext(HabitContext) ?? {};

    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState("");
    const [routine, setRoutine] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !routine.trim()) {
            return;
        }
        const data = {
            title,
            routine,
        };
        setIsLoading(true);

        await createHabit(data);

        setTitle("");
        setRoutine("");
        setIsLoading(false);

        mutate("/api/habits");
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Input
                    text={title}
                    setText={setTitle}
                    placeholder="Enter Habit"
                    required
                />
                <FormWrapper type={4}>
                    <Full>
                        <Select
                            select={routine}
                            setSelect={setRoutine}
                            options={routineOptions}
                            className={"mb-0"}
                            required
                        ></Select>
                    </Full>
                    <Full>
                        <Submit isLoading={isLoading}>Track Habit</Submit>
                    </Full>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
