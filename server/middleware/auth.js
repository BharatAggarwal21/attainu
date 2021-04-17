const jwt =require('jsonwebtoken');

const JWT_SECRET = "sl_myJwtSecret";

module.exports= (req, res, next) => {
  const token = req.body.headers['x-auth-token'];
  

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(410).json({ msg: 'Token is not valid' });
  }
};
