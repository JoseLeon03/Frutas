import z from 'zod'

const fruitSchema = z.object({ // Creamos un esquema para validar los datos que nos envia el usuario
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }),
})

export function validateFruit (object) {
  return fruitSchema.safeParse(object) // Usamos el metodo safeParse para validar los datos que nos envia el usuario
}

export function validatePartialMovie (object) {
  return fruitSchema.partial().safeParse(object) // Usamos el metodo partial para validar solo los campos que nos envia el usuario
  // Si la propiedad esta validala, si no, ignorala
}
