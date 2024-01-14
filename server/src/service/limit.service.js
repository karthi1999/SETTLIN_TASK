import { handleUndefinedFields } from '../utilities/checkHandler.js';
import { setLimitQuery, getLimitQuery, updateLimitQuery } from "../bdq/limit.dbq.js"

// Set limit
const setLimitService = async (header, data) => {
  const { account_uuid } = header;
  const { limit } = data;

  try {
    if (!account_uuid && !limit) {
      return handleUndefinedFields();
    }

    const getLimitResult = await getLimitQuery(account_uuid);
    if (getLimitResult.rows.length > 0) {
      const updateResult = await updateLimitQuery(account_uuid, limit);
      return (updateResult.rowCount > 0)
        ? { status: '200', description: 'Success', message: 'Successfully updated expense limit', data: 'successfully updated' }
        : { status: '404', description: 'Expense detail not found', message: 'Expense detail not found by the given uuid' };
    } else {
      const setResult = await setLimitQuery(account_uuid, limit);
      return (setResult.rowCount > 0)
        ? { status: '200', description: 'Success', message: 'Successfully created expense limit', data: 'successfully added' }
        : { status: '404', description: 'Failed', message: 'Unable to create expense limit' };
    }
  } catch (error) {
    throw new Error(error);
  }
}


// Get limit
const getLimitService = async (header) => {
  try {
    const { account_uuid } = header;
    if (!account_uuid) {
      return handleUndefinedFields();
    }
    const getLimit = await getLimitQuery(account_uuid);
    if (getLimit.rows.length > 0) {
      const newData = getLimit.rows.map(({ account_uuid, ...rest }) => rest);

      return {
        status: '200',
        description: 'Success',
        message: 'Successfully retrieved expense limit',
        data: newData,
      }
    } else {
      return { status: '404', description: 'Not found', message: 'No expense limit found' };
    }
  } catch (error) {
    throw new Error(error);
  }
};

export {
  setLimitService,
  getLimitService,
}