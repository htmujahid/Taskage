import React, { useContext, useState } from "react";
import { TodoContext } from "./index";
import { useSWRConfig } from "swr";

import { createTodo } from "@/lib/app/todos";

import Wrapper from "@/components/Common/Wrapper";
import Checkbox from "@/components/Form/Checkbox";
import Date from "@/components/Form/Date";
import FormWrapper from "@/components/Form/FormWrapper";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import Submit from "@/components/Form/Submit";
import Textarea from "@/components/Form/Textarea";
import Form from "@/components/Form/Form";

const categorOptions = [
    { value: "", text: "Select a category" },
    { value: "personal", text: "Personal" },
    { value: "work", text: "Work" },
    { value: "other", text: "Other" },
];

const priorityOptions = [
    { value: "", text: "Select a priority" },
    { value: "low", text: "Low" },
    { value: "medium", text: "Medium" },
    { value: "high", text: "High" },
];

function FormComponent() {
    const { mutate } = useSWRConfig();
    // inputs
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [additional, setAdditional] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !date.trim() === "") {
            return;
        }

        const data = {
            title,
            description,
            date,
            priority,
            category,
            completed_at: null,
        };
        setIsLoading(true);

        await createTodo(data);

        setTitle("");
        setDate("");
        setDescription("");
        setPriority("");
        setCategory("");
        setIsLoading(false);
        mutate("/api/todos");
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <FormWrapper type={1}>
                    <Input
                        placeholder="Enter a todo"
                        text={title}
                        setText={setTitle}
                        required
                    />
                    <Date
                        placeholder="Enter a date"
                        date={date}
                        setDate={setDate}
                        className={"sm:w-80"}
                        required
                    />
                </FormWrapper>

                {additional && (
                    <React.Fragment>
                        <Textarea
                            rows="3"
                            placeholder="Enter a description"
                            text={description}
                            setText={setDescription}
                        ></Textarea>
                        <FormWrapper type={1}>
                            <Select
                                select={priority}
                                setSelect={setPriority}
                                options={priorityOptions}
                            />
                            <Select
                                select={category}
                                setSelect={setCategory}
                                options={categorOptions}
                            />
                        </FormWrapper>
                    </React.Fragment>
                )}
                <FormWrapper type={4}>
                    <Checkbox
                        check={additional}
                        setCheck={setAdditional}
                        label="Additional Details"
                    />
                    <Submit className={"sm:w-80"} isLoading={isLoading}>
                        Add Todo
                    </Submit>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
