import React from 'react';
import { Bell, Settings, UserPlus, Menu, ShoppingCart } from 'lucide-react';

export default function Header({ onMenuClick, onCartClick }) {
  return (
    <header className="flex justify-between items-center mb-6 sm:mb-8 pt-2">
  
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2.5 bg-white border border-[#eaeaea] rounded-full shadow-sm text-gray-800 hover:bg-gray-50"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">Create Transaction</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        
        <button 
          onClick={onCartClick}
          className="xl:hidden relative flex items-center gap-2 bg-[#bbf246] px-4 py-2.5 sm:w-[46px] sm:h-[46px] sm:p-0 sm:justify-center rounded-full text-black shadow-sm hover:bg-[#aee635] transition-colors"
        >
          <ShoppingCart size={18} strokeWidth={2.5} />
          <span className="text-sm font-bold sm:hidden">Cart</span>
          <span className="absolute top-0 right-0 sm:top-2 sm:right-2 w-2.5 h-2.5 bg-[#eb001b] rounded-full border-2 border-white"></span>
        </button>

        <div className="hidden lg:flex items-center gap-3">
          <button className="relative w-[46px] h-[46px] flex items-center justify-center bg-white border border-[#eaeaea] rounded-full text-gray-800 hover:bg-gray-50 transition-all shadow-sm">
            <Bell size={20} strokeWidth={2.5} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#eb001b] rounded-full border-2 border-white"></span>
          </button>

          <button className="w-[46px] h-[46px] flex items-center justify-center bg-white border border-[#eaeaea] rounded-full text-gray-800 hover:bg-gray-50 transition-all shadow-sm">
            <Settings size={20} strokeWidth={2.5} />
          </button>

          <div className="w-[1.5px] h-8 bg-gray-200 mx-1.5 rounded-full"></div>

          <div className="flex -space-x-3">
            <img src="https://i.pravatar.cc/100?img=1" alt="Team 1" className="w-[46px] h-[46px] rounded-full border-[3px] border-white object-cover shadow-sm relative z-30" />
            <img src="https://i.pravatar.cc/100?img=5" alt="Team 2" className="w-[46px] h-[46px] rounded-full border-[3px] border-white object-cover shadow-sm relative z-20" />
            <img src="https://i.pravatar.cc/100?img=3" alt="Team 3" className="w-[46px] h-[46px] rounded-full border-[3px] border-white object-cover shadow-sm relative z-10" />
          </div>

          <button className="ml-1 flex items-center gap-2.5 bg-[#fbfbfb] border border-[#eaeaea] px-6 py-3 rounded-full text-[15px] font-bold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors">
            <UserPlus size={18} strokeWidth={2.5} /> New Access
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm border border-gray-100 sm:ml-2" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hidden lg:block ml-1">
            <polyline points="9 18 3 12 9 6"></polyline>
            <polyline points="15 6 21 12 15 18"></polyline>
          </svg>
        </div>
        
      </div>
    </header>
  );
}