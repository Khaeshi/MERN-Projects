'use client';

import { useState, useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
import { API_ENDPOINTS } from '../../lib/api';
import useSWR from 'swr';
import { 
  Plus, 
  Package, 
  DollarSign, 
  Image as ImageIcon, 
  FileText, 
  Trash2, 
  Edit,
  TrendingUp,
  X,
  Search,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import Image from 'next/image';

interface MenuItem { 
  id: string; 
  name: string; 
  price: number; 
  image: string; 
  description: string; 
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


const fetcher = (url: string) => {
  const token = localStorage.getItem('adminToken');
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) throw new Error('Fetch failed');
    return res.json();
  });
};

export default function DashboardClient() { 
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', price: 0, image: '', description: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

// Fetch user
useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.adminVerify, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          id: data.user._id || data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
      } else {
        localStorage.removeItem('adminToken');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      router.push('/login');
    } finally {
      setIsLoadingUser(false);
    }
  };

  fetchUser();
}, [router]);

  // Fetch menu items
  const { data: menuItems, error, mutate } = useSWR<MenuItem[]>(
    user ? API_ENDPOINTS.menu : null,
    fetcher
  );

  // Add item
  const addItem = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(API_ENDPOINTS.menu, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error('Failed to add item');

      mutate(); 
      setNewItem({ name: '', price: 0, image: '', description: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_ENDPOINTS.menu}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error('Failed to delete item');
      mutate();
    } catch (error) {
      alert('Failed to delete item. Please contact admin.');
    }
  };

  // Calculate stats
  const totalItems = menuItems?.length || 0;
  const totalValue = menuItems?.reduce((sum, item) => sum + item.price, 0) || 0;
  const avgPrice = totalItems > 0 ? totalValue / totalItems : 0;

  // Filter menu items based on search
  const filteredItems = menuItems?.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Show loading while fetching user
  if (isLoadingUser || !user) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <Card className="p-8 text-center bg-stone-800 border-stone-700">
          <Loader2 className="w-12 h-12 mx-auto text-amber-500 mb-4 animate-spin" />
          <p className="text-stone-300">Loading...</p>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <Card className="p-8 text-center bg-stone-800 border-stone-700 max-w-md">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl mb-2 text-white font-bold">Error Loading Menu</h2>
          <p className="text-stone-400 mb-6">{error.message}</p>
          <Button 
            onClick={() => mutate()} 
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 border-b border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Menu Management</h1>
              <p className="text-stone-400">Manage your cafe menu items and pricing</p>
              <p className="text-stone-500 text-sm mt-1">Logged in as: {user.name}</p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </div>
        </div>
      </div>


      {/* Rest of the component remains unchanged */}
      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Items */}
          <Card className="bg-gradient-to-br from-amber-900/20 to-stone-800 border-amber-700/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-400 text-sm font-medium mb-1">Total Items</p>
                  <p className="text-3xl font-bold text-white">{totalItems}</p>
                  <p className="text-amber-400 text-xs mt-2">Active menu items</p>
                </div>
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Value */}
          <Card className="bg-gradient-to-br from-green-900/20 to-stone-800 border-green-700/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-400 text-sm font-medium mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-white">₱{totalValue.toFixed(2)}</p>
                  <p className="text-green-400 text-xs mt-2">Combined menu value</p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Average Price */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-stone-800 border-blue-700/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-400 text-sm font-medium mb-1">Average Price</p>
                  <p className="text-3xl font-bold text-white">₱{avgPrice.toFixed(2)}</p>
                  <p className="text-blue-400 text-xs mt-2">Per menu item</p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-stone-800 border-stone-700 text-white placeholder-stone-500 focus:border-amber-600"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        {!menuItems ? (
          <Card className="p-12 text-center bg-stone-800 border-stone-700">
            <Loader2 className="w-12 h-12 mx-auto text-amber-500 mb-4 animate-spin" />
            <p className="text-stone-300">Loading menu items...</p>
          </Card>
        ) : filteredItems && filteredItems.length === 0 ? (
          <Card className="p-12 text-center bg-stone-800 border-stone-700">
            <Package className="w-16 h-16 mx-auto text-stone-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              {searchQuery ? 'No items found' : 'No menu items yet'}
            </h3>
            <p className="text-stone-400 mb-6">
              {searchQuery 
                ? `No items match "${searchQuery}"`
                : 'Add your first menu item to get started'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems?.map((item, index) => (
              <Card 
                key={item.id || `item-${index}`} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-stone-800 border-stone-700 hover:border-amber-600/50"
              >
                <div className="aspect-video w-full bg-stone-700 relative overflow-hidden group">
                  {item.image && item.image.trim() !== '' && item.image.startsWith('/products/') ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-stone-500" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ₱{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-stone-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-stone-700 border-stone-600 text-white hover:bg-stone-600 hover:border-amber-600"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/50 border-stone-600 hover:border-red-600"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg bg-stone-800 border-stone-700 shadow-2xl">
            <CardHeader className="border-b border-stone-700">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-white text-xl">
                    <Plus className="w-5 h-5 text-amber-500" />
                    Add New Menu Item
                  </CardTitle>
                  <CardDescription className="text-stone-400 mt-1">
                    Fill in the details to create a new menu item
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewItem({ name: '', price: 0, image: '', description: '' });
                  }}
                  className="text-stone-400 hover:text-white hover:bg-stone-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="modal-name" className="flex items-center gap-2 text-stone-300">
                  <Package className="w-4 h-4" />
                  Item Name *
                </Label>
                <Input
                  id="modal-name"
                  placeholder="e.g., Caramel Macchiato"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="bg-stone-700 border-stone-600 text-white placeholder-stone-500 focus:border-amber-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-price" className="flex items-center gap-2 text-stone-300">
                  <DollarSign className="w-4 h-4" />
                  Price (₱) *
                </Label>
                <Input
                  id="modal-price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                  className="bg-stone-700 border-stone-600 text-white placeholder-stone-500 focus:border-amber-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-image" className="flex items-center gap-2 text-stone-300">
                  <ImageIcon className="w-4 h-4" />
                  Image URL
                </Label>
                <Input
                  id="modal-image"
                  placeholder="/products/coffee.jpg"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="bg-stone-700 border-stone-600 text-white placeholder-stone-500 focus:border-amber-600"
                />
                <p className="text-xs text-stone-500">Must start with /products/</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modal-description" className="flex items-center gap-2 text-stone-300">
                  <FileText className="w-4 h-4" />
                  Description
                </Label>
                <Textarea
                  id="modal-description"
                  placeholder="Describe your menu item..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows={4}
                  className="bg-stone-700 border-stone-600 text-white placeholder-stone-500 focus:border-amber-600 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewItem({ name: '', price: 0, image: '', description: '' });
                  }}
                  className="flex-1 bg-stone-700 border-stone-600 text-white hover:bg-stone-600"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={addItem} 
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={!newItem.name || !newItem.price || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}