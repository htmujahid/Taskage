import React, { useContext, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { WorkspaceContext } from "./index";
import TaskOptions from "./TaskOptions";

import EditTask from "./EditTask";

function Task({ card }) {
    const { mutate } = useSWRConfig();
    const { setCards } = useContext(WorkspaceContext);
    const [cardList, setCardList] = useState(card.list_id);
    const [isOptions, setIsOptions] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    async function handleDragStart(e) {
        e.dataTransfer.setData("text/plain", card._id);

        // setCards((prev) => {
        //     const newCards = prev.map((c) => {
        //         if (c._id == card._id) {
        //             setCardList(null);
        //             return {
        //                 ...c,
        //                 list_id: null,
        //             };
        //         }
        //         return c;
        //     });
        //     return newCards;
        // });
    }

    return (
        <React.Fragment>
            {!isEditMode ? (
                <div
                    className="relative w-full hover:shadow-lg border-t hover:border-gray-100 border-gray-50 cursor-pointer p-2"
                    draggable
                    onDragStart={handleDragStart}
                    onMouseDown={(e) => {
                        e.target.classList.add("rounded-lg");
                    }}
                    onMouseUp={(e) => {
                        e.target.classList.remove("rounded-lg");
                    }}
                    onDragEnd={(e) => {
                        e.target.classList.remove("rounded-lg");
                    }}
                >
                    <div className="absolute">
                        <input
                            type="checkbox"
                            name="status"
                            id="status"
                            className="rounded-full"
                        />
                    </div>

                    <div className="absolute right-3">
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
                        <div
                            id="task-options"
                            className="absolute right-0 top-0 translate-x-full z-10"
                        >
                            <TaskOptions
                                card={card}
                                setIsEditMode={setIsEditMode}
                                setIsOptions={setIsOptions}
                            />
                        </div>
                    )}

                    <div className="mx-6" onClick={() => setIsEditMode(true)}>
                        <p className="">{card.title}</p>
                        <p className="text-xs">{card.description}</p>
                        <div className="pt-2">
                            <p className="text-blue-500 text-xs border border-blue-500 rounded-xl w-fit px-1 py-0.5">
                                {new Date(card.date).toDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <EditTask card={card} setIsEditMode={setIsEditMode} />
            )}
        </React.Fragment>
    );
}

export default Task;
