import { v4 as uuidv4 } from 'uuid';
import { getError } from '../lib';

const getHeader = (req) => {
  try {
    const { session_uuid, account_uuid, user_role } = req;

    return {
      session_uuid: session_uuid,
      user_role: user_role,
      account_uuid: account_uuid,
      x_correlation_id: uuidv4(),
      'content-type': 'application/json'
    }

  } catch (error) {
    getError(error)
  }
}

export default getHeader;