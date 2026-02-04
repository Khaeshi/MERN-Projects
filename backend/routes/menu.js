import express from 'express';
import mongoose from 'mongoose';
import MenuItem from '../models/menuItem.js';  
import { protect, admin } from '../middleware/auth.js';  

const router = express.Router();  

/*
 * GET /api/menu
 * Fetch all menu items
*/ 
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching menu items...');
    const menuItems = await MenuItem.find();
    const items = menuItems.map(item => ({
      id: item._id.toString(),  
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      isAvailable: item.isAvailable ?? true, 
    }));
    res.json(items);
  } catch (error) {
    console.error('❌ Error fetching menu items:', error);
    res.status(500).json({ 
      error: 'Failed to fetch menu items',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/*
 * POST /api/menu
 * Add new menu item
*/
router.post('/', protect, admin, async (req, res) => {
  console.log('➕ Adding menu item...');
  console.log('req.body:', req.body);

  const { name, price, image, description, isAvailable } = req.body;

  if (!name || !price || typeof name !== 'string' || typeof price !== 'number') {
    return res.status(400).json({ 
      success: false, 
      message: 'Name and price are required (name as string, price as number)' 
    });
  }

  //  validation -  accepts S3 URLs or empty string
  if (image && typeof image !== 'string') {
    return res.status(400).json({ 
      success: false, 
      message: 'Image must be a valid URL string or left empty' 
    });
  }

  try {
    const newItem = new MenuItem({ 
      name, 
      price, 
      image: image || '', 
      description: description || '',
      isAvailable: isAvailable ?? true 
    });
    await newItem.save();

    console.log('✅ Menu item added:', newItem);
    res.status(201).json({ 
      success: true, 
      message: 'Menu item added successfully', 
      item: newItem 
    });
  } catch (error) {
    console.error('❌ Error adding menu item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding menu item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/*
 * PUT /api/menu/:id
 * Update menu item
*/ 
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, price, image, description, isAvailable } = req.body;
    
    console.log('📝 Updating menu item:', req.params.id);
    console.log('Update data:', { name, price, image, description, isAvailable });
    
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description, isAvailable },
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({ 
        success: false,
        message: 'Menu item not found' 
      });
    }

    console.log('✅ Menu item updated:', menuItem);
    res.json(menuItem);
  } catch (error) {
    console.error('❌ Error updating menu item:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/*
 * DELETE /api/menu/:id
 * Delete menu item
*/ 
router.delete('/:id', protect, admin, async (req, res) => {
  console.log('🗑️ Deleting menu item...');
  console.log('ID:', req.params.id);

  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid item ID' 
      });
    }

    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Menu item not found' 
      });
    }

    console.log('✅ Menu item deleted:', deletedItem);
    res.json({ 
      success: true, 
      message: 'Menu item deleted successfully' 
    });
  } catch (error) {
    console.error('❌ Error deleting menu item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting menu item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;