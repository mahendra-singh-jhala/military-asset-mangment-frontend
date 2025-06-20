import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import api from '../../config/API'
import BaseAsset from '../BaseCommander/BaseAsset'
import Purchase from '../LogisticsOfficer/Purchase'
import AssetTransfer from '../LogisticsOfficer/AssetTransfer'
import Order from '../LogisticsOfficer/Order'
import BaseOfficers from './BaseOfficers'
import { CiLogout } from "react-icons/ci";

const BaseDetailes = () => {
    const [base, setBase] = useState("")
    const { id } = useParams()

    // fetch base
    const fetchBase = async () => {
        try {
            const res = await api.get(`/api/base/${id}`)
            if (res.status === 200) {
                setBase(res.data)
            }
        } catch (error) {
            console.error("Error to fetch base", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchBase()
    }, [id])

    const totalPurchase = base?.base?.purchases.reduce((sum, purchase) => sum + Number(purchase?.asset?.price), 0)
    const closingBalance = Number(base?.base?.openingBalance) - totalPurchase

    const NetMovement = base?.base?.purchases.length + base?.base?.transfer.length

    return (
        <div>
            <header>
                <div className="p-3 bg-slate-600 text-white">
                    <Link to={`/adminDashboard/${id}`} className="text-center">
                        <h1 className="text-xl font-bold font-serif">{base?.base?.name} ({base?.base?.location})</h1>
                    </Link>
                </div>
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
                                <Link to={`/adminDashboard/${id}`}>
                                    BaseOfficers
                                </Link>
                            </li>
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to={`/adminDashboard/${id}/asset`}>
                                    BaseAsset
                                </Link>
                            </li>
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to={`/adminDashboard/${id}/purchase`}>
                                    Purchase
                                </Link>
                            </li>
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to={`/adminDashboard/${id}/order`}>
                                    Order
                                </Link>
                            </li>
                            <li className="px-4 hover:text-slate-600 cursor-pointer">
                                <Link to={`/adminDashboard/${id}/transfer`}>
                                    Transfer
                                </Link>
                            </li>
                        </ul>
                        <Link to="/adminDashboard" className="cursor-pointer">
                            <CiLogout className="text-2xl text-gray-600 hover:text-red-500 transition-colors"
                            />
                        </Link>
                    </div>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<BaseOfficers user={base?.base?.user} baseId={base?.base?._id} />} />
                        <Route path="asset" element={<BaseAsset asset={base?.base?.asset} baseId={base?.base?._id} />} />
                        <Route path="purchase" element={<Purchase purchaseData={base?.base?.purchases} fetchPurchase={fetchBase} />} />
                        <Route path="order" element={<Order id={base?.base?._id} />} />
                        <Route path="transfer" element={<AssetTransfer transferData={base?.base?.transfer} baseId={base?.base?._id} fetchtransfer={fetchBase} />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default BaseDetailes
