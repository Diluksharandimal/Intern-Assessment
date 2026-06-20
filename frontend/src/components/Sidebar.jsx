import React from 'react';
import { Home, Users, Package, DollarSign, Clock, UserPlus, Link2, LogOut, X } from 'lucide-react';
import logo from '../assets/logo.png'; 
import transc from '../assets/transc.png';
import money from '../assets/money.png';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      w-[80px] bg-[#1a1c21] h-full flex flex-col items-center py-6 justify-between flex-shrink-0 md:rounded-r-2xl
      overflow-y-auto md:overflow-visible
    `}>
      
      {/* Mobile Close Button - Adjusted position to prevent going off-screen */}
      <button 
        onClick={onClose} 
        className="md:hidden absolute right-[-48px] top-4 bg-[#1a1c21] p-2.5 rounded-xl text-white shadow-lg border border-gray-800 flex items-center justify-center z-50"
      >
        <X size={22} />
      </button>

      <div className="flex flex-col items-center gap-8 w-full mt-2">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 overflow-hidden shadow-sm">
           <img src={logo} alt="Company Logo" className="w-12 h-12 object-contain" />
        </div>
        
        <nav className="flex flex-col gap-6 w-full items-center">
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><Home size={20} /></button>
          <button className="p-3 bg-[#cbf169] text-black rounded-xl shadow-lg"><img src={transc} alt="Transc Logo" className="w-5 h-5" /></button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><Package size={20} /></button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><img src={money} alt="Money Logo" className="w-5 h-5" /></button>
          <div className="h-[1px] w-8 bg-gray-700 my-2"></div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><Clock size={20} /></button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><UserPlus size={20} /></button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors"><Link2 size={20} /></button>
        </nav>
      </div>
      
      <button className="p-2 text-red-400 hover:text-red-300 transition-colors mt-auto">
        <LogOut size={20} />
      </button>
    </div>
  );
}