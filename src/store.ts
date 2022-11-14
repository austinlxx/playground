import create from "zustand";
import { StoreType } from "./types/store";

export const tempStore = create<StoreType["tempStore"]>((set, get) => ({
	foo: {},
	setFoo: (x) => set(() => ({ foo: x })),
}));
