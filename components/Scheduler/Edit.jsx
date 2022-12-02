import React, { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import Wrapper from "../Common/Wrapper";
import Form from "../Form/Form";
import FormWrapper from "../Form/FormWrapper";
import Time from "../Form/Time";
import Input from "../Form/Input";
import Image from "next/image";
import Discard from "../Form/Discard";
import Submit from "../Form/Submit";
function Edit({ task, setEditMode, setIsTime }) {
    const [showTime, setShowTime] = useState(false);
    const { mutate } = useSWRConfig();
    const [title, setTitle] = useState(task.title);
    const [time, setTime] = useState(task.time);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!title.trim()) {
            return;
        }

        const data = {
            title,
            time,
        };
        setIsLoading(true);
        fetch(`/api/scheduler/${task._id}`, {
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
                if (time.hours != 0 || time.minutes != 0 || time.seconds != 0) {
                    setIsTime(true);
                } else {
                    setIsTime(false);
                }
                setShowTime(false);
                setIsLoading(false);
                setEditMode(false);
                mutate("/api/scheduler");
            });
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                {showTime && <Time time={time} setTime={setTime} />}
                <FormWrapper type={5}>
                    <FormWrapper type={1} className={"w-full"}>
                        <Image
                            src="/assets/icons/timer.svg"
                            className="px-2"
                            alt=""
                            onClick={() => setShowTime((prev) => !prev)}
                            width={64}
                            height={64}
                        />
                        <Input
                            text={title}
                            setText={setTitle}
                            placeholder="Enter a Task"
                            className={"mb-0 w-full"}
                            required
                        />
                    </FormWrapper>
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
