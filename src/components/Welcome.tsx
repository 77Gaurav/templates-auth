import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase.config';
import ProfileDropdown from './ProfileDropdown';

const Welcome: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Nav Bar */}
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-6">
        <div className="text-3xl font-bold text-blue-600">Dashboard</div>
        {user && <ProfileDropdown user={user} />}
      </nav>

      <main className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-5xl font-bold text-slate-800">Hello World</h1>
        <p className="text-slate-500 mt-4 text-xl">Welcome back to your account.</p>
      </main>
    </div>
  );
};

export default Welcome;