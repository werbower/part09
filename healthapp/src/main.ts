import express from 'express'
import { firstRouter } from './controllers/first.controller.js'

export const app = express()
app.use(express.json())
app.use('/', firstRouter)


const port = 3000
const doStart = process.env.NODE_ENV !== 'localtest'

if (doStart) {
  app.listen(port, ()=> {
    console.log(`listening http://localhost:${port}`)
  })
}





