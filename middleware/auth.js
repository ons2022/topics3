const jwt = require('jsonwebtoken');
const JWT_SECRET = "!azertyuiop@123456789";

// Middleware to verify JWT token
const auth = (req, res, next) => {
  // Extract the token from the Authorization header (Bearer token)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach the decoded token payload to the req.user
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with an error
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;
