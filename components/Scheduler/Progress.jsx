import React, { useState, useEffect } from "react";

function Progress({ task }) {
    const [time, setTime] = useState(Date.now());

    const currentTime = new Date();
    const startedAtDate = new Date(task.intervals[0].started_at);
    const timeSpents = [];

    task.intervals.forEach((interval) => {
        const startedAt = new Date(interval.started_at);
        const completedAt = new Date(interval.completed_at);
        timeSpents.push(
            interval.completed_at
                ? completedAt.getTime() - startedAt.getTime()
                : currentTime.getTime() - startedAt.getTime()
        );
    });

    const timeSpent = timeSpents.reduce((a, b) => a + b, 0);
    const seconds = Math.floor(timeSpent / 1000);
    const totalSeconds =
        task.time.hours * 3600 + task.time.minutes * 60 + task.time.seconds;

    const progress =
        Math.floor((seconds / totalSeconds) * 100) > 100
            ? 100
            : Math.floor((seconds / totalSeconds) * 100);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="absolute w-full text-center text-[9px] font-bold">
                {progress}
            </div>
            <div
                className={`bg-green-400 h-3 rounded-lg text-xs text-black duration-300`}
                style={{ width: `${progress}%` }}
            ></div>
        </React.Fragment>
    );
}

export default Progress;
