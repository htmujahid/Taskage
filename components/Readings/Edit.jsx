import React, { useEffect, useRef } from "react";
import { useSWRConfig } from "swr";
function Edit({ reading, card, setEditMode }) {
    const { mutate } = useSWRConfig();

    const titleInput = useRef();
    const authorInput = useRef();
    const startDateInput = useRef();
    const endDateInput = useRef();
    const statusInput = useRef();

    useEffect(() => {
        card.current.style.backgroundColor = reading.color;
    }, []);

    function handleClose() {
        setEditMode(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const title = titleInput.current.value;
        const author = authorInput.current.value;
        const start_date = startDateInput.current.value;
        const end_date = endDateInput.current.value;
        const status = statusInput.current.value;

        if (!title.trim() || !author.trim() || !status.trim()) {
            return;
        }
        await fetch(`/api/readings/${reading._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                author,
                start_date,
                end_date,
                status,
            }),
        });
        mutate("/api/readings");
        setEditMode(false);
    }

    return (
        <form
            className="h-96 w-72 rounded bg-white p-4 flex flex-col justify-between relative"
            ref={card}
            onSubmit={handleSubmit}
        >
            <div className="absolute right-2 top-2">
                <button className="block mb-2" onClick={handleClose}>
                    <img src={`./assets/icons/close.svg`} alt="" />
                </button>
                <button type="submit" className="block mb-2">
                    <img src={`./assets/icons/save.svg`} alt="" />
                </button>
            </div>
            <div>
                <input
                    type="text"
                    className="text-lg py-3 font-medium bg-inherit focus:outline-none"
                    defaultValue={reading.author}
                    ref={authorInput}
                    required
                />
                <input
                    type="text"
                    className="pb-3 text-2xl font-bold w-full bg-inherit focus:outline-none"
                    defaultValue={reading.title}
                    ref={titleInput}
                    required
                />
            </div>
            <div className="font-medium">
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        name="priority"
                        id="priority"
                        className="bg-inherit focus:outline-none"
                        defaultValue={reading.status}
                        ref={statusInput}
                        required
                    >
                        <option value="">Select a status</option>
                        <option value="To Read">To Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Have Read">Have Read</option>
                    </select>
                </div>
                <label htmlFor="start_date">Start Date: </label>
                <input
                    id="start_date"
                    type="date"
                    name="start_date"
                    className="bg-inherit focus:outline-none"
                    defaultValue={reading.start_date}
                    ref={startDateInput}
                />
                <label htmlFor="end_date">End Date: </label>
                <input
                    id="end_date"
                    type="date"
                    name="end_date"
                    className="bg-inherit focus:outline-none"
                    defaultValue={reading.end_date}
                    ref={endDateInput}
                />
            </div>
        </form>
    );
}

export default Edit;
