export const apiURL = () => {
  if (process.env.APP_ENV === 'local') {
    return 'http://localhost:5000'
  } else {
    return 'http://localhost:5000'
  }
}