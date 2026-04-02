import { onAuthStateChanged } from 'firebase/auth';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from "../firebase.config";

interface ProtectedRouteProps {
    children : React.ReactNode;
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [isAuthenticated,setAuthenticated] = useState(false);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user) setAuthenticated(true);
            else{
                alert("Unauthorised");
                navigate("/auth/register");
            }
            setLoading(false);
        });

        return ()=> unsubscribe(); 
    
        },[navigate]);

        if(loading){
            return (
                <div className="flex items-center justify-center min-h-screen">
                  <p className="text-xl">Loading...</p>
                </div>
              );
        }
        
        return isAuthenticated ? <>{children}</> : null;
    };

export default ProtectedRoute;