import { getAccountByEmailQuery, updateSessionQuery, insertAccountQuery, getAccountByCredentialsQuery, getAccountPassQuery, getAccountBySessionQuery } from "../bdq/account.dbq.js";
import store from "../store/redis/index.js";
import { isValidEmail, isValidField, isValidQueryParam, handleUndefinedFields } from "../utilities/checkHandler.js";
import { hashPassword, hashCompare } from "../utilities/hashData.js";

// To check the email already exists to restrict, duplication of email
const checkEmail = async (email) => {
  try {
    const emailResult = await getAccountByEmailQuery(email);
    return emailResult.rows.length > 0;
  } catch (error) {
    throw new Error(error)
  }
};

// Sign up
const createAccount = async (data) => {
  try {
    const { first_name, last_name, email, pass, confirm_pass } = data;
    if (!isValidField(data)) {
      return handleUndefinedFields()
    }

    if (!isValidEmail(email)) {
      return { status: '403', description: 'Invalid email', message: 'Please provide a valid email id' };
    }
    // reverse byte array to it original value
    const originalPass = Buffer.from(pass, 'base64').toString('utf-8');
    const originalConfirmPass = Buffer.from(confirm_pass, 'base64').toString('utf-8');

    if (originalPass != originalConfirmPass) {
      return { status: '403', description: 'Password incorrect', message: 'Password and Confirm password do not match' };
    }

    const emailResult = await checkEmail(email);

    if (emailResult) {
      return { status: '403', description: 'Invalid email', message: 'Email already exists' };
    }

    // encoding the original password
    const hashPass = await hashPassword(originalPass)

    await insertAccountQuery(first_name, last_name, email, hashPass);

    const getAccount = await getAccountByCredentialsQuery(email, hashPass);

    if (getAccount.rows.length > 0) {
      const { session_uuid, account_uuid, user_role, first_name, last_name, email } = getAccount.rows[0];
      const response = { session_uuid, account_uuid, user_role, first_name, last_name, email };

      //Redis store
      const requestBody = {
        method: "hset",
        key: session_uuid,
        value: response
      }
      await store(requestBody)
      return { status: '200', description: 'Success', message: 'Successfully login', data: response };
    } else {
      return { status: '404', description: 'User not found', message: 'Login failed' };
    }

  } catch (error) {
    throw new Error(error)
  }
};


// Sign In
const loginAccount = async (data) => {
  try {
    const { email, pass } = data;
    if (!isValidQueryParam(data)) {
      return handleUndefinedFields()
    }

    if (!isValidEmail(email)) {
      return { status: '403', description: 'Invalid email', message: 'Please provide a valid email id' };
    }

    const emailResult = await checkEmail(email);

    if (!emailResult) {
      return { status: '404', description: 'Email not found', message: 'Email doesn\'t exist' };
    }

    const hashPassword = await getAccountPassQuery(email)

    // reverse byte array to it original value
    const originalPassword = Buffer.from(pass, 'base64').toString('utf-8');
    // compare encoded password with original password
    const passwordResult = await hashCompare(originalPassword, hashPassword.rows[0].pass);

    if (!passwordResult) {
      return { status: '404', description: 'Invalid password', message: 'Please check your credentials' };
    }

    const result = await updateSessionQuery(email)

    const getAccount = await getAccountByEmailQuery(email)

    if (result.rowCount === 1) {
      const { session_uuid, account_uuid, user_role, first_name, last_name, email } = getAccount.rows[0]
      const response = { session_uuid, account_uuid, user_role, first_name, last_name, email }

      //Redis store
      const requestBody = {
        method: "hset",
        key: session_uuid,
        value: response
      }
      await store(requestBody)

      return { status: '200', description: 'Success', message: 'Successfully login', data: response };
    } else {
      throw new Error('Update Failed')
    }

  } catch (error) {
    throw new Error(error)
  }
};


// Account Details
const accountDetails = async (data) => {
  try {
    const { session_uuid } = data;

    const isValidSession = await store({ method: 'exists', key: session_uuid })
    if (!isValidSession) {
      return { status: '404', description: 'Invalid session', message: 'Please provide valid session', data: null };
    }

    const check = await store({ method: 'hgetall', key: session_uuid })

    const result = await getAccountBySessionQuery(check.session_uuid, check.account_uuid)
    if (result.rows.length > 0) {
      const { session_uuid, account_uuid, user_role, first_name, last_name, email } = result.rows[0];
      const response = { session_uuid, account_uuid, user_role, first_name, last_name, email };

      return { status: '200', description: 'Success', message: 'Enter valid account', data: response };
    } else {
      return { status: '403', description: 'Invalid access', message: 'Please invalid session or account uuid' };
    }
  } catch (error) {
    throw new Error(error)
  }
}

export {
  checkEmail,
  createAccount,
  loginAccount,
  accountDetails
}
