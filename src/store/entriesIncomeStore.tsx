import { createContext, useContext } from "react";
import create from "zustand";
import { EntriesProps } from "../@types/EntriesProps";

type EntryStore = {
  entriesIncome: EntriesProps[];
  setEntriesIncome: (entries: EntriesProps[]) => void;
};

const useEntryIncomeStore = create<EntryStore>((set) => ({
  entriesIncome: [],
  setEntriesIncome: (entries) => set({ entriesIncome: entries }),
}));

const EntryStoreContext = createContext(useEntryIncomeStore);

export const useEntryStoreContext = () => useContext(EntryStoreContext);

export const EntryStoreProvider = EntryStoreContext.Provider;

export default useEntryIncomeStore;
