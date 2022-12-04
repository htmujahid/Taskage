import React, { useEffect, useState } from "react";

import { useSWRConfig } from "swr";
import Submit from "../Form/Submit";

import Input from "../Form/Input";
import FormWrapper from "../Form/FormWrapper";
import Form from "../Form/Form";
import Wrapper from "../Common/Wrapper";
import Date from "../Form/Date";
import Select from "../Form/Select";
import Full from "../Common/Full";

const statusOptions = [
    { value: "", text: "Select a status" },
    { value: "Have Read", text: "Have Read" },
    { value: "Reading", text: "Reading" },
    { value: "To Read", text: "To Read" },
];
function FormComponent() {
    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [author, setAuthor] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const colors = [
        "##eab308",
        "#84cc16",
        "#22c55e",
        "#14b8a6",
        "#06b6d4",
        "#3b82f6",
        "#6366f1",
    ];

    function generateRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !author.trim() || !status.trim()) {
            return;
        }
        setIsLoading(true);
        await fetch("/api/readings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                author,
                type,
                start_date: startDate,
                end_date: endDate,
                status,
                color: generateRandomColor(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTitle("");
                setAuthor("");
                setType("");
                setStartDate("");
                setEndDate("");
                setStatus("");
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
                mutate("/api/readings");
            });
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Input
                    text={title}
                    setText={setTitle}
                    placeholder="Title of Book"
                    required
                />
                <FormWrapper type={1}>
                    <Input
                        text={author}
                        setText={setAuthor}
                        placeholder="Author"
                        required
                    />
                    <Input text={type} setText={setType} placeholder="Type" />
                </FormWrapper>
                <FormWrapper type={1}>
                    <Date
                        date={startDate}
                        setDate={setStartDate}
                        placeholder="Start Date"
                    />
                    <Date
                        date={endDate}
                        setDate={setEndDate}
                        placeholder="End Date"
                    />
                </FormWrapper>
                <FormWrapper type={4}>
                    <Full>
                        <Select
                            select={status}
                            setSelect={setStatus}
                            options={statusOptions}
                            className={"mb-0"}
                            required
                        ></Select>
                    </Full>
                    <Full>
                        <Submit isLoading={isLoading}>Add Book</Submit>
                    </Full>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
