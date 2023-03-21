import {create} from 'zustand'

interface CurrentMonthStore {
  currentDay: number
  currentMonth: number
  currentYear:  number
  setCurrentDay: (currentDay: number) => void
  setCurrentMonth: (currentMonh: number) => void
  setCurrentYear: (currentYear: number) => void
} 

export const useCurrentMonthStore = create<CurrentMonthStore>((set) => ({
  currentDay: (new Date().getDate()),
  setCurrentDay: (currentDay) => set({currentDay}),
  currentMonth: (new Date().getMonth()),
  setCurrentMonth: (currentMonth) => set({currentMonth}),
  currentYear: (new Date().getFullYear()),
  setCurrentYear: (currentYear) => set({currentYear})
}))




