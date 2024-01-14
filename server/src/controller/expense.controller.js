import { createService, deleteService, getAllService, updateService } from "../service/expense.service.js";
import dataJSON from "../utilities/dataJSON.js";

// DESC     create expense details
// Route    POST /createExpense
const createExpense = async (req, res, next) => {
  try {
    const { status, description, message, data } = await createService(req.headers, req.body, req);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

// DESC     get expense details
// Route    GET /getAllExpense
const getAllExpense = async (req, res, next) => {
  try {
    const { status, description, message, data } = await getAllService(req.headers);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};


// DESC     update expense details
// Route    POST /updateExpense
const updateExpense = async (req, res, next) => {
  try {
    const { status, description, message, data } = await updateService(req.body, req);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

// DESC     delete expense details
// Route    POST /deleteExpense
const deleteExpense = async (req, res, next) => {
  try {
    const { status, description, message, data } = await deleteService(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

export {
  createExpense,
  getAllExpense,
  updateExpense,
  deleteExpense
}