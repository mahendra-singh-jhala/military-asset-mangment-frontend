import React from 'react'

const BaseOfficers = ({ user }) => {
    return (
        <div className="mt-4 mx-6">
            {/* User Table */}
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                <thead className="bg-gray-200 text-gray-700 text-left text-sm uppercase">
                    <tr>
                        <th className="px-6 py-3 border-b">Officer Role</th>
                        <th className="px-6 py-3 border-b">Officer Name</th>
                        <th className="px-6 py-3 border-b">Officer Email</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {user?.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 border-b">{item?.role}</td>
                            <td className="px-6 py-4 border-b">{item?.name}</td>
                            <td className="px-6 py-4 border-b">{item?.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BaseOfficers
