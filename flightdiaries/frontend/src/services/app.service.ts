import * as zu from 'zustand'

export interface DiaryData {
  id: number
  date: string
  weather: string
  visibility: string
  comment: string
}

export interface AppState {
  diagies: DiaryData[]
  setDiaries: (items: DiaryData[])=> void
}

export const useAppStore = zu.create<AppState>()((set)=> {
  return{
    diagies: [],
    setDiaries: (diagies: DiaryData[])=> {
      set(()=> {
        return {diagies}
      })
    }
  }
})