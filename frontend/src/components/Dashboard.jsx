import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ProductSection from './ProductSection';
import TransactionPanel from './TransactionPanel';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  
  const [cartItems, setCartItems] = useState([]);

  
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      
      const existingItem = prev.find(item => item.productId === (product._id || product.id));
      if (existingItem) {
       
        return prev.map(item => 
          item.productId === (product._id || product.id) 
            ? { ...item, qty: item.qty + 1 } 
            : item
        );
      }
    
      return [...prev, {
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
        size: '42',   
        color: 'Green' 
      }];
    });
  
    setIsCartOpen(true); 
  };

  const handleUpdateQty = (productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

 
  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  
  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-white md:bg-[#1e2025] font-sans md:p-3 lg:p-4 gap-3 lg:gap-4 overflow-hidden relative">
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
      {isCartOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden" onClick={() => setIsCartOpen(false)} />}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex bg-white md:rounded-[32px] lg:rounded-[40px] overflow-hidden md:shadow-lg border-x-0 md:border border-gray-100 relative">
        <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 md:px-6 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Header 
            onMenuClick={() => setIsSidebarOpen(true)} 
            onCartClick={() => setIsCartOpen(true)} 
            cartCount={cartItems.length} // Pass count to header
          />
          <ProductSection onAddToCart={handleAddToCart} />
        </div>

        <TransactionPanel 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}