import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { auth } = useAuth()



    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-3 bg-slate-600 text-white">
            {auth?.user?.role !== "Admin" ? (
                <Link to="/" className="flex items-center mb-2 md:mb-0">
                    <h1 className="text-xl font-bold font-serif">{auth?.user?.baseId?.name} ({auth?.user?.baseId?.location})</h1>
                </Link>
            ) : (
                <h1 className="text-xl font-bold font-serif uppercase">
                    Military
                </h1>
            )}
            <h1 className="text-md font-medium text-center md:text-right">
                <span className="text-xl font-bold font-serif">{auth?.user?.name}</span> ({auth?.user?.role})
            </h1>
        </div>

    )
}

export default Navbar
