import { pool } from "../db.js";

const createExpenseQuery = async (account_uuid, uuid, date, category, discription, spend) => {
  return await pool.query(
    'INSERT INTO expense_tracker.expense (account_uuid, uuid, date, category, discription, spend, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [account_uuid, uuid, date, category, discription, spend, new Date(), new Date()]
  );
};

const getAllExpenseQuery = async (account_uuid) => {
  return await pool.query(
    'SELECT * FROM expense_tracker.expense WHERE account_uuid = $1', [account_uuid]
  );
};

const updateExpenseQuery = async (updateFields) => {
  const { uuid, date, category, discription, spend } = updateFields;
  const values = [uuid];

  const setClauses = [];

  if (date !== undefined) setClauses.push(`date = $${values.push(date)}`);
  if (category !== undefined) setClauses.push(`category = $${values.push(category)}`);
  if (discription !== undefined) setClauses.push(`discription = $${values.push(discription)}`);
  if (spend !== undefined) setClauses.push(`spend = $${values.push(spend)}`);

  setClauses.push(`updated_at = $${values.push(new Date())}`);

  return await pool.query(`UPDATE expense_tracker.expense SET ${setClauses.join(', ')} WHERE uuid = $1`, values);
};

const deleteExpenseQuery = async (uuid) => {
  return await pool.query('DELETE FROM expense_tracker.expense WHERE uuid=$1', [uuid]);
};

export {
  createExpenseQuery,
  getAllExpenseQuery,
  updateExpenseQuery,
  deleteExpenseQuery
}