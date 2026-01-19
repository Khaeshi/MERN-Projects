'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

export function CartSidebar() {
  const { cart, isCartOpen, updateQuantity, toggleCart, getTotalPrice } = useCart();

  return (
    <>
      {/* Shopping Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[500px] bg-black h-screen transition-transform duration-500 z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center px-5 border-b border-gray-800">
          <h2 className="text-[#E8BC0E] text-2xl font-light">Cart</h2>
        </div>

        {/* Cart Items List */}
        <div className="overflow-y-auto h-[calc(100vh-150px)] px-5 py-4">
          {cart.length === 0 ? (
            <p className="text-white text-center mt-8">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="grid grid-cols-[100px_1fr_auto_auto] gap-3 text-white items-center">
                  <Image src={item.image} alt={item.name} width={500} height={500} className="w-full h-20 object-cover" />
                  <div className="text-sm">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-400">₱{item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-white/30 text-white w-8 h-8 rounded hover:bg-white/40"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-white/30 text-white w-8 h-8 rounded hover:bg-white/40"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold">₱{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Checkout Section */}
        <div className="absolute bottom-0 w-full grid grid-cols-2">
          <div className="bg-[#E8BC0E] h-[70px] flex justify-center items-center font-bold text-black">
            ₱{getTotalPrice()}
          </div>
          <div
            className="bg-[#1C1F25] text-white h-[70px] flex justify-center items-center font-bold cursor-pointer hover:bg-[#2a2d34]"
            onClick={toggleCart}
          >
            <X className="mr-2" size={20} />
            Close
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleCart}
        />
      )}
    </>
  );
}