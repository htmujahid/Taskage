import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useReadings() {
    return useSWR("/api/readings", fetcher);
}
