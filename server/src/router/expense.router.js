import express from "express";
import { createExpense, deleteExpense, getAllExpense, updateExpense } from "../controller/expense.controller.js";
import dataJSON from "../utilities/dataJSON.js";
import validateAdminPermissions from "../middleware/adminPermission.js";

const router = express.Router();

router.route('/createExpense').post(validateAdminPermissions, createExpense)
router.route('/getAllExpense').get(validateAdminPermissions, getAllExpense)
router.route('/updateExpense').post(validateAdminPermissions, updateExpense)
router.route('/deleteExpense').post(validateAdminPermissions, deleteExpense)

router.use((req, res, next) => {
  res.status(404).json(dataJSON('404', 'URL or Method not found', 'The requested URL or Method does not exist.'));
});

export default router