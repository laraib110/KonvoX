import jwt from 'jsonwebtoken';

const secret = 'test'; // Make sure this matches the one used in signToken

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No auth token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    const decodedData = jwt.verify(token, secret);

    req.userId = decodedData?.id;
    req.userName = decodedData?.name; // <-- ADD THIS LINE
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;

