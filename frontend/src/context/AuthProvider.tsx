import {createContext, ReactElement, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext<{ token: string | undefined, login: (credentials: { username: string, password: string }) => void }>({
    token: undefined,
    login: () => {
        toast.error("Login not initialised")
    }
})

export type AuthProviderProps = {
    children: ReactElement<any, any>
}

export default function AuthProvider({children}: AuthProviderProps) {
    const [token, setToken] = useState<string>()
    const navigate = useNavigate();

    const login = (credentials: { username: string, password: string }) => {
        axios.post('/auth/login', credentials)
            .then(response => response.data)
            .then((token) => setToken(token))
            .then(() => navigate("/"))
            .catch(() => toast.error("Credentials invalid"))
    }

    return (
        <AuthContext.Provider value={{token, login}}>
            {children}
        </AuthContext.Provider>
    )
}
