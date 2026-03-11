const getJwt = () => {
  return require('jsonwebtoken');
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

export const createToken = (payload) => {
  const jwt = getJwt();
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  try {
    const jwt = getJwt();
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const updateToken = (token, newData) => {
  try {
    const jwt = getJwt();
    const decoded = jwt.verify(token, JWT_SECRET);
    const updatedPayload = { ...decoded, ...newData };
    delete updatedPayload.exp;
    return jwt.sign(updatedPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  try {
    const jwt = getJwt();
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};
