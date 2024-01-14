import { setLimitService, getLimitService } from "../service/limit.service.js";
import dataJSON from "../utilities/dataJSON.js";

// DESC     Set expense limit
// Route    POST /setLimit
const setLimit = async (req, res, next) => {
  try {
    const { status, description, message, data } = await setLimitService(req.headers, req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

// DESC     get expense limit
// Route    GET /getLimit
const getLimit = async (req, res, next) => {
  try {
    const { status, description, message, data } = await getLimitService(req.headers);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

export {
  setLimit,
  getLimit
}