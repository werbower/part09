import { createContext } from "react"

type TDetailsContext = {fetchPatient: (()=> void)|undefined}
export const DetailsContext = createContext<TDetailsContext>({fetchPatient: undefined})