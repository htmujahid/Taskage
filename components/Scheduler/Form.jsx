import React, { useState, useRef, useContext } from "react";
import { SchedulerContext } from "./index";

import { useSWRConfig } from "swr";
import Submit from "../Form/Submit";
import Time from "../Form/Time";
import Input from "../Form/Input";
import FormWrapper from "../Form/FormWrapper";
import Form from "../Form/Form";
import Wrapper from "../Common/Wrapper";
import Image from "next/image";

function FormComponent() {
    const { setTasks } = useContext(SchedulerContext) ?? {};

    const [showTime, setShowTime] = useState(false);
    const { mutate } = useSWRConfig();

    const [title, setTitle] = useState("");
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        if (!title.trim()) {
            return;
        }

        const data = {
            title,
            time,
            intervals: [
                {
                    started_at: new Date().toISOString(),
                    completed_at: null,
                },
            ],
            completed_at: null,
        };
        setIsLoading(true);
        setTasks((prev) => [data, ...prev]);
        setTitle("");
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        setIsLoading(false);
        fetch("/api/scheduler", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                setShowTime(false);
                mutate("/api/scheduler");
            });
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                {showTime && <Time time={time} setTime={setTime} />}
                <FormWrapper type={2}>
                    <Image
                        src="/assets/icons/timer.svg"
                        className="px-2"
                        alt=""
                        onClick={() => setShowTime((prev) => !prev)}
                        width={48}
                        height={48}
                    />
                    <Input
                        text={title}
                        setText={setTitle}
                        placeholder="Enter a Task"
                        className={"mb-0"}
                        required
                    />
                    <Submit className={"w-min"} isLoading={isLoading}>
                        Start
                    </Submit>
                </FormWrapper>
            </Form>
        </Wrapper>
    );
}

export default FormComponent;
