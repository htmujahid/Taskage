import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import Edit from "./Edit";
import CardLoading from "../Common/CardLoading";

function Card({ reading }) {
    const card = useRef();
    const [editMode, setEditMode] = useState(false);
    const [isCardLoading, setIsCardLoading] = useState(false);

    useEffect(() => {
        card.current.style.backgroundColor = reading.color;
    }, [editMode]);

    return (
        <div>
            {!editMode ? (
                <div
                    className="h-96 w-72 rounded bg-white p-4 flex flex-col justify-between relative"
                    ref={card}
                >
                    <div className="absolute right-2 top-2">
                        <Controls
                            _id={reading._id}
                            setEditMode={setEditMode}
                            setIsCardLoading={setIsCardLoading}
                        />
                    </div>
                    {isCardLoading && <CardLoading />}
                    <div>
                        <p className="text-lg py-3 font-medium">
                            {reading.author}
                        </p>
                        <h4 className="pb-3 text-2xl font-bold text-wrap">
                            {reading.title}
                        </h4>
                    </div>
                    <div className="font-medium">
                        <p className="">Status: {reading.status}</p>
                        <p className="">Started: {reading.start_date}</p>
                        <p className="">Completion: {reading.end_date}</p>
                    </div>
                </div>
            ) : (
                <Edit reading={reading} card={card} setEditMode={setEditMode} />
            )}
        </div>
    );
}

export default Card;
