import React from "react";

function FullScreen({ children, className }) {
    return (
        <div
            className={`flex min-h-screen flex-col justify-center ${className}`}
        >
            {children}
        </div>
    );
}

export default FullScreen;
