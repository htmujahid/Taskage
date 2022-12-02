import React, { useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
import Submit from "../Form/Submit";
import Date from "../Form/Date";
import Input from "../Form/Input";
import FormWrapper from "../Form/FormWrapper";
import Form from "../Form/Form";
import Wrapper from "../Common/Wrapper";
import Full from "../Common/Full";

function FormComponent() {
    const { mutate } = useSWRConfig();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !startDate.trim() || !endDate.trim()) {
            return;
        }
        setIsLoading(true);
        fetch("/api/goals", {
            method: "POST",
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
                setTitle("");
                setStartDate("");
                setEndDate("");
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
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
                    <Full>
                        <Submit isLoading={isLoading}>Add Goal</Submit>
                    </Full>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
