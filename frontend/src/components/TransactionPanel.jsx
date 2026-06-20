import React, { useState } from 'react';
import { Trash2, Plus, Minus, ChevronRight, Percent, X, Loader2 } from 'lucide-react';

export default function TransactionPanel({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onClearCart }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subTotal * 0.12; // 12% Tax
  const discount = subTotal > 0 ? subTotal * 0.10 : 0; // 10% Promo Discount
  const totalPayment = subTotal + tax - discount;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          subTotal,
          tax,
          discount,
          totalPayment
        })
      });

      if (response.ok) {
        alert("Transaction Successful! Order sent to backend.");
        onClearCart();
      } else {
        alert("Failed to process transaction.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Server error. Make sure your backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`
      fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out
      xl:relative xl:translate-x-0
      ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}
      w-full sm:w-[420px] bg-[#f8f8f8] h-[100dvh] xl:h-auto flex flex-col flex-shrink-0 p-4 sm:p-6 
      rounded-l-[32px] sm:rounded-l-[40px] xl:rounded-[40px] border border-gray-100 overflow-y-auto 
      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
    `}>

      <div className="flex justify-between items-center mb-6 pt-2">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="xl:hidden p-2.5 bg-white rounded-full shadow-sm border border-gray-200 text-gray-800">
            <X size={20} />
          </button>
          <h2 className="text-xl sm:text-[22px] font-extrabold text-black tracking-tight">Detail Transaction</h2>
        </div>
        <button onClick={onClearCart} className="text-black bg-white border border-gray-200 text-xs sm:text-sm font-bold flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
           <Trash2 size={16} className="text-[#e81c3b]" strokeWidth={2.5} /> Reset Order
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-6 flex-1 overflow-y-auto pr-1">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 font-medium">No items in cart</div>
        ) : (
          cartItems.map(item => (
            <div key={item.productId} className="bg-white p-3.5 sm:p-4 rounded-[28px] border border-gray-100 flex gap-3 sm:gap-4 shadow-sm relative group animate-fade-in-up">

              <div className="w-[85px] h-[85px] sm:w-[95px] sm:h-[95px] bg-[#f4f5f7] rounded-[20px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                 <img src={item.imageUrl} alt={item.name} className="w-[80%] h-[80%] object-contain mix-blend-multiply drop-shadow-md" />
              </div>
              
              <div className="flex flex-col justify-between w-full py-0.5">
                <div className="pr-12">
                  <h4 className="font-bold text-black text-[15px] sm:text-[16px] line-clamp-1">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[11px] sm:text-xs font-medium text-gray-400 px-3 py-1 border border-gray-200 rounded-full">Size {item.size}</span>
                    <span className="text-[11px] sm:text-xs font-medium text-gray-400 px-3 py-1 border border-gray-200 rounded-full flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#395c47]"></div>
                      {item.color}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mt-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => onUpdateQty(item.productId, -1)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-black hover:bg-gray-50 active:scale-95 transition-all">
                      <Minus size={16} strokeWidth={2.5} />
                    </button>
                    <span className="text-sm font-semibold text-gray-400">{item.qty < 10 ? `0${item.qty}` : item.qty}</span>
                    <button onClick={() => onUpdateQty(item.productId, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#bbf246] text-black hover:bg-[#aee635] active:scale-95 transition-all">
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                  <div className="font-bold text-black tracking-tight text-[15px]">
                    <span className="text-gray-400 font-semibold mr-1.5 text-sm">Total</span>
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>

              <button onClick={() => onRemoveItem(item.productId)} className="absolute top-4 right-4 w-10 h-10 bg-[#e81c3b] rounded-full flex items-center justify-center text-white hover:bg-red-700 shadow-md active:scale-95 transition-all">
                <Trash2 size={18} strokeWidth={2.5} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3 pb-4">

        <div className="flex justify-between items-center bg-white p-2.5 rounded-full border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3 text-[13px] font-extrabold text-black pl-3">
            <Percent size={18} className="text-black" strokeWidth={3} />
            Promo New User (10%)
          </div>
          <button className="text-[12px] font-bold bg-[#bbf246] px-5 py-2.5 rounded-full text-black hover:bg-[#aee635] transition-colors">
            Change Promo
          </button>
        </div>

        <div className="flex flex-col gap-3.5 text-[13px] bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center"><span className="font-bold text-gray-400">Sub-Total</span><span className="font-extrabold text-black">${subTotal.toFixed(2)}</span></div>
          <div className="flex justify-between items-center"><span className="font-bold text-gray-400">Tax(12%)</span><span className="font-extrabold text-black">${tax.toFixed(2)}</span></div>
          <div className="flex justify-between items-center"><span className="font-bold text-gray-400">Discount</span><span className="font-extrabold text-black">-${discount.toFixed(2)}</span></div>
          <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-100">
            <span className="font-bold text-gray-400">Total Payment</span>
            <span className="text-[17px] font-black text-black">${totalPayment.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white p-3.5 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3 pl-2">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#eb001b] mix-blend-multiply opacity-90"></div>
              <div className="w-8 h-8 rounded-full bg-[#f79e1b] mix-blend-multiply opacity-90"></div>
            </div>
            <span className="font-medium text-[14px] text-gray-500">Credit Card</span>
          </div>
          <button className="text-[12px] font-medium text-gray-400 flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full hover:text-black">
            Change Method <ChevronRight size={14} />
          </button>
        </div>

        <button 
          onClick={handleCheckout} 
          disabled={cartItems.length === 0 || isSubmitting}
          className={`w-full font-bold text-[17px] py-4 rounded-full mt-2 shadow-sm transition-all flex justify-center items-center gap-2
            ${cartItems.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#bbf246] text-black hover:bg-[#aee635] active:scale-[0.98]'}`}
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Continue"}
        </button>
      </div>
    </div>
  );
}