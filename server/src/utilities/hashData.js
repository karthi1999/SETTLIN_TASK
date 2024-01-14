import bcrypt from 'bcrypt';

// Encoded password
const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

// Decoded Password
const hashCompare = async (password, dbpassword) => {
  try {
    const hash = await bcrypt.compare(password, dbpassword);
    return hash;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

export {
  hashPassword,
  hashCompare
};


