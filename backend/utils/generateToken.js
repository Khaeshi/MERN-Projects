import jwt from 'jsonwebtoken';

const generateToken = (id, role = null) => {
  const payload = { id };
  
  if (role) {
    payload.role = role;
  }
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET, 
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

export default generateToken;