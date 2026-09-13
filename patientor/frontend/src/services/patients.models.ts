
export type Diagnose = {code: string , name: string, latin?: string}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[]|Diagnose[];
}

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const

export type THealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating]


export const entryTypes: Array<{type: EntryType, descr: string}> = [
  {type: 'HealthCheck', descr: 'Health Check'},
  {type: 'Hospital', descr: 'Hospital'},
  {type: 'OccupationalHealthcare', descr: 'Occupational Healthcare'}] as const

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: THealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export type EntryType = Entry['type']

type DistributiveOmit<T, K extends keyof T> = T extends any? Omit<T, K>: never
export type EntryCreate = DistributiveOmit<Entry, 'id'>




  

 
