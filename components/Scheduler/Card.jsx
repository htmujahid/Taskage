import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import dynamic from "next/dynamic";
const Timer = dynamic(() => import("./Timer"), { ssr: false });
import TimeSpent from "./TimeSpent";
import { useSWRConfig } from "swr";
import Edit from "./Edit";
import Progress from "./Progress";
import Wrapper from "../Common/Wrapper";
import Absolute from "../Common/Absolute";
import Full from "../Common/Full";
import FlexWrapper from "../Layouts/FlexWrapper";
import Button from "../Widgets/Button";
import Checkbox from "../Form/Checkbox";
import Text from "../Typography/Text";
import Image from "next/image";

function Card({ task }) {
    const [isRunning, setIsRunning] = useState(
        task.intervals[task.intervals.length - 1].completed_at === null
    );

    const [isCompleted, setIsCompleted] = useState(task.completed_at !== null);
    const [isTime, setIsTime] = useState(
        task.time?.hours != 0 ||
            task.time?.minutes != 0 ||
            task.time?.seconds != 0
    );

    const [controls, setControls] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { mutate } = useSWRConfig();

    async function handleCompletion() {
        let updatedInterval = task.intervals;
        if (isCompleted) {
            const newInterval = {
                started_at: new Date().toISOString(),
                completed_at: null,
            };
            updatedInterval.push(newInterval);
        } else {
            if (isRunning) {
                updatedInterval[updatedInterval.length - 1].completed_at =
                    new Date().toISOString();
            } else {
                updatedInterval = task.intervals;
            }
        }
        await fetch(`/api/scheduler/${task._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intervals: updatedInterval,
                completed_at: !isCompleted ? new Date().toISOString() : null,
            }),
        });
        setIsCompleted(!isCompleted);
        mutate("/api/scheduler");
    }

    async function handleControls() {
        setControls(!controls);
    }

    return (
        <React.Fragment>
            {!editMode ? (
                <Wrapper
                    type={1}
                    className={`${isCompleted ? "opacity-50" : "opacity-100"} ${
                        isTime ? "pb-9" : "pb-6"
                    }`}
                >
                    <Absolute top={7} left={5} className={"top-7 left-5"}>
                        <Checkbox
                            check={isCompleted}
                            setCheck={setIsCompleted}
                            onChange={handleCompletion}
                        />
                    </Absolute>
                    {controls && (
                        <Absolute right={14} className={"right-14"}>
                            <Controls
                                task={task}
                                setControls={setControls}
                                isCompleted={isCompleted}
                                setEditMode={setEditMode}
                                isRunning={isRunning}
                                setIsRunning={setIsRunning}
                            />
                        </Absolute>
                    )}
                    <FlexWrapper type={1}>
                        <Text type={4} className={"pl-6"}>
                            {task.title}
                        </Text>
                        <Button onClick={handleControls}>
                            <Image
                                src="/assets/icons/more.svg"
                                alt=""
                                width={32}
                                height={32}
                            />
                        </Button>
                    </FlexWrapper>
                    {!isCompleted ? (
                        <Full className="mt-3">
                            <Timer intervals={task.intervals} />
                        </Full>
                    ) : (
                        <Full className="mt-3">
                            <TimeSpent intervals={task.intervals} />
                        </Full>
                    )}
                    {isTime && (
                        <Absolute
                            bottom={0}
                            left={0}
                            right={0}
                            className={`bottom-0 left-0 right-0 rounded-lg ${
                                isTime ? "block" : "hidden"
                            }`}
                        >
                            <Progress task={task} />
                        </Absolute>
                    )}
                </Wrapper>
            ) : (
                <Edit
                    task={task}
                    setEditMode={setEditMode}
                    setIsTime={setIsTime}
                />
            )}
        </React.Fragment>
    );
}

export default Card;
