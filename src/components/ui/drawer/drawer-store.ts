import { create } from "zustand";

import type { Maybe, Product } from "@/types";

type DrawerStore = {
    data: Maybe<Product>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOpen: (data: Product) => void;
    onClose: () => void;
};

export const useDrawer = create<DrawerStore>()((set) => ({
    data: null,
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen: isOpen }),
    onOpen: (data) => set({ data: data, isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
