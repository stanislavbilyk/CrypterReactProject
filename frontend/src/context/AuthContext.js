import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// создаём контекст
const AuthContext = createContext();

// создаём "провайдер"
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // проверка при загрузке приложения
useEffect(() => {
    const checkAuth = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get("http://127.0.0.1:8000/api/me/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    checkAuth();
}, []);


    // функция логина
    const login = (token, userData) => {
        console.log("LOGIN CALLED");
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    // функция логаута
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// удобный хук
export const useAuth = () => useContext(AuthContext);