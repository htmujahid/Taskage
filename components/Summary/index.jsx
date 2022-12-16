import React from "react";
import TodoCard from "./TodoCard";
import CalendarCard from "./CalendarCard";
import HabitCard from "./HabitCard";
import GoalCard from "./GoalCard";
import StickyCard from "./StickyCard";
import NoteCard from "./NoteCard";
import useSWR from "swr";
import Skelton from "./Skelton";
const fetcher = (url) => fetch(url).then((res) => res.json());
function index() {
    const { data, error } = useSWR("/api/summary", fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <Skelton />;
    return (
        <div className="my-6">
            <div className="grid grid-cols-1 gap-4 container-lg mx-auto">
                <TodoCard count={data.todoCount} />
                <StickyCard count={data.noteCount} />
                <NoteCard count={data.readingCount} />
                <CalendarCard count={data.schedulerCount} />
            </div>
        </div>
    );
}

export default index;
