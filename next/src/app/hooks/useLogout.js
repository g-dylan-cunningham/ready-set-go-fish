import useAuthContext from "./useAuthContext";
import { useRouter, redirect } from 'next/navigation';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter()

  const logout = async () => {
    localStorage.removeItem("details");
    dispatch({ type: "LOGOUT" });
    router.push('/login');
  };

  return {
    logout,
  };
};
