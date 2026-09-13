import express, {type NextFunction, type Request, type Response} from 'express'
import { diagnoses } from '../data/diagnoses.js'
import { createPatientValidation, patients, type TPatienCreate, type Patient, createPatient, entryCreateZod, type EntryCreate, createEntry } from '../data/patients.js'
import * as z from 'zod'


export const apiRouter = express.Router()

apiRouter.get('/diagnoses', (_req: Request, res: Response)=> {
  res.json(diagnoses)

})

const mapPatient = (x: Partial<Patient>)=> {
  const result = {...x}
  delete result.ssn
  delete result.entries
  return result
}

apiRouter.get('/patients', (_req: Request, res: Response)=> {
  const result = patients.map(x => mapPatient(x))
  res.json(result)
})

apiRouter.get('/patients/:id', (req: Request, res: Response)=> {
  const {id} = req.params
  const result = patients.find(x=> x.id === id)

  if (!result){
    res.status(404)
    res.json({message: 'not found patient'})
    return
  }
    
  res.json(result)
})

apiRouter.post('/patients', (req: Request, res: Response)=> {
  const dataPatient = createPatientValidation.parse(req.body) as TPatienCreate
  const newPatient = createPatient(dataPatient)
  
  res.json(newPatient)
})

apiRouter.post('/patients/:id/entries', (req: Request, res: Response)=> {
  const {id}= req.params
  
  const dataEntry: EntryCreate = entryCreateZod.parse(req.body)
  const newEntry = createEntry(id as string, dataEntry)
  res.json(newEntry)
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

