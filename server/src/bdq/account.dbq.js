import { pool } from "../db.js";
import generateRandomUuid from "../utilities/randomUUID.js";
import { v4 as uuidv4 } from 'uuid';

const getAccountByEmailQuery = async (email) => {
  return await pool.query('SELECT * FROM expense_tracker.account WHERE email = $1', [email]);
};

const updateSessionQuery = async (email) => {
  return await pool.query('UPDATE expense_tracker.account SET session_uuid=$1 WHERE email = $2', [generateRandomUuid(), email]);
};

const insertAccountQuery = async (first_name, last_name, email, pass) => {
  return await pool.query(
    'INSERT INTO expense_tracker.account (session_uuid, account_uuid, user_role, first_name, last_name, email, pass, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [generateRandomUuid(), uuidv4(), process.env.USER_ROLE, first_name, last_name, email, pass, new Date]
  );
};

const getAccountPassQuery = async (email) => {
  return await pool.query('SELECT pass FROM expense_tracker.account WHERE email = $1', [email]);
};

const getAccountByCredentialsQuery = async (email, pass) => {
  return await pool.query('SELECT * FROM expense_tracker.account WHERE email = $1 AND pass = $2', [email, pass]);
};

const getAccountBySessionQuery = async (session_uuid, account_uuid) => {
  return await pool.query('SELECT * FROM expense_tracker.account WHERE session_uuid = $1 AND account_uuid = $2', [session_uuid, account_uuid]);
}

export {
  getAccountByEmailQuery,
  updateSessionQuery,
  insertAccountQuery,
  getAccountByCredentialsQuery,
  getAccountPassQuery,
  getAccountBySessionQuery
}