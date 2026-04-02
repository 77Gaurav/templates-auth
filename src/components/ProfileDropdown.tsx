import React, { useState, useRef, useEffect } from 'react';
import { signOut, type User } from 'firebase/auth';
import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown: React.FC<{ user: User }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* The Rounded Div (Trigger) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className='rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center cursor-pointer border-2 border-blue-200 hover:bg-blue-200 transition-colors'
      >
        <span className="text-xl">👤</span>
      </div>

      {/* The Popup Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 z-50 animate-in fade-in zoom-in duration-200">
          <div className="flex flex-col gap-4">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-sm text-slate-500 font-medium">User name :</p>
              <p className="text-lg font-bold text-slate-800 truncate">
                {user.displayName || user.email?.split('@')[0] || "User"}
              </p>
            </div>
            
            <button 
              onClick={handleSignOut}
              className="w-full py-2 px-4 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all cursor-pointer border border-red-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;