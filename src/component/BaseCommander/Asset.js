import React, { useState } from 'react'

const Asset = ({ asset }) => {
    const [selectedCategory, setSelectedCategory] = useState("")

    const uniqueCategories = [...new Set(asset?.map(a => a.category))];

    // Filtered assets
    const filteredAssets = asset?.map(a => ({ ...a })).filter(a =>
        (selectedCategory ? a.category === selectedCategory : true)
    )

    return (
        <div className="mx-6 my-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                            <p className="text-sm text-gray-600 mb-3"><strong>Price:</strong> {asset?.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Asset
