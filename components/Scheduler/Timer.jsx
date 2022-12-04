import React, { useState, useEffect } from "react";

function Timer({ intervals }) {
    const [time, setTime] = useState(Date.now());

    const currentTime = new Date();
    const startedAtDate = new Date(intervals[0].started_at);
    const timeSpents = [];
    intervals.forEach((interval) => {
        const startedAt = new Date(interval.started_at);
        const completedAt = new Date(interval.completed_at);
        timeSpents.push(
            interval.completed_at
                ? completedAt.getTime() - startedAt.getTime()
                : currentTime.getTime() - startedAt.getTime()
        );
    });
    const timeSpent = timeSpents.reduce((a, b) => a + b, 0);
    const hours = Math.floor(timeSpent / (1000 * 60 * 60));
    const minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeSpent % (1000 * 60)) / 1000);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex justify-center font-light text-center">
            <div className="w-20">
                <h4 className="text-3xl">{hours}</h4>
                <p className="text-sm">Hours</p>
            </div>
            <div className="w-20">
                <h4 className="text-3xl">{minutes}</h4>
                <p className="text-sm">Minutes</p>
            </div>
            <div className="w-20">
                <h4 className="text-3xl">{seconds}</h4>
                <p className="text-sm">Seconds</p>
            </div>
        </div>
    );
}

export default Timer;
