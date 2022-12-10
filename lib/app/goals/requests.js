import { useSWRConfig } from "swr";

export async function createGoal(data) {
    const res = await fetch("/api/goals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateGoal(id, data) {
    const res = await fetch(`/api/goals/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateGoalStatus(id, data) {
    const res = await fetch(`/api/goals/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteGoal(id) {
    const res = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
