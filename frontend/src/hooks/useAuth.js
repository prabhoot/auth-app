import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

const useAuth = () => {
  const { global } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!global.isAuthenticated) {
      navigate('/login');
    }
  }, [global, navigate]);

  return global.isAuthenticated;
};
export default useAuth;
