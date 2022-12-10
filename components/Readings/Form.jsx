import React, { useContext, useEffect, useState } from "react";
import { ReadingContext } from "./index";

import { useSWRConfig } from "swr";
import Submit from "@/components/Form/Submit";

import Input from "@/components/Form/Input";
import FormWrapper from "@/components/Form/FormWrapper";
import Form from "@/components/Form/Form";
import Wrapper from "@/components/Common/Wrapper";
import Date from "@/components/Form/Date";
import Select from "@/components/Form/Select";
import Full from "@/components/Common/Full";
import { createReading } from "@/lib/app/readings";

const statusOptions = [
    { value: "", text: "Select a status" },
    { value: "Have Read", text: "Have Read" },
    { value: "Reading", text: "Reading" },
    { value: "To Read", text: "To Read" },
];
function FormComponent() {
    const { setReadings } = useContext(ReadingContext) ?? {};

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
        const data = {
            title,
            author,
            status,
            start_date: startDate,
            end_date: endDate,
            type,
            color: generateRandomColor(),
        };

        setIsLoading(true);

        await createReading(data);
        setTitle("");
        setAuthor("");
        setType("");
        setStartDate("");
        setEndDate("");
        setStatus("");
        setIsLoading(false);

        mutate("/api/readings");
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
