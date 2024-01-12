const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.requireAutho = async (req, res, next) => {
  // Attempt to extract the token from the Authorization header
  const tokenStringWithBearer = req.headers.authorization;
  const  tokenfromcookie  = req.cookies.token;

  // Check if the token is present in either the Authorization header or the cookie
  if (!tokenStringWithBearer && !tokenfromcookie) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  let token;

  // Use the token from the Authorization header if present
  if (tokenStringWithBearer) {
    token = tokenStringWithBearer.split(' ')[1];
  } else {
    // Use the token from the cookie if present
    token = tokenfromcookie;
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const email = decodedToken.email;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found while auth' });
    }

    // Attach the user object to the request for use in subsequent middleware or routes
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};
