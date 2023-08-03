import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
export default function ProtectedRoute({children, requireAdmin}) {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
         navigate("/");
      } else if (requireAdmin && !user.isAdmin) {
         navigate("/");
     } 
    })
    return children;
}

