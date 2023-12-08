"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryString(name: string, value = "") {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    const queryString = params.toString();
    const newPathname = `${pathname}?${queryString}`;

    const updatePathname = () => {
        router.push(newPathname);
    };

    return { updatePathname };
}
