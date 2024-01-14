import express from "express";
import { setLimit, getLimit } from "../controller/limit.controller.js";
import dataJSON from "../utilities/dataJSON.js";
import validateAdminPermissions from "../middleware/adminPermission.js";

const router = express.Router();

router.route('/setLimit').post(validateAdminPermissions, setLimit)
router.route('/getLimit').get(validateAdminPermissions, getLimit)

router.use((req, res, next) => {
  res.status(404).json(dataJSON('404', 'URL or Method not found', 'The requested URL or Method does not exist.'));
});

export default router