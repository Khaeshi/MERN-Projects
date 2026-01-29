import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; 
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/admin/auth/login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📥 Login attempt:', { email, hasPassword: !!password });

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    console.log('✅ User found:', user.email, 'Has password:', !!user.password);

    if (user.role !== 'admin') {
      console.log('❌ User is not admin:', user.role);
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin privileges required.' 
      });
    }

    if (!user.password) {
      console.log('❌ User has no password (OAuth account?)');
      return res.status(401).json({ 
        success: false,
        message: 'Invalid login method. Please use OAuth.' 
      });
    }

    console.log('🔍 Comparing passwords...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    console.log('✅ Password valid, generating token...');

    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login' 
    });
  }
});

// @route   GET /api/admin/auth/verify
// @desc    Verify admin token and return user details
// @access  Private (requires admin token)
router.get('/auth/verify', protect, admin, async (req, res) => {
  try {
    console.log('✅ Admin verify success for:', req.user.email);
    
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error('❌ Admin verify error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during verification' 
    });
  }
});

export default router;