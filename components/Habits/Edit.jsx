import React, { useContext, useEffect, useRef, useState } from "react";
import { HabitContext } from "./index";

import { useSWRConfig } from "swr";
import Full from "@/components/Common/Full";
import Discard from "@/components/Form/Discard";
import FormWrapper from "@/components/Form/FormWrapper";
import Form from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import Wrapper from "@/components/Common/Wrapper";
import Select from "@/components/Form/Select";
import Submit from "@/components/Form/Submit";
import { updateHabit } from "@/lib/app/habits";

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
        await updateHabit(habit._id, data);
        setIsLoading(false);
        setEditMode(false);

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
