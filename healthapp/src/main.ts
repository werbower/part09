import express from 'express'
import { firstRouter } from './controllers/first.controller.js'

console.log('hello world')

const app = express()
app.use(express.json())
app.use('/', firstRouter)

const port = 3000
app.listen(port, ()=> {
  console.log(`listening http://localhost:${port}`)
})




