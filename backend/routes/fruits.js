import { Router } from 'express' // Permite crear rutas  y responder a peticiones
import { FruitController } from '../controllers/fruits.js'

export const createFruitRouter = ({ fruitModel }) => {
  const fruitsRouter = Router() // Creamos una instancia de Router

  const fruitController = new FruitController({ fruitModel })

  fruitsRouter.get('/', fruitController.getAll)
  // moviesRouter.get('/:id', movieController.getById)
  fruitsRouter.post('/', fruitController.create)
  // moviesRouter.delete('/:id', movieController.delete)
  // moviesRouter.patch('/:id', movieController.update)

  return fruitsRouter
}
