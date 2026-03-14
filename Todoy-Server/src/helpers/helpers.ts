type ValidationError = {
  expected?: string
  received: string
}

export const keyValidationErrors = <T extends Record<string, any>>(
  obj: Record<string, unknown>,
  model: T
): false | Record<string, ValidationError> => {
  const errors: Record<string, ValidationError> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (!(key in model)) {
      errors[key] = { received: typeof value }
      continue
    }

    const expected = typeof model[key as keyof T]
    const received = typeof value

    if (received !== expected) {
      errors[key] = { expected, received }
    }
  }

  return Object.keys(errors).length === 0 ? false : errors
}
