import React, { createContext, useEffect, useState } from "react";
import ListComponent from "./List";
export const WorkspaceContext = createContext();

import { useTasks } from "@/lib/app/workspace/tasks";
import AddList from "./AddList";
import { useLists } from "@/lib/app/workspace/lists";
function index() {
    const { data: tasksData, error: tasksError } = useTasks();
    const { data: listsData, error: listsError } = useLists();

    const [lists, setLists] = useState([]);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (typeof listsData !== "undefined") setLists(listsData);
    }, [listsData]);

    useEffect(() => {
        if (typeof tasksData !== "undefined") setCards(tasksData);
    }, [tasksData]);

    if (tasksError) return <div>Failed to load</div>;
    if (!tasksData) return <div>Loading...</div>;

    const contextData = {
        cards,
        setCards,
    };

    return (
        <WorkspaceContext.Provider value={contextData}>
            <div className="flex gap-x-4 m-8">
                {lists.map((list) => (
                    <ListComponent key={list._id} list={list} />
                ))}
                <AddList />
            </div>
        </WorkspaceContext.Provider>
    );
}

export default index;
