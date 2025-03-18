import { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";

const useAuth = () => {
  const { getMe, isAuthenticated, setIsAuthenticated } = useGlobalContext(); // Ensure setIsAuthenticated is available

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getMe();
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsAuthenticated(false); // Mark user as unauthenticated
      }
    };

    fetchUser(); // Initial call

    const interval = setInterval(fetchUser, 30*60000); // Refresh auth every 60 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Dependencies

  return isAuthenticated;
};

export default useAuth;