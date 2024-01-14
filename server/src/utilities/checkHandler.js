import { QUERY_VALUES, ACCOUNT_FIELDS } from "../constants/account.const.js";
import { EXPENSE_FIELDS } from "../constants/expense.const.js";

const isValidEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

const isValidField = (fieldNames) => {
  const inputFields = Object.keys(fieldNames);
  const expectedFields = Object.keys(ACCOUNT_FIELDS);

  // Check if all expected fields are present in the input
  const success = expectedFields.every(
    (field) => inputFields.includes(field.toLowerCase())
  );

  return success;
};

const isExpenseFieldValid = (fieldNames) => {
  const inputFields = Object.keys(fieldNames);
  const expectedFields = Object.keys(EXPENSE_FIELDS);

  // Check if all expected fields are present in the input
  const success = expectedFields.every(
    (field) => inputFields.includes(field.toLowerCase())
  );

  return success;
};

// When checking the query parameters
const isValidQueryParam = (params) => {
  return Object.values(QUERY_VALUES).toString() === Object.keys(params).toString();
};

const handleUndefinedFields = () => {
  return { status: '400', description: 'Bad JSON', message: 'Please provide valid JSON' };
};

export {
  isValidEmail,
  isValidField,
  isValidQueryParam,
  handleUndefinedFields,
  isValidPhone,
  isExpenseFieldValid
}