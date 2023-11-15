"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getFeaturedItems, getHero, type FeaturedItems, type Hero } from "./faker-functions";

type FakerStore = {
    hero: Hero;
    setHero: () => void;
    featuredItems: FeaturedItems;
    setFeaturedItems: () => void;
};

export const useFaker = create(
    persist<FakerStore>(
        (set, get) => ({
            hero: {} as Hero,
            setHero: () => {
                if (isSessionStorageAvailable()) {
                    const hero = get().hero;
                    if (isNotEmptyObject(hero)) return;
                    set({ hero: getHero() });
                }
            },

            featuredItems: {} as FeaturedItems,
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
