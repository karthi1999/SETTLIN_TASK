import store from '../store/redis/index.js';
import dataJSON from '../utilities/dataJSON.js';

const validateAdminPermissions = async (req, res, next) => {
  const invalidAccess = () => {
    return res.status(200).json(dataJSON('403', 'Invalid Access', 'Provided request is NOT Authorized ! Please check the required parameters'));
  }
  try {
    const { session_uuid, account_uuid, user_role } = req.headers;

    if (session_uuid && account_uuid && user_role) {
      try {
        if (user_role != 'admin') {
          invalidAccess()
        }
        //Redis store
        const requestBody = {
          method: "hgetall",
          key: session_uuid
        }
        const includes = await store({ method: 'exists', key: session_uuid })
        if (!includes) {
          invalidAccess();
        }
        const values = await store(requestBody)
        const result = values.account_uuid === account_uuid
        if (result) {
          return next();
        } else {
          invalidAccess();
        }
      } catch (error) {
        return res.status(500).json(dataJSON('500', 'Internal Server Error', 'An error occurred while validating permissions'));
      }
    } else {
      return res.status(200).json(dataJSON('400', 'Bad Request', 'Please provide valid header fields'));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(dataJSON('500', 'Internal Server Error', 'An error occurred while processing the request'));
  }
};

export default validateAdminPermissions;
