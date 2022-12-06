import React, { useState, useRef, useEffect, useContext } from "react";
import { NoteContext } from "./index";

import { useSWRConfig } from "swr";
function Form() {
    const { setNotes } = useContext(NoteContext) ?? {};

    const [editMode, setEditMode] = useState(false);
    const noteInput = useRef();
    const card = useRef();
    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (editMode) {
            card.current.style.backgroundColor = generateRandomColor();
            card.current.style.rotate = generateRandomRotation();
        }
    }, [editMode]);

    const colors = [
        "#fecaca",
        "#fef08a",
        "#bbf7d0",
        "#a5f3fc",
        "#bfdbfe",
        "#e9d5ff",
        "#a5b4fc",
    ];

    function generateRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const rotations = ["1deg", "2deg", "3deg", "-1deg", "-2deg", "-3deg"];

    async function handleSubmit() {
        if (!noteInput.current.value.trim()) {
            handleDiscard();
            return;
        }

        const data = {
            note: noteInput.current.value,
            color: card.current.style.backgroundColor,
            rotate: card.current.style.rotate,
        };

        setNotes((prevNotes) => {
            return [...prevNotes, data];
        });

        noteInput.current.value = "";
        handleDiscard();

        await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                card.current.style.backgroundColor = "";
                card.current.style.rotate = "";
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                mutate("/api/notes");
            });
    }

    function generateRandomRotation() {
        return rotations[Math.floor(Math.random() * rotations.length)];
    }

    function handleAdd() {
        setEditMode(true);
    }

    function handleDiscard() {
        card.current.style.backgroundColor = "";
        card.current.style.rotate = "";
        setEditMode(false);
    }

    return (
        <React.Fragment>
            {editMode ? (
                <div
                    className="relative h-72 w-60 p-4 pt-6 shadow-lg"
                    ref={card}
                    onBlur={handleSubmit}
                >
                    <div className="absolute top-3 right-3">
                        <button onClick={handleDiscard}>X</button>
                    </div>
                    <textarea
                        className="text-lg font-medium bg-inherit focus:outline-none"
                        rows={9}
                        maxLength={160}
                        autoFocus
                        ref={noteInput}
                    ></textarea>
                </div>
            ) : (
                <div className="relative h-72 w-60 flex justify-center items-center">
                    <button
                        className="border-8 border-gray-400"
                        onClick={handleAdd}
                    >
                        <img
                            src="./assets/icons/add.svg"
                            alt=""
                            className="opacity-30 w-24"
                        />
                    </button>
                </div>
            )}
        </React.Fragment>
    );
}

export default Form;
