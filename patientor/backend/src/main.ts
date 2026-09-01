import express  from 'express'
import { mainRouter } from './controllers/main.controller.js'
import { apiRouter } from './controllers/api.controller.js'

export const app = express()
app.use(express.json())
app.use('/api', mainRouter)
app.use('/api', apiRouter)


const port = 3001
app.listen(port, ()=> {
  console.log(`listening at http://localhost:${port}`)
})
