'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';

// Menu items data
const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    price: 120,
    image: 'https://images.unsplash.com/photo-1564676677001-92e8f1a0df30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBkcmluayUyMGN1cHxlbnwxfHx8fDE3Njg3ODQzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich and bold espresso shot'
  },
  {
    id: 2,
    name: 'Croissant',
    price: 95,
    image: 'https://images.unsplash.com/photo-1712723247648-64a03ba7c333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY4NzI4MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Buttery flaky croissant'
  },
  {
    id: 3,
    name: 'Club Sandwich',
    price: 185,
    image: 'https://images.unsplash.com/photo-1642335381031-8c80a25d1bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGNhZmV8ZW58MXx8fHwxNzY4NzUyMjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic club sandwich'
  },
  {
    id: 4,
    name: 'Chocolate Cake',
    price: 145,
    image: 'https://images.unsplash.com/photo-1664681339903-38c50a930116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwc2xpY2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2ODc1MjUzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Decadent chocolate cake'
  },
  {
    id: 5,
    name: 'Breakfast Bagel',
    price: 135,
    image: 'https://images.unsplash.com/photo-1707144289499-8903dc4929c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBiYWdlbHxlbnwxfHx8fDE3Njg3ODQzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh bagel with toppings'
  },
  {
    id: 6,
    name: 'Blueberry Muffin',
    price: 85,
    image: 'https://images.unsplash.com/photo-1609983508297-272bdba8d9ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWZmaW4lMjBiYWtlcnl8ZW58MXx8fHwxNzY4Nzc5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Freshly baked muffin'
  },
];

export default function Menu() {
  const { addToCart } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">OUR MENU</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#DCE0E1] text-center p-5 shadow-[0_20px_50px_rgba(117,118,118,0.5)] tracking-wide"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={500}
              className="w-[90%] h-[430px] object-cover mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.description}</p>
            <p className="text-lg font-bold mt-3 text-gray-800">₱{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="w-full bg-[#1C1F25] text-white py-3 mt-4 hover:bg-[#2a2d34] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}