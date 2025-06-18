import React from 'react'
import Navbar from '../../page/Navbar/Navbar'
import { Link } from 'react-router-dom'

const LogisticsOfficerDashboard = () => {
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
                            <span className="font-bold">0</span>
                        </div>
                         <div className="text-center">
                            <h1 className="font-semibold mb-2">Closing Balance</h1>
                            <span className="font-bold">0</span>
                        </div>
                         <div className="text-center">
                            <h1 className="font-semibold mb-2">Net Movement</h1>
                            <span className="font-bold">0</span>
                        </div>
                    </div>
                </div>
                <div className="mx-5 my-12">
                    <div className="border-b-2 p-2">
                        <ul className="flex space-x-4 font-bold">
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="/">
                                    Asset
                                </Link>
                            </li>
                            <li className="border-r-2 px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="/">
                                    Purchase
                                </Link>
                            </li>
                            <li className="px-4 hover:text-slate-600 cursor-pointer">
                                <Link to="">
                                    Transfer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LogisticsOfficerDashboard
