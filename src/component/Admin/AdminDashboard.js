import React, { useEffect, useState } from 'react'
import Navbar from '../../page/Navbar/Navbar'
import { Link } from 'react-router-dom'
import api from '../../config/API'
import { LuLogOut } from 'react-icons/lu'
import { useAuth } from '../../context/AuthContext'

const AdminDashboard = () => {
    const [base, setBase] = useState([])
    const [selectedBase, setSelectedBase] = useState("")
    const { logout } = useAuth()

    // fetch base
    useEffect(() => {
        const fetchBase = async () => {
            try {
                const res = await api.get("/api/base")
                if (res.status === 200) {
                    setBase(res.data.bases)
                }
            } catch (error) {
                console.error("Error to fetch base", error.response?.data || error.message);
            }
        }
        fetchBase()
    }, [])

    const uniqueBases = [...new Set(base.map(a => a?.name))]

    // Filtered assets
    const filteredbase = base.map(a => ({ ...a, baseName: a?.name || '' })).filter(a =>
        (selectedBase ? a.baseName === selectedBase : true)
    )

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="mt-4 mx-6">
                {/* Filters */}
                <div className="flex flex-col items-center justify-between sm:flex-row gap-4 mb-6">
                    <select
                        className="border border-gray-300 rounded px-4 py-2"
                        value={selectedBase}
                        onChange={(e) => setSelectedBase(e.target.value)}
                    >
                        <option value="">All Bases</option>
                        {uniqueBases.map((base, idx) => (
                            <option key={idx} value={base}>{base}</option>
                        ))}
                    </select>
                    <div className="cursor-pointer">
                        <LuLogOut onClick={logout} className="text-2xl text-gray-600 hover:text-red-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Base Table */}
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                    <thead className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                        <tr>
                            <th className="px-6 py-3 border-b">Base ID</th>
                            <th className="px-6 py-3 border-b">Base Name</th>
                            <th className="px-6 py-3 border-b">Base Location</th>
                            <th className="px-6 py-3 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {filteredbase?.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b">{item?._id}</td>
                                <td className="px-6 py-4 border-b">{item?.name}</td>
                                <td className="px-6 py-4 border-b">{item?.location}</td>
                                <td className="px-6 py-4 border-b">
                                    <Link to={`/adminDashboard/${item?._id}`} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                                        Show Deteails
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default AdminDashboard
