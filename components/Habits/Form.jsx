import React, { useContext, useEffect, useState } from "react";
import { HabitContext } from "./index";

import { useSWRConfig } from "swr";
import Submit from "../Form/Submit";
import Input from "../Form/Input";
import FormWrapper from "../Form/FormWrapper";
import Form from "../Form/Form";
import Wrapper from "../Common/Wrapper";
import Full from "../Common/Full";
import Select from "../Form/Select";
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

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !routine.trim()) {
            return;
        }
        const data = {
            title,
            routine,
        };
        setIsLoading(true);
        setHabits((prev) => [...prev, data]);
        setTitle("");
        setRoutine("");
        setIsLoading(false);

        fetch("/api/habits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                mutate("/api/habits");
            });
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
