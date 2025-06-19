import React, { useEffect, useState } from 'react';
import api from '../../config/API';
import { useNavigate } from 'react-router-dom';

const Asset = ({ baseId }) => {
    const [asset, setAsset] = useState([])
    const [selectedBase, setSelectedBase] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [purchaseAsset, setPurchaseAsset] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState("")
    const navigate = useNavigate()

    // fetch asset
    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const res = await api.get("/api/asset")
                if (res.status === 200) {
                    setAsset(res.data.asset)
                }
            } catch (error) {
                console.error("Error to fetch base", error.response?.data || error.message);
            }
        }

        fetchAsset()
    }, [])

    const uniqueBases = [...new Set(asset.map(a => a.base?.name))];
    const uniqueCategories = [...new Set(asset.map(a => a.category))];

    // Filtered assets
    const filteredAssets = asset.map(a => ({ ...a, baseName: a.base?.name || '' })).filter(a =>
        (selectedBase ? a.baseName === selectedBase : true) &&
        (selectedCategory ? a.category === selectedCategory : true)
    );

    // Open modal and set the selected asset
    const openModal = (asset) => {
        setPurchaseAsset(asset);
        setQuantity(1);
        setPurchaseDate("");
        setShowModal(true);
    };

    // Handle purchase 
    const handlePurchase = async (e) => {
        e.preventDefault();
        const orderData = { asset: purchaseAsset?._id, assetbaseId: purchaseAsset?.base?._id, baseId, quantity, date: purchaseDate }
        try {
            const res = await api.post("/api/order", orderData)
            if (res.status === 200) {
                navigate("/logisticsOfficerDashboard/purchase")
            }
        } catch (error) {
            console.error("Error to create Order", error);
        }

    };

    return (
        <div className="mx-6 my-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Asset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredAssets?.map((asset) => (
                    <div key={asset._id} className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{asset?.name}</h2>
                            <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {asset?.category}</p>
                            <p className="text-sm text-gray-600 mb-1"><strong>Base:</strong> {asset?.base?.name}</p>
                            <p className="text-sm text-gray-600 mb-3"><strong>Price:</strong> {asset?.price}</p>
                        </div>
                        <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={() => openModal(asset)}>
                            Add to Purchase
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
                        <h3 className="text-lg font-semibold mb-4">Purchase {purchaseAsset.name}</h3>

                        <label className="block mb-2">
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                className="border border-gray-300 rounded w-full mt-1 px-3 py-2"
                            />
                        </label>

                        <label className="block mb-4">
                            Purchase Date:
                            <input
                                type="date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                className="border border-gray-300 rounded w-full mt-1 px-3 py-2"
                            />
                        </label>

                        <div className="flex justify-end gap-4">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition">
                                Cancel
                            </button>
                            <button onClick={handlePurchase} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Asset