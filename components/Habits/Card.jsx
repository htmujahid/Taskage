import React, { useState } from "react";
import Controls from "./Controls";
import Edit from "./Edit";
import { useSWRConfig } from "swr";
import Wrapper from "../Common/Wrapper";
import Checkbox from "../Form/Checkbox";
import Absolute from "../Common/Absolute";
import FlexWrapper from "../Layouts/FlexWrapper";
import Text from "../Typography/Text";
import Button from "../Widgets/Button";
import Image from "next/image";
import CardLoading from "../Common/CardLoading";

function Card({ habit }) {
    const { mutate } = useSWRConfig();
    const [isCompleted, setIsCompleted] = useState(false);
    const [isUpdated, setIsUpdated] = useState(habit.updated_at);
    const [controls, setControls] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isCardLoading, setIsCardLoading] = useState(false);

    async function handleUpdation() {
        setIsCardLoading(true);
        await fetch(`/api/habits/${habit._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                updated_at: isUpdated ? null : new Date().toISOString(),
                completed_at: habit.completed_at,
            }),
        });
        setIsCardLoading(false);
        mutate("/api/habits");
        setIsUpdated(!isUpdated);
    }

    function handleControls() {
        setControls(!controls);
    }
    return (
        <React.Fragment>
            {!editMode ? (
                <Wrapper
                    className={`${isUpdated ? "opacity-50" : "opacity-100"}`}
                >
                    <Absolute top={7} left={5} className={"top-7 left-5"}>
                        <Checkbox
                            check={isUpdated}
                            setCheck={setIsUpdated}
                            onChange={handleUpdation}
                        />
                    </Absolute>
                    {isCardLoading && <CardLoading />}
                    {controls && (
                        <Absolute right={14} className={"right-14"}>
                            <Controls
                                _id={habit._id}
                                setEditMode={setEditMode}
                                setControls={setControls}
                                isCompleted={isCompleted}
                                habit={habit}
                                setIsCardLoading={setIsCardLoading}
                            />
                        </Absolute>
                    )}
                    <FlexWrapper type={1}>
                        <Text type={4} className={"pl-6"}>
                            {habit.title}
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
                </Wrapper>
            ) : (
                <Edit habit={habit} setEditMode={setEditMode} />
            )}
        </React.Fragment>
    );
}

export default Card;
