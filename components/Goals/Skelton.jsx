import React from "react";
import Form from "./Form";
import Wrapper from "../Common/Wrapper";
import Absolute from "../Common/Absolute";
import FlexWrapper from "../Layouts/FlexWrapper";

function Skelton() {
    return (
        <React.Fragment>
            <div className="my-10">
                <Form />
            </div>

            <div className="my-6">
                <div className="flex flex-col gap-6">
                    {[...Array(3).keys()].map((item) => (
                        <Wrapper key={item}>
                            <Absolute
                                top={7}
                                left={5}
                                className={"top-7 left-5"}
                            >
                                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                            </Absolute>
                            <FlexWrapper type={1} className={"mb-3"}>
                                <div className="pl-6">
                                    <div className="w-32 h-5 bg-gray-200 rounded"></div>
                                </div>
                                <div>
                                    <div className="w-2 h-6 bg-gray-200 rounded"></div>
                                </div>
                            </FlexWrapper>
                            <FlexWrapper
                                type={0}
                                className="flex-col gap-0 pl-6"
                            >
                                <div className="w-48 h-3 bg-gray-200 rounded mb-2"></div>
                                <div className="w-48 h-3 bg-gray-200 rounded"></div>
                            </FlexWrapper>
                        </Wrapper>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Skelton;
