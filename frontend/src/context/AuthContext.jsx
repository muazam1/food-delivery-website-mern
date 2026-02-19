import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isSigned = localStorage.getItem("isSignedIn");
        if (isSigned === "true") {
            const userData = localStorage.getItem("userInfo");
            setUser(userData ? JSON.parse(userData) : { name: "User" });
        }
    }, []);

    const register = async (name, email, password) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("isSignedIn", "true");
                localStorage.setItem("userInfo", JSON.stringify(data));
                localStorage.setItem("token", data.token); // Store token separately
                setUser(data);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("isSignedIn", "true");
                localStorage.setItem("userInfo", JSON.stringify(data));
                localStorage.setItem("token", data.token); // Store token separately
                setUser(data);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("userInfo"); // Also remove userInfo
        localStorage.removeItem("token"); // Remove token
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
