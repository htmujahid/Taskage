import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useHabits() {
    return useSWR("/api/habits", fetcher);
}
