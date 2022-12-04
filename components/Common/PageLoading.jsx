import React from "react";

function PageLoading() {
    return (
        <div className="flex absolute gap-8 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <span className="animate-ping inline-flex h-6 w-6 rounded-full bg-gray-300 opacity-75"></span>
            <span className="animate-ping inline-flex h-6 w-6 rounded-full bg-gray-300 opacity-75"></span>
            <span className="animate-ping inline-flex h-6 w-6 rounded-full bg-gray-300 opacity-75"></span>
        </div>
    );
}

export default PageLoading;
