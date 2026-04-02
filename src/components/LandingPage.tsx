import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase.config';

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // This hook now has access to the Router context

  const handleGoogleSignIn = async (): Promise<void> => {
    try{
      await signInWithPopup(auth, googleProvider);
      navigate('/welcome');
      }
    catch (error){
      if(error instanceof Error)
        console.error("Error during signin",error.message);
    }
  }; 

  return (
    <div>
      <nav className="flex justify-between items-center max-w-7xl mx-auto mt-5 bg-green-100 text-5xl font-[inter]">
        <div className="">ABC</div>
        <div className="flex items-center justify-center">
          <button onClick={() => navigate('/')} className='px-8 text-3xl cursor-pointer'>Home</button>
          <Link to="#" className='px-8 text-3xl'>About</Link>
          <Link to="#" className='px-8 text-3xl'>Career</Link>
        </div>
      </nav>
      
      <main className="flex justify-between items-center max-w-7xl min-h-[400px] mx-auto bg-amber-100 mt-10 p-10">
        <h1 className="text-6xl font-bold">Hero Section  </h1>
      </main>

      <section className="flex justify-center items-center max-w-7xl mx-auto gap-3 mt-10">
        <button 
          onClick={() => navigate('/auth/register')}
          className="cursor-pointer px-4 py-2 text-2xl rounded-2xl w-sm bg-sky-100 border-2 border-blue-200 hover:bg-blue-200 transition-all"
        >
          REGISTER
        </button>
        
        <button 
          onClick={() => navigate('/auth/signin')}
          className="cursor-pointer px-4 py-2 text-2xl rounded-2xl w-sm bg-sky-100 border-2 border-blue-200 hover:bg-blue-200 transition-all"
        >
          SIGN IN
        </button>

        <button 
          className="cursor-pointer px-4 py-2 text-2xl rounded-2xl w-sm bg-sky-100 border-2 border-blue-200 hover:bg-blue-200 transition-all"
          onClick={handleGoogleSignIn} 
        >
          SIGN IN WITH GOOGLE
        </button>
      </section>
    </div>
  );
};

export default LandingPage;