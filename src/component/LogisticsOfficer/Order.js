import React, { useEffect, useState } from 'react';
import api from '../../config/API';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Order = ({ id }) => {
    const [order, setOrder] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [transferDate, setTransferDate] = useState("")
    const { auth } = useAuth()
    const navigate = useNavigate()

    // fetch order
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/api/order/${id}`);
                if (res.status === 200) {
                    setOrder(res.data?.order);
                }
            } catch (error) {
                console.error("Error to fetch Order", error.response?.data || error.message);
            }
        };

        fetchOrder();
    }, [id]);

    // Open modal and set the selected order
    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // Handle transfer one base to another base
    const handleTransfer = async () => {
        const transferData = { baseId: selectedItem?.baseId._id, toBaseId: selectedItem?.assetbaseId._id, purchaseId: selectedItem._id, date: transferDate }
        try {
            const res = await api.post("/api/transfer", transferData);
            if (res.status === 200) {
                navigate("/logisticsOfficerDashboard/transfer")
            }
        } catch (error) {
            console.error("Error transferring order", error.response?.data || error.message);
        }
    };

    return (
        <div className="overflow-x-auto mx-6 my-4">
            {/* Table */}
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                <thead className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                    <tr>
                        <th className="px-6 py-3 border-b">Asset Name</th>
                        <th className="px-6 py-3 border-b">Base (Purchase)</th>
                        <th className="px-6 py-3 border-b">Quantity</th>
                        <th className="px-6 py-3 border-b">Date</th>
                        {auth?.user?.role !== "Admin" && (
                            <th className="px-6 py-3 border-b">Action</th>
                        )}
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {order?.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{item?.asset?.name}</td>
                            <td className="px-6 py-4 border-b">{item?.baseId?.name}</td>
                            <td className="px-6 py-4 border-b">{item.quantity}</td>
                            <td className="px-6 py-4 border-b">{new Date(item.date).toISOString().split('T')[0]}</td>
                            {auth?.user?.role !== "Admin" && (
                                <td className="px-6 py-4 border-b">
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={() => handleOpenModal(item)}>
                                        Transfer
                                    </button>
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Transfer Asset</h2>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Select Date
                        </label>
                        <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={transferDate}
                            onChange={(e) => setTransferDate(e.target.value)}
                        />
                        <div className="flex justify-end mt-4 gap-2">
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleTransfer}>
                                Transfer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
