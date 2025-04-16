import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path) // Funciona para leer archivos json
// Tambien se puede
// import movies from './movies.json' with { type: 'json' }
