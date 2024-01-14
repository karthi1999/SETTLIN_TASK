import { v4 as uuidv4 } from 'uuid';
import { handleUndefinedFields, isExpenseFieldValid } from '../utilities/checkHandler.js';
import { createExpenseQuery, deleteExpenseQuery, getAllExpenseQuery, updateExpenseQuery } from "../bdq/expense.dbq.js"

// Create Expense
const createService = async (header, data, req) => {
  try {
    const { account_uuid } = header;
    const { uuid, ...expenseData } = data;
    let newUuid = uuid || uuidv4();
    const {
      date,
      category,
      discription,
      spend
    } = expenseData;

    if (!isExpenseFieldValid(expenseData)) {
      return handleUndefinedFields();
    }
    let result = await createExpenseQuery(account_uuid, newUuid, date, category, discription, spend);

    if (result.rowCount > 0) {
      return { status: '200', description: 'Success', message: 'Successfully created expense details', data: { uuid: newUuid, ...expenseData } };
    } else {
      return { status: '404', description: 'Failed', message: 'Unable to create expense details' };
    }
  } catch (error) {
    throw new Error(error);
  }
}

// Get all Expense
const getAllService = async (header) => {
  try {
    const { account_uuid } = header;
    if (!account_uuid) {
      return handleUndefinedFields();
    }
    const getAllExpense = await getAllExpenseQuery(account_uuid);
    if (getAllExpense.rows.length > 0) {
      const newData = getAllExpense.rows.map(({ account_uuid, created_at, updated_at, ...rest }) => rest);

      return {
        status: '200',
        description: 'Success',
        message: 'Successfully retrieved expense details',
        data: {
          expenseList: newData,
        }
      }
    } else {
      return { status: '404', description: 'Not found', message: 'No expense found' };
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Update expense
const updateService = async (data, req) => {
  try {
    const { uuid } = data;
    if (!uuid) {
      return handleUndefinedFields();
    }

    const result = await updateExpenseQuery(data);

    if (result.rowCount > 0) {
      return { status: '200', description: 'Success', message: 'Successfully updated expense details', data: 'successfully updated' };
    } else {
      return { status: '404', description: 'Expense details not found', message: 'Expense details not found by the given uuid' };
    }
  } catch (error) {
    throw new Error(error);
  }
};


// Delete expense
const deleteService = async (data) => {
  try {
    const { uuid } = data;

    let result;
    if (!data) {
      return handleUndefinedFields()
    }

    result = await deleteExpenseQuery(uuid);

    if (result.rowCount > 0) {

      return { status: '200', description: 'Success', message: 'Successfully deleted expense detail', data: null };
    } else {
      return { status: '404', description: 'Expense details not found', message: 'Expense details not found by the given uuid' };
    }
  } catch (error) {
    throw new Error(error)
  }
}

export {
  createService,
  getAllService,
  updateService,
  deleteService,
}