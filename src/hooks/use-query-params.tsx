"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const createQueryString = useCallback(
        (params: { name: string; value: string }) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(params.name, params.value);

            return "?" + newParams.toString();
        },
        [searchParams],
    );

    const setSearchParams = useCallback(
        (params: { name: string; value: string }) => {
            const queryString = createQueryString(params);
            router.push(queryString);
        },
        [createQueryString, router],
    );

    return { createQueryString, searchParams, setSearchParams };
}
