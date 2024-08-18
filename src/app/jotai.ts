import { atom } from "jotai";
import { Recipe } from "./api/recipes/types";

export const recipesAtom = atom<Recipe[]>([]);
export const usernameAtom = atom("");
