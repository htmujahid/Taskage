import React, { useEffect, useContext, useState } from "react";
import { TodoContext } from "./index";

import { useSWRConfig } from "swr";
import Wrapper from "../Common/Wrapper";
import Date from "../Form/Date";
import Form from "../Form/Form";
import FormWrapper from "../Form/FormWrapper";
import Input from "../Form/Input";
import Submit from "../Form/Submit";
import Textarea from "../Form/Textarea";
import Discard from "../Form/Discard";
import Select from "../Form/Select";
import Checkbox from "../Form/Checkbox";
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

function Edit({ todo, setEditMode }) {
    const { mutate } = useSWRConfig();
    const setTodos = useContext(TodoContext);

    const [additional, setAdditional] = useState(false);

    const [title, setTitle] = useState(todo.title);
    const [date, setDate] = useState(todo.date);
    const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);
    const [category, setCategory] = useState(todo.category);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !date.trim()) {
            return;
        }

        const data = {
            title,
            description,
            date,
            priority,
            category,
            completed_at: todo.completed_at,
        };
        setIsLoading(true);
        setTodos((prev) => {
            const index = prev.findIndex((t) => t.id === todo.id);
            prev[index] = data;
            return [...prev];
        });
        setEditMode(false);
        setIsLoading(false);
        await fetch(`/api/todos/${todo._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                mutate("/api/todos");
            });
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
                <FormWrapper type={4} className={"w-full"}>
                    <Checkbox
                        check={additional}
                        setCheck={setAdditional}
                        label="Additional Details"
                    />
                    <FormWrapper type={4} className={"w-full"}>
                        <Discard setEditMode={setEditMode}>Discard</Discard>
                        <Submit isLoading={isLoading}>SubmitChanges</Submit>
                    </FormWrapper>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default Edit;
