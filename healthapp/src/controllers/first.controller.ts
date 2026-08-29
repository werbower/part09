import express, { type Request, type Response } from 'express'
import { calculateBmi } from '../bmiCalculator.js'

const isNumber = (x: number|string|undefined)=> (typeof x === 'number') && (Number.isFinite(x))

export const firstRouter = express.Router()

firstRouter.get('/hello', (_req: Request, res: Response)=> {
  res.send('Hello Full Stack!')
})


firstRouter.get('/bmi', (req: Request, res: Response)=> {
  const height = +(req.query.height || 0)
  const mass = +(req.query.mass || 0)

  if (!isNumber(height) || !isNumber(mass)) {
    res.status(400).send({error: 'malformed parametrs'})
    return
  }
  
  const bmi = calculateBmi(height, mass)
  res.send({weight: mass, height, bmi})
})