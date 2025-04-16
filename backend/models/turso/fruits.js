import { createClient } from '@libsql/client'
import dotenv from 'dotenv'


dotenv.config()

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})


export class FruitModel {
  static async getALL () {
    const fruits = await db.execute(
      'SELECT  id, name FROM fruits')
    return fruits.rows
  }


  static async create ({ input }) {
    const { name } = input;

    // Check if the fruit already exists
    const validation = await db.execute(
      `SELECT * FROM fruits WHERE name = ?`,
      [name]
    );

    if (validation.rows.length > 0) {
      return { success: false, message: 'Fruit already exists' }; // Response for frontend
    }

    try {
      // Insert the new fruit
      await db.execute(
        `INSERT INTO fruits (name) VALUES (?)`,
        [name]
      );
    } catch (e) {
      // Hide internal error details from the user
      throw new Error('Error creating fruit');
    }

    return { success: true, message: 'Fruit created successfully', data: { ...input } }; // Success response for frontend
  }

  // static async delete ({ id }) {
  //   const [result] = await connection.query(
  //     'Delete from movie where id = UUID_TO_BIN(?)',
  //     [id]
  //   )
  //   return (result)
  // }

  // static async update ({ id, input }) {
  //   const {
  //     // genre: genreInput, // Genre es un array de strings
  //     title,
  //     year,
  //     duration,
  //     director,
  //     rate,
  //     poster
  //   } = input

  //   const [movie] = await connection.query(`
  //       Select * from movie where id = UUID_TO_BIN(?)`,
  //   [id])

  //   if (movie.length === 0) return null

  //   // Update the movie
  //   await connection.query(
  //     `UPDATE movie SET title = ?, year = ?, duration = ?, director = ?, rate = ?, poster = ?
  //     WHERE id = UUID_TO_BIN(?)`,
  //     [title, year, duration, director, rate, poster, id]
  //   )

  //   // // Delete existing genres for the movie
  //   // await connection.query(
  //   //   'DELETE FROM movies_genre WHERE movie_id = UUID_TO_BIN(?)',
  //   //   [id]
  //   // )

  //   // // Insert new genres for the movie
  //   // for (const genre of genreInput) {
  //   //   const [genreResult] = await connection.query(
  //   //     'SELECT id FROM genre WHERE LOWER(name) = ?',
  //   //     [genre.toLowerCase()]
  //   //   )

  //   //   let genreId
  //   //   if (genreResult.length === 0) {
  //   //     const [insertGenreResult] = await connection.query(
  //   //       'INSERT INTO genre (name) VALUES (?)',
  //   //       [genre]
  //   //     )
  //   //     genreId = insertGenreResult.insertId
  //   //   } else {
  //   //     genreId = genreResult[0].id
  //   //   }

  //   //   await connection.query(
  //   //     'INSERT INTO movies_genre (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)',
  //   //     [id, genreId]
  //   //   )
  //   // }

  //   return { id, ...input }
  // }
}
