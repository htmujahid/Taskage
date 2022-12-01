import React, { useEffect, useRef, useState } from "react";
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
    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState(habit.title);
    const [routine, setRoutine] = useState(habit.routine);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !routine.trim()) {
            return;
        }
        await fetch(`/api/habits/${habit._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                routine,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                mutate("/api/habits");
                setEditMode(false);
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
                <FormWrapper type={1}>
                    <Full>
                        <Select
                            select={routine}
                            setSelect={setRoutine}
                            options={routineOptions}
                            className={"mb-0"}
                            required
                        ></Select>
                    </Full>
                    <FormWrapper type={1} className={"w-full"}>
                        <Full className="w-full">
                            <Discard onClick={() => setEditMode(false)}>
                                Discard
                            </Discard>
                        </Full>
                        <Full>
                            <Submit>Track Habit</Submit>
                        </Full>
                    </FormWrapper>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default Edit;
