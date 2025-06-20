import React, { useEffect, useState } from 'react'

const Purchase = ({ purchaseData, fetchPurchase, baseId }) => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const filteredData = purchaseData?.filter(row => {
        const rowDate = new Date(row.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || rowDate >= start) && (!end || rowDate <= end);
    });

    // refresh purchase
    useEffect(() => {
        fetchPurchase()
    }, [baseId])

    return (
        <div className="overflow-x-auto mx-6 my-4">
            {/* Date Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 text-sm"
                    />
                </div>
            </div>

            {/* Purchase Table */}
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                <thead className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                    <tr>
                        <th className="px-6 py-3 border-b">Asset Name</th>
                        <th className="px-6 py-3 border-b">Base (Purchased From)</th>
                        <th className="px-6 py-3 border-b">Quantity</th>
                        <th className="px-6 py-3 border-b">Date</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {filteredData?.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{item?.asset?.name}</td>
                            <td className="px-6 py-4 border-b">{item?.assetbaseId?.name}</td>
                            <td className="px-6 py-4 border-b">{item.quantity}</td>
                            <td className="px-6 py-4 border-b">{new Date(item.date).toISOString().split('T')[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Purchase
