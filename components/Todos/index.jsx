import React, { useEffect, createContext, useState } from "react";
export const TodoContext = createContext();
import { useTodos } from "@/lib/app/todos";

import Card from "./Card";
import Form from "./Form";
import Skelton from "./Skelton";

function index() {
    const { data, error } = useTodos();

    const [todos, setTodos] = useState(data);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);

    const contextData = {
        todos,
        setTodos,
    };

    useEffect(() => {
        if (!data) {
            setTodos([]);
        }
        if (data !== undefined && data.error !== "Not authenticated") {
            setTodos(data);
        }
    }, [data]);

    useEffect(() => {
        if (todos) {
            setCompletedTodos(todos.filter((todo) => todo.completed_at));
            setActiveTodos(todos.filter((todo) => !todo.completed_at));
        }
    }, [todos]);

    const handleFilter = (e) => {
        const filter = e.target.value;
        if (filter === "all") {
            setCompletedTodos(todos.filter((todo) => todo.completed_at));
            setActiveTodos(todos.filter((todo) => !todo.completed_at));
        } else if (filter === "active") {
            setActiveTodos(todos.filter((todo) => !todo.completed_at));
            setCompletedTodos([]);
        } else if (filter === "completed") {
            setCompletedTodos(todos.filter((todo) => todo.completed_at));
            setActiveTodos([]);
        }
    };

    if (error) return <div>failed to load</div>;
    if (!data) return <Skelton />;
    return (
        <TodoContext.Provider value={contextData}>
            <div className="my-10">
                <Form />
            </div>
            <div className="container-lg mx-auto shadow-md flex justify-between items-center gap-4 p-4 bg-white rounded-lg">
                <div>
                    <p>Filter</p>
                </div>
                <div>
                    <select
                        className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none"
                        onChange={handleFilter}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {todos.length === 0 && (
                <div className="text-center text-gray-500 my-6">
                    No todos yet
                </div>
            )}
            {activeTodos.length > 0 && (
                <div className="my-6">
                    <div className="flex flex-col gap-6">
                        {activeTodos.map((todo) => (
                            <Card key={todo._id} todo={todo} />
                        ))}
                    </div>
                </div>
            )}

            <div className="container-lg mx-auto">
                {activeTodos.length > 0 && completedTodos.length > 0 && (
                    <div className="w-full border border-gray-300 h-min"></div>
                )}
            </div>
            {completedTodos.length > 0 && (
                <div className="my-6">
                    <div className="flex flex-col gap-6">
                        {completedTodos.map((todo) => (
                            <Card key={todo._id} todo={todo} />
                        ))}
                    </div>
                </div>
            )}
        </TodoContext.Provider>
    );
}

export default index;
