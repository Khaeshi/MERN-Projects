// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// ==================== PROTECT MIDDLEWARE ====================
// Requires user to be authenticated
export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in cookies first, then fallback to Authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password -googleAccessToken -googleRefreshToken');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Specific error messages
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

// ==================== ADMIN MIDDLEWARE ====================
// Requires user to be authenticated AND have admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as admin'
    });
  }
};

// ==================== OPTIONAL AUTH MIDDLEWARE ====================
// Does NOT require authentication, but sets req.authUser if token is valid
// Perfect for pages that should be accessible to both logged-in and logged-out users
export const optionalAuth = async (req, res, next) => {
  let token;

  try {
    
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token, set user to null and continue
    if (!token) {
      req.authUser = null;
      return next();
    }

    // Try to verify and get user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -googleAccessToken -googleRefreshToken');
    
    req.authUser = user || null;
    
  } catch (error) {
    // If token verification fails, just set user to null
    // Don't throw error - this middleware should always succeed
    console.log('Optional auth: Invalid/expired token, continuing as unauthenticated');
    req.authUser = null;
  }

  next();
};