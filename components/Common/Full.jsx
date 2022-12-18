import React from "react";

function Full({ children, className }) {
    return <div className={`w-full ${className}`}>{children}</div>;
}

export default Full;
