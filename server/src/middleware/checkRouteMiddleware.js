// middleware for api url check
import dataJSON from "../utilities/dataJSON.js";

export default (req, res, next) => {
  const url = req.url.split('/');
  if (url[1] !== 'account' && url[1] !== 'expense' && url[1] !== 'limit') {
    return res.status(404).json(dataJSON('404', 'URL or Method not found', 'The requested URL or Method does not exist.'));
  }

  next();
};
