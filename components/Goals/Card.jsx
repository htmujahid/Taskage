import React, { useState } from "react";
import Controls from "./Controls";
import Edit from "./Edit";
import Wrapper from "@/components/Common/Wrapper";
import Absolute from "@/components/Common/Absolute";
import Button from "@/components/Widgets/Button";
import FlexWrapper from "@/components/Layouts/FlexWrapper";
import Text from "@/components/Typography/Text";
import Checkbox from "@/components/Form/Checkbox";
import Image from "next/image";
import CardLoading from "@/components/Common/CardLoading";
import { updateGoalStatus } from "@/lib/app/goals";

function Card({ goal }) {
    const [isCompleted, setIsCompleted] = useState(goal.completed_at);
    const [controls, setControls] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isCardLoading, setIsCardLoading] = useState(false);

    async function handleCompletion() {
        setIsCardLoading(true);
        const data = {
            completed_at: isCompleted ? null : new Date().toISOString(),
        };
        await updateGoalStatus(goal._id, data);
        setIsCardLoading(false);
        setIsCompleted(!isCompleted);
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
                                _id={goal._id}
                                setEditMode={setEditMode}
                                setControls={setControls}
                                setIsCardLoading={setIsCardLoading}
                            />
                        </Absolute>
                    )}
                    <FlexWrapper type={1}>
                        <Text type={4} className={"pl-6"}>
                            {goal.title}
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
                    <FlexWrapper type={0} className="flex-col gap-0 pl-6">
                        <FlexWrapper type={0} className={"gap-2"}>
                            <Text type={2} className="">
                                Starting Date:
                            </Text>
                            <Text type={2} className=" text-blue-500">
                                {new Date(goal.start_date).toDateString()}
                            </Text>
                        </FlexWrapper>
                        <FlexWrapper type={0} className={"gap-2"}>
                            <Text type={2} className="">
                                Achievement Date:{" "}
                            </Text>
                            <Text type={2} className=" text-green-500">
                                {new Date(goal.end_date).toDateString()}
                            </Text>
                        </FlexWrapper>
                    </FlexWrapper>
                </Wrapper>
            ) : (
                <Edit goal={goal} setEditMode={setEditMode} />
            )}
        </React.Fragment>
    );
}

export default Card;
