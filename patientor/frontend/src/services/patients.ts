import axios from "axios"
import { Patient, PatientFormValues } from "../types"

import { apiBaseUrl } from "../constants"
import { Diagnose } from "./patients.models"

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  )

  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  )

  return data
}

const getPatient = async (id: string)=> {
  const result = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
  return result.data
}

const getDiagnoses = async ()=> {
  const result = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`)
  return result.data
}


export const patientService = {
  getAll, create, getPatient, getDiagnoses
}

export default patientService

