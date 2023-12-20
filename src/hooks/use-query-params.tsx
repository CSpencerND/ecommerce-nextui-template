"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (params: { name: string; value: string }) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(params.name, params.value);

            return "?" + newParams.toString();
        },
        [searchParams],
    );

    const setSearchParams = useCallback(
        (params: { name: string; value: string } | null) => {
            if (!params) {
                return window.history.replaceState(null, "", null);
            }

            const queryString = createQueryString(params);
            window.history.replaceState(null, "", queryString);
        },
        [createQueryString],
    );

    return { createQueryString, searchParams, setSearchParams };
}
