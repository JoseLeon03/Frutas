import { validateFruit, validatePartialMovie } from '../schemas/fruits.js'

// Aca el controlador
export class FruitController {
  constructor ({ fruitModel }) {
    this.fruitModel = fruitModel
  }

  getAll = async (req, res) => { // Este metodo es para obtener todas las peliculas
    // Al usar async colocamos todo en un try catch pero es mejor llevarlo en middleware
    // const { genre } = req.query
    // const movies = await this.fruitModel.getALL({ genre }) // Obtenemos todas las peliculas
    const fruits = await this.fruitModel.getALL() // Obtenemos todas las peliculas

    // que es lo que renderiza
    res.json(fruits)
  }

  // getById = async (req, res) => { // Este metodo es para obtener una pelicula por su id
  //   const { id } = req.params // aqui obtenemos el id de la pelicula
  //   const movie = await this.movieModel.getById({ id })
  //   if (movie) return res.json(movie)
  //   return res.status(404).json({ message: 'Movie not found' })
  // }

  create = async (req, res) => { // Movies porque es el recurso que estamos creando
    const result = validateFruit(req.body) // Validamos los datos que nos envia el usuario
    if (result.error) { // Si no es exitoso
      return res.status(400).json({ // Respondemos con un status 400
        errors: result.error.errors // Y los errores que ocurrieron
      })
    }
    const newFruit = await this.fruitModel.create({ input: result.data }) //
    res.status(201).json(newFruit) // Respondemos con la pelicula creada
  }

  // delete = async (req, res) => { // Este metodo es para eliminar una pelicula
  //   const { id } = req.params
  //   const result = await this.movieModel.delete({ id })
  //   if (result === false) {
  //     return res.status(404).json({ message: 'Movie not found' })
  //   }
  //   return res.status(204).json({ message: 'Movie deleted' }) // Respondemos con un status 204
  // }

  // update = async (req, res) => { // Este metodo es para actualizar una pelicula
  //   const result = validatePartialMovie(req.body) // Validamos los datos que nos envia el usuario

  //   if (!result.success) {
  //     return res.status(400).json({ errors: JSON.parse(result.error.errors) })
  //   }
  //   const { id } = req.params
  //   const updatedMovie = await this.movieModel.update({ id, input: result.data })

  //   return res.json(updatedMovie) // Respondemos con la pelicula actualizada
  // }
}
