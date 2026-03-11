const getBcrypt = () => {
  return require('bcryptjs');
};

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  try {
    const bcrypt = getBcrypt();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { hashedPassword, salt };
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

export const comparePassword = async (password, hashedPassword, salt) => {
  try {
    const bcrypt = getBcrypt();
    const hashedInput = await bcrypt.hash(password, salt);
    return hashedInput === hashedPassword;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};
