import { useState } from "react";
import { BACKEND_URL } from "../config/serverConfig";
import useAuthContext from "./useAuthContext";


function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();

    if(!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  }

  return { login, isLoading, error }
} 


export default useLogin;