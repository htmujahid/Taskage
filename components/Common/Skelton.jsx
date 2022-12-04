import React from "react";
import Wrapper from "./Wrapper";

function Skelton() {
    return (
        <Wrapper>
            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </Wrapper>
    );
}

export default Skelton;
