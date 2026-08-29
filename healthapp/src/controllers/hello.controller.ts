import express, { type Request, type Response } from 'express'

export const helloRouter = express.Router()

helloRouter.get('/', (_req: Request, res: Response)=> {
  res.send('Hello Full Stack!')
})