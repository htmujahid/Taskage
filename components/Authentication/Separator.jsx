import React from "react";

function Separator() {
    return (
        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center text-gray-900 font-semibold mx-4 mb-0">
                Or
            </p>
        </div>
    );
}

export default Separator;
