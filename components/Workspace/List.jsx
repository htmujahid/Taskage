import React, { useContext, useEffect, useState } from "react";
import TaskComponent from "./Task";
import AddTask from "./AddTask";
import { useSWRConfig } from "swr";

import { WorkspaceContext } from "./index";

import { updateTaskList } from "@/lib/app/workspace/tasks/requests";
import AddList from "./AddList";
import EditList from "./EditList";
import ListOptions from "@/components/Workspace/ListOptions";

function List({ list }) {
    const [boradCards, setBoardCards] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isOptions, setIsOptions] = useState(false);

    const { mutate } = useSWRConfig();

    const { cards, setCards } = useContext(WorkspaceContext);

    useEffect(() => {
        const filteredCards = cards.filter((card) => card.list_id === list._id);
        setBoardCards(filteredCards);
    }, [cards]);

    async function handleDrop(e) {
        const cardId = e.dataTransfer.getData("text/plain");

        const data = {
            list_id: list._id,
        };

        console.log(data);
        await updateTaskList(cardId, data);
        mutate("/api/workspace/tasks");
    }

    function handleDragOver(e) {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("text/plain");

        setCards((prev) => {
            const newCards = prev.map((c) => {
                if (c._id === cardId) {
                    return {
                        ...c,
                        listId: list.id,
                    };
                }
                return c;
            });
            return newCards;
        });
    }

    return (
        <div
            className="bg-white w-72 h-fit rounded-lg shadow shrink-0 relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="flex justify-between items-center border-b p-2">
                {!isEditMode ? (
                    <h3
                        className="text-lg font-semibold flex-1"
                        onClick={() => setIsEditMode(true)}
                    >
                        {list.title}
                    </h3>
                ) : (
                    <EditList list={list} setIsEditMode={setIsEditMode} />
                )}
                <button
                    onClick={() => {
                        setIsOptions(!isOptions);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                    >
                        <path d="M12 20q-.825 0-1.412-.587Q10 18.825 10 18q0-.825.588-1.413Q11.175 16 12 16t1.413.587Q14 17.175 14 18q0 .825-.587 1.413Q12.825 20 12 20Zm0-6q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587Q14 11.175 14 12q0 .825-.587 1.412Q12.825 14 12 14Zm0-6q-.825 0-1.412-.588Q10 6.825 10 6t.588-1.412Q11.175 4 12 4t1.413.588Q14 5.175 14 6t-.587 1.412Q12.825 8 12 8Z" />
                    </svg>
                </button>
            </div>
            {isOptions && (
                <div className="absolute top-0 right-0 translate-x-full z-10">
                    <ListOptions
                        list={list}
                        setIsEditMode={setIsEditMode}
                        setIsOptions={setIsOptions}
                    />
                </div>
            )}
            <div>
                <AddTask listId={list._id} />
            </div>
            <div className="flex flex-col gap-y-2 pb-2">
                {boradCards.map((card) => (
                    <TaskComponent key={card._id} card={card} />
                ))}
            </div>
        </div>
    );
}

export default List;
