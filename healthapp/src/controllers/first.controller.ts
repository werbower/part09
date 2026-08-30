import express, { type Request, type Response } from 'express'
import { calculateBmi } from '../bmiCalculator.js'
import { calculateExercises } from '../exerciseCalculator.js'

const isNumber = (x: number|string|undefined)=> (typeof x === 'number') && (Number.isFinite(x))
const isPositiveNumber = (x: number|string|undefined)=> isNumber(x) && (x as number) > 0

export const firstRouter = express.Router()

firstRouter.get('/hello', (_req: Request, res: Response)=> {
  res.send('Hello Full Stack!')
})


firstRouter.get('/bmi', (req: Request, res: Response)=> {
  const height = +(req.query.height || 0)
  const mass = +(req.query.mass || 0)

  if (!isPositiveNumber(height) || !isPositiveNumber(mass)) {
    res.status(400).send({error: 'malformatted parameters'})
    return
  }
  
  const bmi = calculateBmi(height, mass)
  res.send({weight: mass, height, bmi})
})

export type TExercise = { daily_exercises: number[], target: number }

firstRouter.post('/exercises', (req: Request, res: Response)=> {
  const {daily_exercises, target} = req.body as TExercise

  if (!isPositiveNumber(target) || !Array.isArray(daily_exercises) || 
  daily_exercises.some(x => !isPositiveNumber(x))) {
    res.status(400).send({error: 'malformatted parameters'})
    return
  }
  
  const result = calculateExercises(daily_exercises, target)
  res.send(result)

})