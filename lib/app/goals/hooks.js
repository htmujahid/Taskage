import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useGoals() {
    return useSWR("/api/goals", fetcher);
}
