import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductSection({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('All Product');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryCounts = {
    'All Product': products.length,
    'Shoes': products.filter(p => p.category === 'Shoes').length,
    'Clothing': products.filter(p => p.category === 'Clothing').length,
    'Others Product': products.filter(p => p.category === 'Others Product').length,
  };

  const filteredProducts = activeCategory === 'All Product' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const categories = ['All Product', 'Shoes', 'Clothing', 'Others Product'];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-sans">

      <div className="flex justify-between items-center mb-6 gap-2 sm:gap-4 w-full bg-white z-10 flex-shrink-0">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto py-1 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white border rounded-full text-sm active:scale-95 transition-all whitespace-nowrap ${
                activeCategory === category 
                  ? 'border-gray-200 shadow-sm font-medium text-black' 
                  : 'border-gray-100 font-medium text-gray-500 hover:border-gray-300' 
              }`}
            >
              {category} 
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === category 
                  ? 'bg-[#cbf169] text-black font-semibold' 
                  : 'bg-gray-100 text-gray-500' 
              }`}>
                {categoryCounts[category]}
              </span>
            </button>
          ))}
        </div>
        
        <button className="flex-shrink-0 p-3 bg-white/50 backdrop-blur-md border border-gray-200 shadow-sm rounded-full text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">
          <Search size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="animate-spin text-[#cbf169] w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
            
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product._id || product.id} 
                className="bg-white rounded-[32px] border border-[#f0f0f0] p-3 shadow-sm flex flex-col group hover:shadow-md transition-shadow"

                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                
                <div className="w-full h-[180px] sm:h-[210px] bg-[#efefef] rounded-[24px] relative flex items-center justify-center mb-4 sm:mb-5 overflow-hidden">
                  <div className="absolute top-0 left-0 bg-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-tl-[24px] rounded-br-[20px] z-10">
                    <span className="text-[#888888] text-xs sm:text-[13px] font-medium">{product.stock} Stock</span>
                  </div>
                  <img src={product.imageUrl} alt={product.name} className="w-[85%] h-[85%] object-contain drop-shadow-2xl mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="px-2 sm:px-3 flex flex-col gap-2 sm:gap-3 flex-1">
                  <h2 className="text-xl sm:text-[22px] font-bold text-black leading-tight tracking-tight truncate">
                    {product.name}
                  </h2>
                  <p className="text-[#b4b4b4] text-xs sm:text-[14px] font-semibold leading-[1.3] pr-2 line-clamp-2 min-h-[32px] sm:min-h-[36px]">
                    {product.description}
                  </p>
                  <div className="text-lg sm:text-[20px] font-bold text-black mt-1">
                    ${product.price.toFixed(2)}
                  </div>
                </div>

                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full mt-4 sm:mt-5 mb-1 py-3 sm:py-3.5 border border-[#e8e8e8] rounded-[24px] flex items-center justify-center gap-2 hover:bg-[#bbf246] active:scale-95 transition-all duration-200 cursor-pointer group/btn mt-auto"
                >
                  <Plus size={20} strokeWidth={2.5} className="text-black group-hover/btn:scale-125 group-hover/btn:rotate-90 transition-transform duration-300" />
                  <span className="font-bold text-[15px] sm:text-[16px] text-black">Add to Cart</span>
                </button>
                
              </motion.div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 font-medium">
                No products found in this category.
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}