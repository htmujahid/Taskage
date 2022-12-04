import React, { useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";
function Edit({ reading, card, setEditMode }) {
    const { mutate } = useSWRConfig();

    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
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
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
                mutate("/api/readings");
                setEditMode(false);
            });
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
                {!isLoading ? (
                    <button type="submit" className="block mb-2">
                        <img src={`./assets/icons/save.svg`} alt="" />
                    </button>
                ) : (
                    <span className="">
                        <svg
                            role="status"
                            className="inline w-5 h-5 text-white animate-spin"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    </span>
                )}
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
