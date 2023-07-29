import { useAuthContext } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'
export default function ProtectedRoute({children, requireAdmin}) {
    const { user } = useAuthContext()
    const nav = useNavigate()
    if (!user) nav('/');
    else if(requireAdmin && !user.isAdmin) nav('/');
    return  children
}

