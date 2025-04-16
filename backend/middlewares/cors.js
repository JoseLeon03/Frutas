import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
  'https://myapp.com',
  'null'
]

export const corsMiddelware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => { // origin es el origen de la peticion
    if (acceptedOrigins.includes(origin) || !origin) { // Si el origen esta en la lista de origenes aceptados o si no hay origen
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
})
