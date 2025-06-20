import React, { useEffect, useState } from 'react'
import Navbar from '../../page/Navbar/Navbar'
import { Link, Route, Routes } from 'react-router-dom'
import Asset from './Asset'
import Purchase from './Purchase'
import AssetTransfer from './AssetTransfer'
import api from '../../config/API'
import { useAuth } from '../../context/AuthContext'
import Order from './Order'
import { LuLogOut } from "react-icons/lu";

const LogisticsOfficerDashboard = () => {
    const [base, setBase] = useState("")
    const { auth, logout } = useAuth()

    // fetch base
    const fetchBase = async () => {
        try {
            const res = await api.get(`/api/base/${auth?.user?.baseId._id}`)
            if (res.status === 200) {
                setBase(res.data)
            }
        } catch (error) {
            console.error("Error to fetch base", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchBase()
    }, [auth?.user?.baseId._id])

    const totalPurchase = base?.base?.purchases.reduce((sum, purchase) => sum + Number(purchase?.asset?.price), 0)
    const closingBalance = Number(base?.base?.openingBalance) - totalPurchase

    const NetMovement = base?.base?.purchases.length + base?.base?.transfer.length

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="mt-4">
                <div className="border-2 border-black rounded-lg py-4 px-6 mx-4">
                    <div className="flex items-center justify-between space-x-3">
                        <div className="text-center">
                            <h1 className="font-semibold mb-2">Opening Balance</h1>
                            <span className="font-bold">{base?.base?.openingBalance}</span>
                        </div>
                        <div className="text-center">
                            <h1 className="font-semibold mb-2">Closing Balance</h1>
                            <span className="font-bold">{closingBalance}</span>
                        </div>
                        <div className="text-center">
                            <h1 className="font-semibold mb-2">Net Movement</h1>
                            <span className="font-bold">{NetMovement}</span>
                        </div>
                    </div>
                </div>
                <div className="mx-5 my-12">
                    <div className="border-b-2 p-2 flex flex-wrap justify-between items-center">
                        <ul className="flex space-x-4 font-bold">
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="/logisticsOfficerDashboard">
                                    Asset
                                </Link>
                            </li>
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="/logisticsOfficerDashboard/purchase">
                                    Purchase
                                </Link>
                            </li>
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="/logisticsOfficerDashboard/order">
                                    Order
                                </Link>
                            </li>
                            <li className="px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="/logisticsOfficerDashboard/transfer">
                                    Transfer
                                </Link>
                            </li>
                        </ul>
                        <div className="cursor-pointer">
                            <LuLogOut onClick={logout} className="text-2xl text-gray-600 hover:text-red-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<Asset baseId={base?.base?._id} />} />
                        <Route path="purchase" element={<Purchase purchaseData={base?.base?.purchases} fetchPurchase={fetchBase} baseId={base?.base?._id} />} />
                        <Route path="order" element={<Order id={base?.base?._id} />} />
                        <Route path="transfer" element={<AssetTransfer transferData={base?.base?.transfer} baseId={base?.base?._id} fetchtransfer={fetchBase} />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default LogisticsOfficerDashboard
