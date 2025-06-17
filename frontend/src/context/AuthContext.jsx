import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [authenticated, setAuthenticaded] = useState(false);

    useEffect(() => {
     
       
          const token = localStorage.getItem("token");
          if(!token) {
            setAuthenticaded(false);
          }
        
     

    }, [])

    const login = (token) => {
     localStorage.setItem("token", token);
     if(token) {
        setAuthenticaded(true);
     }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setAuthenticaded(false);
    }
    
    
      return  (
            <AuthContext.Provider value={{authenticated, login, logout}}> 
                {children}
            </AuthContext.Provider>
        )

}