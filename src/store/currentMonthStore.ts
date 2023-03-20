import {create} from 'zustand'

interface CurrentMonthStore {
  currentMonth: number
  currentYear:  number
  setCurrentMonth: (currentMonh: number) => void
  setCurrentYear: (currentYear: number) => void
} 

export const useCurrentMonthStore = create<CurrentMonthStore>((set) => ({
  currentMonth: (new Date().getMonth()),
  setCurrentMonth: (currentMonth) => set({currentMonth}),
  currentYear: (new Date().getFullYear()),
  setCurrentYear: (currentYear) => set({currentYear})
}))




