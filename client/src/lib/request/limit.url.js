import { apiURL } from "../apiURL";

export const getLimitURL = () => (
  { url: `${apiURL()}/limit/getLimit` }
)

export const setLimitURL = () => (
  { url: `${apiURL()}/limit/setLimit` }
)
