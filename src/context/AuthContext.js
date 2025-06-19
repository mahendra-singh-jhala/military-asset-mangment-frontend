import { useState, useEffect, useContext, createContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            const parsed = JSON.parse(storedAuth)
            setAuth(parsed)
        }
        setLoading(false)
    }, [])

    const login = (userData) => {
        localStorage.setItem("auth", JSON.stringify(userData))
        setAuth(userData)
        const role = userData.user?.role;

        if (role === "Admin") {
            navigate("/adminDashboard");
        } else if (role === "BaseCommander") {
            navigate("/commanderDashboard");
        } else if (role === "LogisticsOfficer") {
            navigate("/logisticsOfficerDashboard");
        } else {
            navigate("/login")
        }
    }

    const logout = () => {
        localStorage.removeItem("auth")
        setAuth(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                logout,
                isAuthenticated: !!auth,
                role: auth?.user?.role || null,
                loading,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}


const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }