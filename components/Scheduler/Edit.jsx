import React, { useState, useEffect, useContext } from "react";
import { SchedulerContext } from "./index";

import { useSWRConfig } from "swr";
import Wrapper from "@/components/Common/Wrapper";
import Form from "@/components/Form/Form";
import FormWrapper from "@/components/Form/FormWrapper";
import Time from "@/components/Form/Time";
import Input from "@/components/Form/Input";
import Image from "next/image";
import Discard from "@/components/Form/Discard";
import Submit from "@/components/Form/Submit";
import { updateScheduler } from "@/lib/app/scheduler";
function Edit({ task, setEditMode, setIsTime }) {
    const { setTasks } = useContext(SchedulerContext) ?? {};

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
            intervals: task.intervals,
            completed_at: task.completed_at,
        };
        setIsLoading(true);

        await updateScheduler(task._id, data);

        if (time.hours != 0 || time.minutes != 0 || time.seconds != 0) {
            setIsTime(true);
        } else {
            setIsTime(false);
        }
        setEditMode(false);
        setShowTime(false);
        setIsLoading(false);

        mutate("/api/scheduler");
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
