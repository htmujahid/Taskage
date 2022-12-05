import React, { useState, useContext } from "react";

import { useSWRConfig } from "swr";
import Wrapper from "../Common/Wrapper";
import FlexWrapper from "../Layouts/FlexWrapper";
import Controls from "./Controls";
import Edit from "./Edit";
import Absolute from "../Common/Absolute";
import Checkbox from "../Form/Checkbox";
import Image from "next/image";
import Text from "../Typography/Text";
import Button from "../Widgets/Button";
import Paragraph from "../Typography/Paragraph";
import Full from "../Common/Full";
import CardLoading from "../Common/CardLoading";

function Card({ todo }) {
    const [detailed, setDetailed] = useState(false);
    const [controls, setControls] = useState(false);
    const [isCompleted, setIsCompleted] = useState(todo.completed_at !== null);
    const [editMode, setEditMode] = useState(false);
    const [isCardLoading, setIsCardLoading] = useState(false);

    const { mutate } = useSWRConfig();

    async function handleCompletion() {
        setIsCardLoading(true);
        setIsCompleted((prev) => !prev);
        setIsCardLoading(false);
        await fetch(`/api/todos/${todo._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed_at: isCompleted ? null : new Date().toISOString(),
            }),
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

    function handleControls() {
        setControls(!controls);
    }

    return (
        <React.Fragment>
            {!editMode ? (
                <Wrapper
                    className={`${isCompleted ? "opacity-50" : "opacity-100"}`}
                >
                    <Absolute top={7} left={5} className={"top-7 left-5"}>
                        <Checkbox
                            check={isCompleted}
                            setCheck={setIsCompleted}
                            onChange={handleCompletion}
                        />
                    </Absolute>
                    {isCardLoading && <CardLoading />}
                    {controls && (
                        <Absolute right={14} className={"right-14"}>
                            <Controls
                                _id={todo._id}
                                setEditMode={setEditMode}
                                setControls={setControls}
                                setIsCardLoading={setIsCardLoading}
                            />
                        </Absolute>
                    )}
                    <FlexWrapper type={1}>
                        <Text type={4} className={"pl-6"}>
                            {todo.title}
                        </Text>
                        <Button className="h-fit" onClick={handleControls}>
                            <Image
                                src="/assets/icons/more.svg"
                                alt="clock"
                                width={32}
                                height={32}
                            />
                        </Button>
                    </FlexWrapper>
                    {detailed && (
                        <React.Fragment>
                            <Paragraph>{todo.description}</Paragraph>
                            <FlexWrapper type={2}>
                                <FlexWrapper type={3}>
                                    <Text type={2}>Date:</Text>
                                    <Text type={2} className={"text-green-500"}>
                                        {new Date(todo.date).toDateString()}
                                    </Text>
                                </FlexWrapper>
                                <FlexWrapper type={3}>
                                    <Text type={2}>Category:</Text>
                                    <Text type={2} className={"text-blue-500"}>
                                        {todo.category}
                                    </Text>
                                </FlexWrapper>
                                <FlexWrapper type={3}>
                                    <Text type={2}>Priority:</Text>
                                    <Text type={2} className={"text-red-500"}>
                                        {todo.priority}
                                    </Text>
                                </FlexWrapper>
                            </FlexWrapper>
                        </React.Fragment>
                    )}
                    <Full
                        className={
                            "absolute mt-3 bg-white left-1/2 -translate-x-1/2 border-2 border-black rounded-full w-6"
                        }
                    >
                        <Image
                            src={`/assets/icons/${
                                detailed ? "minus" : "plus"
                            }.svg`}
                            alt=""
                            width={32}
                            height={32}
                            className="mx-auto"
                            onClick={() => setDetailed((prev) => !prev)}
                        />
                    </Full>
                </Wrapper>
            ) : (
                <Edit todo={todo} setEditMode={setEditMode} />
            )}
        </React.Fragment>
    );
}

export default Card;
