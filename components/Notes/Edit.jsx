import React, { useState, useRef, useEffect, useContext } from "react";
import { NoteContext } from "./index";

import { useSWRConfig } from "swr";
function Edit({ note, editMode, setEditMode }) {
    const { setNotes } = useContext(NoteContext) ?? {};

    const noteInput = useRef();
    const { mutate } = useSWRConfig();
    const card = useRef();

    useEffect(() => {
        card.current.style.backgroundColor = note.color;
        card.current.style.rotate = note.rotate;
    }, []);

    async function handleSubmit() {
        if (!noteInput.current.value.trim()) {
            setEditMode(false);
            mutate("/api/notes");
            return;
        }

        const data = {
            note: noteInput.current.value,
            color: note.color,
            rotate: note.rotate,
        };

        setNotes((prev) => {
            const newNotes = prev.map((n) => {
                if (n._id === note._id) {
                    return { ...n, ...data };
                }
                return n;
            });
            return newNotes;
        });

        noteInput.current.value = "";
        handleDiscard();

        await fetch(`/api/notes/${note._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                mutate("/api/notes");
            });
    }

    function handleDiscard() {
        setEditMode(false);
    }

    return (
        <div
            className="relative h-72 w-60 p-4 pt-6 shadow-lg "
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
                defaultValue={note.note}
                ref={noteInput}
            ></textarea>
        </div>
    );
}

export default Edit;
