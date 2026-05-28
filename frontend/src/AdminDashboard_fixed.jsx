import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        // Sort by newest first
        setOrders(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  }, []);

  const handleComplete = (orderId) => {
    fetch(`/api/admin/orders/${orderId}/complete`, { method: 'PATCH' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: 'completed' } : o));
        }
      })
      .catch(err => console.error('Error completing order:', err));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'completed' && order.status === 'completed') ||
      (statusFilter === 'pending' && order.status !== 'completed');

    const matchesDate = 
      !dateFilter || 
      new Date(order.serverTimestamp).toISOString().split('T')[0] === dateFilter;

    const matchesSearch = 
      !searchQuery ||
      order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.includes(searchQuery);

    return matchesStatus && matchesDate && matchesSearch;
  });

  if (loading) return <div className="p-10 text-center">Loading Orders...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <div className="mt-1 text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[200px]">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input 
                type="text" 
                placeholder="Search name or phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl text-xs font-bold pl-9 p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['all', 'pending', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    statusFilter === status 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Date Filter */}
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-gray-100 border-none rounded-xl text-xs font-bold p-2 focus:ring-2 focus:ring-green-500"
            />
            {dateFilter && (
              <button onClick={() => setDateFilter('')} className="text-gray-400 hover:text-red-500">
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date/ID</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Delivery Slot</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Items</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Status / Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, idx) => (
                  <tr key={idx} className={`hover:bg-gray-50 transition-colors ${order.status === 'completed' ? 'bg-gray-50/50 opacity-75' : ''}`}>
                    <td className="p-4">
                      <div className="text-sm font-bold text-gray-900">{order.orderId}</div>
                      <div className="text-[10px] text-gray-400">{new Date(order.serverTimestamp).toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-gray-800">{order.name}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-bold text-gray-700">{order.deliveryDate || 'N/A'}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{order.timeSlot || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-gray-600 whitespace-pre-wrap max-w-md line-clamp-3">
                        {order.items}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {order.gymPromoCode && (
                            <div className="text-[10px] text-orange-500 font-bold">Code: {order.gymPromoCode}</div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2 mt-4">
                          <div className="text-sm font-black text-green-700">₹{order.totalPrice}</div>
                          {order.status === 'completed' ? (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Completed</span>
                          ) : (
                            <button 
                              onClick={() => handleComplete(order.orderId)}
                              className="bg-gray-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase hover:bg-black transition-colors"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredOrders.map((order, idx) => (
              <div key={idx} className={`p-4 border-b border-gray-200 ${order.status === 'completed' ? 'bg-gray-50/50 opacity-75' : 'hover:bg-gray-50'} transition-colors flex flex-col min-h-[200px]`}>
                {/* Top Section - All Content */}
                <div className="flex-1">
                  {/* Order ID & Date */}
                  <div className="mb-3">
                    <div className="text-sm font-bold text-gray-900">{order.orderId}</div>
                    <div className="text-[10px] text-gray-400">{new Date(order.serverTimestamp).toLocaleString()}</div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-3">
                    <div className="text-xs font-bold text-gray-600 uppercase mb-1">Customer</div>
                    <div className="text-sm font-semibold text-gray-800">{order.name}</div>
                    <div className="text-xs text-gray-500">{order.phone}</div>
                  </div>

                  {/* Delivery Info */}
                  <div className="mb-3">
                    <div className="text-xs font-bold text-gray-600 uppercase mb-1">Delivery</div>
                    <div className="text-xs font-bold text-gray-700">{order.deliveryDate || 'N/A'}</div>
                    <div className="text-[10px] text-gray-500">{order.timeSlot || 'N/A'}</div>
                  </div>

                  {/* Items */}
                  <div>
                    <div className="text-xs font-bold text-gray-600 uppercase mb-1">Items</div>
                    <div className="text-xs text-gray-600 whitespace-pre-wrap">
                      {order.items}
                    </div>
                  </div>

                  {/* Promo Code */}
                  {order.gymPromoCode && (
                    <div className="mt-3">
                      <div className="text-[10px] text-orange-500 font-bold">PROMO: {order.gymPromoCode}</div>
                    </div>
                  )}
                </div>

                {/* Bottom-Right Section - Price & Status */}
                <div className="flex justify-end items-end gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-right">
                    <div className="text-lg font-black text-green-700">₹{order.totalPrice}</div>
                    {order.status === 'completed' ? (
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase mt-2">Completed</span>
                    ) : (
                      <button 
                        onClick={() => handleComplete(order.orderId)}
                        className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase mt-2 hover:bg-yellow-200 transition-colors"
                      >
                        Pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
