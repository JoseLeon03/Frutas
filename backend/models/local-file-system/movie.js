import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const movies = readJSON('./movies.json')

// Este modelo nos permite extraer la logica de negocio de las rutas
// Se encarga de saber como tratar los datos
// Este modelo necesita estar separado de las rutas
export class MovieModel {
  static getALL = async ({ genre }) => { // Este metodo es para obtener todas las peliculas
    if (genre) {
      const filteredMovies = movies.filter(
        // movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        movie => Array.isArray(movie.genre) && movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
      return filteredMovies
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    if (movie) return movie
  }

  static async create (input) {
    // Asi actualizamos la base de datos
    const newMovie = { // Para crear la id usamos node: crypto porque es una libreria que viene con node
      id: randomUUID(), // Creamos un id unico
      ...input // Si hemos validado los datos, podemos usar result.data para obtener los datos validados
    }

    movies.push(newMovie) // Agregamos la pelicula a la lista de peliculas
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id) // Buscamos la pelicula por el id
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1) // Eliminamos la pelicula de la lista de peliculas
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id) // Buscamos la pelicula por el id
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }
    return movies[movieIndex]
  }
}
