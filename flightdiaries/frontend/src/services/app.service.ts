import * as zu from 'zustand'

export interface DiaryData {
  id: number
  date: string
  weather: string
  visibility: string
  comment: string
}

export interface AppState {
  notiMessage: string[]|undefined
  diagies: DiaryData[]
  setDiaries: (items: DiaryData[])=> void
  setNotiMessage: (message: string[]|undefined)=> void
}

export const useAppStore = zu.create<AppState>()((set)=> {
  return{
    diagies: [],
    notiMessage: undefined,
    setDiaries: (diagies: DiaryData[])=> {
      set(()=> {
        return {diagies}
      })
    },
    setNotiMessage: (notiMessage?: string[]|undefined)=> {
      set(()=> {
        return {notiMessage}
      })
    }
  }
})

let timerRef: number|undefined = undefined
const timerVal = 3000
const timerReset = ()=> {
  if (timerRef) {
    clearTimeout(timerRef)
    useAppStore.getState().setNotiMessage(undefined)
  }
}

export const showNoti = (message: string[]|undefined)=> {
  timerReset()
  useAppStore.getState().setNotiMessage(message)
  timerRef = setTimeout(()=> timerReset(), timerVal)
}