import { createContext, useContext } from "react";
import create from "zustand";
import { EntriesProps } from "../@types/EntriesProps";

type EntryStore = {
  entriesExpense: EntriesProps[];
  setEntriesExpense: (entries: EntriesProps[]) => void;
};

const useEntryExpenseStore = create<EntryStore>((set) => ({
  entriesExpense: [],
  setEntriesExpense: (entries) => set({ entriesExpense: entries }),
}));

const EntryStoreContext = createContext(useEntryExpenseStore);

export const useEntryStoreContext = () => useContext(EntryStoreContext);

export const EntryStoreProvider = EntryStoreContext.Provider;

export default useEntryExpenseStore;
