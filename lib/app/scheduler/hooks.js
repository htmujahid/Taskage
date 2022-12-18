import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useSchedulers() {
    return useSWR("/api/scheduler", fetcher);
}
