export const API_URL = process.env.ENV === 'local' ? process.env.API_URL : `${process.env.API_URL}/${process.env.STAGE}`
