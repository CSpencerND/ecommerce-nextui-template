// TODO: Delete this file

"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getFeaturedItems, getHero, type FeaturedData, type HeroData } from "./faker-functions";

type FakerStore = {
    hero: HeroData;
    setHero: () => void;
    featuredItems: FeaturedData;
    setFeaturedItems: () => void;
};

/**
 * @deprecated Fetch from api instead
 */
export const useFaker = create(
    persist<FakerStore>(
        (set, get) => ({
            hero: {} as HeroData,
            setHero: () => {
                if (isSessionStorageAvailable()) {
                    const hero = get().hero;
                    if (isNotEmptyObject(hero)) return;
                    set({ hero: getHero() });
                }
            },

            featuredItems: {} as FeaturedData,
            setFeaturedItems: () => {
                if (isSessionStorageAvailable()) {
                    const featuredItems = get().featuredItems;
                    if (isNotEmptyObject(featuredItems)) return;
                    set({ featuredItems: getFeaturedItems() });
                }
            },
        }),
        {
            name: "faker-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

function isNotEmptyObject(obj: {}) {
    return Object.keys(obj).length > 0;
}

function isSessionStorageAvailable() {
    return typeof window !== "undefined" && window.sessionStorage;
}
