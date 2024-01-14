import { createAccount, loginAccount, accountDetails } from "../service/auth.service.js";
import dataJSON from "../utilities/dataJSON.js";

// DESC     create user
// Route    POST /signup
const signup = async (req, res, next) => {
  try {
    const { status, description, message, data } = await createAccount(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

// DESC     login user
// Route    POST /signin
const signin = async (req, res, next) => {
  try {
    const { status, description, message, data } = await loginAccount(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

// DESC     get user details
// Route    POST /getAccountDetails
const getAccountDetails = async (req, res, next) => {
  try {
    const { status, description, message, data } = await accountDetails(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  signin,
  getAccountDetails
}