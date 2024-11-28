import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';

const useAuth = () => {
  const { getMe } = useGlobalContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }else{
  //     navigate('/dashboard');
  //   }
  // }, [global, navigate]);
  useEffect(() => {
    if (!isAuthenticated) {
      getMe();
    }
  } , [navigate]);

  return global.isAuthenticated;
};
export default useAuth;
