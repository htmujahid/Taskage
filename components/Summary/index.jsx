import React from "react";
import TodoCard from "./TodoCard";
import SchedulerCard from "./SchedulerCard";
import HabitCard from "./HabitCard";
import GoalCard from "./GoalCard";
import NoteCard from "./NoteCard";
import ReadingCard from "./ReadingCard";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
function index() {
    const { data, error } = useSWR("/api/summary", fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    return (
        <div className="my-6">
            <div className="grid grid-cols-1 gap-4 container-lg mx-auto">
                <TodoCard count={data.todoCount} />
                <SchedulerCard count={data.schedulerCount} />
                <HabitCard count={data.habitCount} />
                <GoalCard count={data.goalCount} />
                <NoteCard count={data.noteCount} />
                <ReadingCard count={data.readingCount} />
            </div>
        </div>
    );
}

export default index;
