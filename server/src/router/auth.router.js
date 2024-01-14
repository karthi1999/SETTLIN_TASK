import express from "express";
import { signin, signup, getAccountDetails } from "../controller/auth.controller.js";
import dataJSON from "../utilities/dataJSON.js";

const router = express.Router();

router.route('/signin').post(signin)
router.route('/signup').post(signup)
router.route('/getAccountDetails').post(getAccountDetails)

router.use((req, res, next) => {
  res.status(404).json(dataJSON('404', 'URL or Method not found', 'The requested URL or Method does not exist.'));
});

export default router