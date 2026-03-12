import express, { Application, Request, Response } from 'express'
import routes from '../local-server/routes'
import cors from 'cors'

const app: Application = express()
const PORT: number = Number(process.env.PORT) || 3030

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Express server running'
  })
})

app.use('/', routes)

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found'
  })
})

app.use((err: Error, _req: Request, res: Response): void => {
  console.error(err)

  res.status(500).json({
    error: 'Internal Server Error'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

export default app
