import React, { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Wrapper from "../Common/Wrapper";
import Form from "../Form/Form";
import FormWrapper from "../Form/FormWrapper";
import Date from "../Form/Date";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Full from "../Common/Full";
function Edit({ goal, setEditMode }) {
    const { mutate } = useSWRConfig();
    const [startDate, setStartDate] = useState(goal.start_date);
    const [endDate, setEndDate] = useState(goal.end_date);
    const [title, setTitle] = useState(goal.title);

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !title.trim() ||
            !startDate.trim() === "" ||
            !endDate.trim() === ""
        ) {
            return;
        }
        await fetch(`/api/goals/${goal._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                start_date: startDate,
                end_date: endDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setEditMode(false);
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
                <FormWrapper type={1}>
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
                        <Submit>Add Goal</Submit>
                    </Full>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default Edit;
