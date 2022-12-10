import React from "react";
import Form from "./Form";
import Absolute from "@/components/Common/Absolute";
import Wrapper from "@/components/Common/Wrapper";
import FlexWrapper from "@/components/Layouts/FlexWrapper";
import Full from "@/components/Common/Full";

function Skelton() {
    return (
        <div>
            <div className="my-10">
                <Form />
            </div>

            <div className="container-lg mx-auto shadow-md flex justify-between items-center gap-4 p-4 bg-white rounded-lg">
                <div>
                    <p>Filter</p>
                </div>
                <div>
                    <select className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none">
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="my-6">
                <div className="flex flex-col gap-6 animate-pulse">
                    {[...Array(3).keys()].map((item) => (
                        <Wrapper type={1} key={item}>
                            <Absolute
                                top={7}
                                left={5}
                                className={"top-7 left-5"}
                            >
                                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                            </Absolute>
                            <FlexWrapper type={1}>
                                <div className="pl-6">
                                    <div className="w-32 h-5 bg-gray-200 rounded"></div>
                                </div>
                                <div>
                                    <div className="w-2 h-6 bg-gray-200 rounded"></div>
                                </div>
                            </FlexWrapper>
                            <Full className="mt-6">
                                <div className="flex justify-center font-light text-center gap-8">
                                    <div className="w-12">
                                        <div className="w-12 h-9 bg-gray-200 rounded mb-2"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="w-12">
                                        <div className="w-12 h-9 bg-gray-200 rounded mb-2"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="w-12">
                                        <div className="w-12 h-9 bg-gray-200 rounded mb-2"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </Full>
                        </Wrapper>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skelton;
