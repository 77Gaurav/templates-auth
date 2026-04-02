import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl font-semibold mt-4">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">The route you are looking for doesn't exist.</p>
      
      <button 
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;