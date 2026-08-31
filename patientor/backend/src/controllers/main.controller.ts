import express, {type Request, type Response} from 'express'


export const mainRouter = express.Router()


mainRouter.get('/ping', (_req: Request, res: Response)=> {
  res.send('pong')
})
