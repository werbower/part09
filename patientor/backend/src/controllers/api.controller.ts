import express, {type NextFunction, type Request, type Response} from 'express'
import { diagnoses } from '../data/diagnoses.js'
import { createPatientValidation, patients, type TPatienCreate, type Patient, createPatient } from '../data/patients.js'
import * as z from 'zod'


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

apiRouter.post('/patients', (req: Request, res: Response)=> {
  const dataPatient = createPatientValidation.parse(req.body) as TPatienCreate
  const newPatient = createPatient(dataPatient)
  
  res.json(newPatient)
})

const errHandler = (err: Error, _req: Request, res: Response, next: NextFunction)=> {
  if (res.headersSent) return next(err)

  if (err instanceof z.ZodError) {
    res.status(400)
    res.json(err.issues)
    return
  }
  res.status(500)
  res.json({err: err.message || err})
}

apiRouter.use(errHandler)

