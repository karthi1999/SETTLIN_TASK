// Error handler
import dataJSON from "../utilities/dataJSON.js"

const errorHandler = (error, req, res, next) => {
  return res.status(200).json(dataJSON(500, 'Internal Server error', error.message || 'Something went wrong'));
};

export default errorHandler;