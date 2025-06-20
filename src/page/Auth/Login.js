import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import api from '../../config/API';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/api/user/login", { email, password });

            if (res.status === 200) {
                const { token } = res.data;
                const userDetailsRes = await api.get("/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const fullUser = userDetailsRes.data.user;
                login({ token, user: fullUser });
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen max-w-96 flex flex-col items-center justify-center mx-auto text-white">
            <div className="w-full p-6 rounded-lg shadow-lg bg-slate-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0">
                <h1 className="text-2xl font-semibold text-center mb-8 text-black">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block mb-1 text-md text-slate-800 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-400 h-10 p-2 outline-none rounded-md placeholder:text-white"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 text-md text-slate-800 font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-400 h-10 p-2 outline-none rounded-md placeholder:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center px-5 py-2 text-md font-medium text-center bg-gray-500 bg-opacity-50 rounded cursor-pointer mt-5 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:text-slate-900'}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login