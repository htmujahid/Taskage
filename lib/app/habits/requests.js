import { useSWRConfig } from "swr";

export async function createHabit(data) {
    const res = await fetch("/api/habits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateHabit(id, data) {
    const res = await fetch(`/api/habits/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateHabitStatus(id, data) {
    const res = await fetch(`/api/habits/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteHabit(id) {
    const res = await fetch(`/api/habits/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
