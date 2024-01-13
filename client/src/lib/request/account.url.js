import { apiURL } from "../apiURL";

export const signinURL = () => (
  { url: `${apiURL()}/account/signin` }
)

export const signupURL = () => (
  { url: `${apiURL()}/account/signup` }
)

export const getAccountDetailsURL = () => (
  { url: `${apiURL()}/account/getAccountDetails` }
)