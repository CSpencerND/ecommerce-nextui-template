import { useEffect, useState } from "react";

export function useHydrated() {
    const [isHydrated, setHydrated] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHydrated(true);
        }
    }, []);

    return isHydrated;
}
