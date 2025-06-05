import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  const token = auth.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decodedToken;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token Expired' });
    }
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
