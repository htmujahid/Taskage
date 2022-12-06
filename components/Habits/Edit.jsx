import React, { useContext, useEffect, useRef, useState } from "react";
import { HabitContext } from "./index";

import { useSWRConfig } from "swr";
import Full from "../Common/Full";
import Discard from "../Form/Discard";
import FormWrapper from "../Form/FormWrapper";
import Form from "../Form/Form";
import Input from "../Form/Input";
import Wrapper from "../Common/Wrapper";
import Select from "../Form/Select";
import Submit from "../Form/Submit";

const routineOptions = [
    { value: "", text: "Select a Routine" },
    { value: "daily", text: "Daily" },
    { value: "weekly", text: "Weekly" },
    { value: "monthly", text: "Monthly" },
];
function Edit({ habit, setEditMode }) {
    const { setHabits } = useContext(HabitContext) ?? {};

    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState(habit.title);
    const [routine, setRoutine] = useState(habit.routine);
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
        setHabits((prev) => {
            const updated = prev.map((habit) => {
                if (habit.id === data.id) {
                    return data;
                }
                return habit;
            });
            return updated;
        });
        setIsLoading(false);
        setEditMode(false);
        await fetch(`/api/habits/${habit._id}`, {
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
                    <FormWrapper type={4} className={"w-full"}>
                        <Full className="w-full">
                            <Discard setEditMode={setEditMode}>Discard</Discard>
                        </Full>
                        <Full>
                            <Submit isLoading={isLoading}>Track Habit</Submit>
                        </Full>
                    </FormWrapper>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default Edit;
