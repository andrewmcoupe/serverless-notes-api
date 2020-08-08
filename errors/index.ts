import createError from 'http-errors'

export const BadRequest = (errorMessage?: string) => {
  return new createError.BadRequest(errorMessage)
}

export const NotFound = (errorMessage?: string) => {
  return new createError.NotFound(errorMessage)
}
