import React, { useEffect, useState } from 'react';

const AssetTransfer = ({ transferData, baseId, fetchtransfer }) => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    // Filter the data based on transferDate within the selected range
    const filteredData = transferData?.filter(transferDate => {
        const transfer = new Date(transferDate.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || transfer >= start) && (!end || transfer <= end);
    });

    // refresh transfer
    useEffect(() => {
        fetchtransfer()
    }, [])

    return (
        <div className="mx-6">
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

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                    <thead className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                        <tr>
                            <th className="px-6 py-3 border-b">From Base</th>
                            <th className="px-6 py-3 border-b">To Base</th>
                            <th className="px-6 py-3 border-b">Asset Name</th>
                            <th className="px-6 py-3 border-b">Purchase Date</th>
                            <th className="px-6 py-3 border-b">Transfer Date</th>
                            <th className="px-6 py-3 border-b">Transfer (In-Out)</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {filteredData?.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b">{item?.toBase?.name}</td>
                                <td className="px-6 py-4 border-b">{item?.fromBase?.name}</td>
                                <td className="px-6 py-4 border-b">{item?.purchase?.asset?.name}</td>
                                <td className="px-6 py-4 border-b">{new Date(item?.purchase?.date).toISOString().split('T')[0]}</td>
                                <td className="px-6 py-4 border-b">{new Date(item?.date).toISOString().split('T')[0]}</td>
                                <td className="px-6 py-4 border-b uppercase">
                                    <span className={item?.fromBase?._id !== baseId ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                                        {item?.fromBase?._id !== baseId ? "Transfer Out" : "Transfer In"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetTransfer