import express, { json } from 'express'
import { createFruitRouter } from './routes/fruits.js'
import { corsMiddelware } from './middlewares/cors.js'

export const createApp = ({ fruitModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? 3000
  app.disable('x-powered-by')
  app.use(corsMiddelware()) // Middleware para permitir el acceso a la api desde el origen permitido
  app.use(json()) // Middleware para parsear el body de las peticiones a json

  app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
  })

  // Aqui estamos montando el router de movies en la ruta /movies
  // En lugar de tener todas las rutas en el mismo archivo, las estamos modularizando
  // Esto nos permite tener un codigo mas limpio y organizado
  app.use('/fruits', createFruitRouter({ fruitModel }))

  app.use((req, res) => { // Debe estar de ultimo
    res.status(404).send('<h1>404</h1>')
  })
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
