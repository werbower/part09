import * as zu from 'zustand'
import { Diagnose } from './patients.models'

export interface AppState  {
    diagnoses?: Diagnose[]
    setDiagnoses: (x: Diagnose[])=> void
}


export const useAppStore = zu.create<AppState>()((set)=> {
    return {
        diagnoses: [],
        setDiagnoses: (diagnoses?: Diagnose[])=> {
            set(()=> {
                return {diagnoses}
            })
        }
    }
})