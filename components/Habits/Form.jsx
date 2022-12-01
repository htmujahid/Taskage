import React, { useEffect, useState } from "react";
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
    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState("");
    const [routine, setRoutine] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !routine.trim()) {
            return;
        }

        fetch("/api/habits", {
            method: "POST",
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
                setTitle("");
                setRoutine("");
                mutate("/api/habits");
            })
            .catch((err) => console.log(err))
            .finally(() => {});
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
                    <Full>
                        <Submit>Track Habit</Submit>
                    </Full>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
