import axios from "axios"
import { Patient, PatientFormValues } from "../types"

import { apiBaseUrl } from "../constants"
import { Diagnose, Entry, EntryCreate, THealthCheckRating } from "./patients.models"


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


const createEntry = async (id: string, entry: EntryCreate)=> {
  if (entry.type === 'HealthCheck' && typeof entry.healthCheckRating === 'string' && 
    (entry.healthCheckRating as string).trim().length)
    entry.healthCheckRating = +entry.healthCheckRating as THealthCheckRating

  if (typeof entry.diagnosisCodes === 'string' && (entry.diagnosisCodes as string).trim().length) {
    entry.diagnosisCodes = (entry.diagnosisCodes as string).split(',') as string[]
  } else {
    delete entry.diagnosisCodes
  }
    
  
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
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
  getAll, create, getPatient, getDiagnoses, createEntry
}

export default patientService

