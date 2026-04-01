// src/components/Register.tsx
import React, { useState } from 'react';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'; // Link is better than <a>
import { validateEmail, validatePassword } from '../utils/authvalidation';
import type { AuthErrors } from '../utils/authvalidation';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<AuthErrors>({});
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: AuthErrors = {};

    // 1. Validation Checks
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email address.";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 6 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop execution if there are errors
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/welcome');
    } catch (error: any) {
      // Mapping Firebase errors to our UI
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 p-4">
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col gap-5">
        <h2 className="text-4xl font-[inter] font-bold text-slate-800">Register</h2>
        
        {errors.general && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{errors.general}</p>}

        <div className="flex flex-col gap-1">
          <input 
            type="email" 
            placeholder="Email Address" 
            className={`border-2 p-3 rounded-xl outline-none transition-all ${errors.email ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: undefined })); // Clear error as user types
            }} 
          />
          {errors.email && <span className="text-red-500 text-xs px-1">{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <input 
            type="password" 
            placeholder="Password" 
            className={`border-2 p-3 rounded-xl outline-none transition-all ${errors.password ? 'border-red-400' : 'border-slate-200 focus:border-blue-400'}`}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: undefined }));
            }} 
          />
          {errors.password && <span className="text-red-500 text-xs px-1">{errors.password}</span>}
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer">
          CREATE ACCOUNT
        </button>

        <p className="text-center text-slate-600 mt-2">
          Already have an account? <Link to="/auth/signin" className="text-blue-600 hover:underline font-semibold">Sign In instead</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;