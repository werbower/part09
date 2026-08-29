import express from 'express'
import { helloRouter } from './controllers/hello.controller.js'

console.log('hello world')

const app = express()
app.use('/hello', helloRouter)

const port = 3000
app.listen(port, ()=> {
  console.log(`listening http://localhost:${port}`)
})




