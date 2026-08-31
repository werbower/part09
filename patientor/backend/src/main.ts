import express  from 'express'
import { mainRouter } from './controllers/main.controller.js'

export const app = express()
app.use(express.json())
app.use('/api', mainRouter)

const port = 3001
app.listen(port, ()=> {
    console.log(`listening at http://localhost:${port}`)
})
