import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import path from 'path'
import route from './routes'

config()

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(route)

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => {
  console.log(` 🍅 Api Running on ${PORT}`)
})

export default app
