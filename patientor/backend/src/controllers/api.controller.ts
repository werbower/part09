import express, {type Request, type Response} from 'express'
import { diagnoses } from '../data/diagnoses.js'
import { patients, type Patient } from '../data/patients.js'


export const apiRouter = express.Router()

apiRouter.get('/diagnoses', (_req: Request, res: Response)=> {
  res.json(diagnoses)

})

const mapPatient = (x: Partial<Patient>)=> {
  const result = {...x}
  delete result.ssn
  return result
}

apiRouter.get('/patients', (_req: Request, res: Response)=> {
  const result = patients.map(x => mapPatient(x))
  res.json(result)
})