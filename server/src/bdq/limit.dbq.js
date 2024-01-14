import { pool } from "../db.js";

const setLimitQuery = async (account_uuid, limit) => {
  return await pool.query(
    'INSERT INTO expense_tracker.limit (account_uuid, expense_limit, created_at, updated_at) VALUES ($1, $2, $3, $4)',
    [account_uuid, limit, new Date(), new Date()]
  );
};

const getLimitQuery = async (account_uuid) => {
  return await pool.query(
    'SELECT * FROM expense_tracker.limit WHERE account_uuid = $1', [account_uuid]
  );
};

const updateLimitQuery = async (account_uuid, limit) => {
  const values = [account_uuid];

  const setClauses = [];

  if (limit !== undefined) setClauses.push(`expense_limit = $${values.push(limit)}`);

  setClauses.push(`updated_at = $${values.push(new Date())}`);

  return await pool.query(`UPDATE expense_tracker.limit SET ${setClauses.join(', ')} WHERE account_uuid = $1`, values);
};

const deleteLimitQuery = async (uuid) => {
  return await pool.query('DELETE FROM expense_tracker.limit WHERE uuid=$1', [uuid]);
};

export {
  setLimitQuery,
  getLimitQuery,
  updateLimitQuery,
  deleteLimitQuery
}