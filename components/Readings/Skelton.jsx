import React from "react";
import Form from "./Form";
function Skelton() {
    return (
        <React.Fragment>
            <div className="my-10">
                <Form />
            </div>
            <div className="mx-auto grid w-fit grid-cols-1 gap-6 sm:grid-cols-2 animate-pulse">
                {[...Array(3).keys()].map((item) => (
                    <div
                        className="h-96 w-72 rounded bg-white p-4 flex flex-col justify-between relative"
                        key={item}
                    >
                        <div className="absolute right-2 top-2">
                            <div className="h-6 w-5 rounded bg-gray-300 mb-2 mt-1"></div>
                            <div className="h-6 w-5 rounded bg-gray-300"></div>
                        </div>
                        <div>
                            <div className="h-4 w-32 bg-gray-300 rounded mt-4"></div>
                            <div className="h-6 w-48 bg-gray-300 rounded mt-8"></div>
                        </div>
                        <div className="font-medium">
                            <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
                            <div className="h-4 w-48 bg-gray-300 rounded mb-3"></div>
                            <div className="h-4 w-48 bg-gray-300 rounded mb-3"></div>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default Skelton;
