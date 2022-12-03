import React from "react";

function CardLoading() {
    return (
        <div className="flex absolute gap-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <span className="animate-ping inline-flex h-4 w-4 rounded-full bg-gray-300 opacity-75"></span>
            <span className="animate-ping inline-flex h-4 w-4 rounded-full bg-gray-300 opacity-75"></span>
            <span className="animate-ping inline-flex h-4 w-4 rounded-full bg-gray-300 opacity-75"></span>
        </div>
    );
}

export default CardLoading;
