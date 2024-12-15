'use client';

import { useHotelAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  BanknotesIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#FF9999', '#FFB366', '#FFCC66', '#FFB366'];
const REVENUE_COLOR = '#FF8080';
const ORDERS_COLOR = '#FFB366';

export default function Dashboard() {
  const { user } = useHotelAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('today');
  const [customDates, setCustomDates] = useState({
    from: '',
    to: ''
  });

  const getDateRange = (range) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const from = new Date();
    from.setHours(0, 0, 0, 0);

    switch (range) {
      case 'today':
        return { from, to: today };
      
      case 'yesterday': {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        return { 
          from: yesterday, 
          to: new Date(yesterday.setHours(23, 59, 59, 999))
        };
      }
      
      case 'week': {
        const weekStart = new Date(from);
        weekStart.setDate(weekStart.getDate() - 7);
        return { from: weekStart, to: today };
      }
      
      case 'month': {
        const monthStart = new Date(from);
        monthStart.setDate(monthStart.getDate() - 30);
        return { from: monthStart, to: today };
      }
      
      case 'year': {
        const yearStart = new Date(from);
        yearStart.setFullYear(yearStart.getFullYear() - 1);
        return { from: yearStart, to: today };
      }
      
      case 'custom':
        return {
          from: new Date(`${customDates.from}T00:00:00`),
          to: new Date(`${customDates.to}T23:59:59`)
        };
      
      default:
        return { from, to: today };
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { from, to } = getDateRange(dateRange);

      const response = await fetch('/api/hotel/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: from.toISOString().split('T')[0],
          to: to.toISOString().split('T')[0],
        }),
      });

      const data = await response.json();
      
      if (data.returncode === 200) {
        console.log(data.output);
        setDashboardData(data.output);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange === 'custom' && (!customDates.from || !customDates.to)) {
      return;
    }
    fetchDashboardData();
  }, [dateRange, customDates]);

  const stats = [
    { 
      name: 'Total Orders', 
      icon: CalendarDaysIcon, 
      value: loading ? '---' : dashboardData?.Orders?.All_Order || 0,
      // change: '+4.75%' 
    },
    { 
      name: 'Total Revenue', 
      icon: BanknotesIcon, 
      value: loading ? '$---' : `₹${dashboardData?.Amount?.All_Order?.toLocaleString() || 0}`,
      // change: '+54.02%' 
    },
    { 
      name: 'Dine-In Orders', 
      icon: UserGroupIcon, 
      value: loading ? '---' : dashboardData?.Orders?.Dine_In || 0,
      // change: '-1.39%' 
    },
    { 
      name: 'Online Orders', 
      icon: ChartBarIcon, 
      value: loading ? '---' : ((dashboardData?.Orders?.Swiggy || 0) + (dashboardData?.Orders?.Zomato || 0)),
      // change: '+10.18%' 
    }
  ];

  const formatChartData = (data) => {
    if (!data?.Chart?.All_Order) return [];
    return data.Chart.All_Order.Date.map((date, index) => ({
      date,
      orders: data.Chart.All_Order.Count[index],
      amount: data.Chart.All_Order.Amount[index],
    }));
  };

  const formatPieChartData = (data) => {
    if (!data?.Orders) return [];
    return [
      { name: 'Dine-In', value: data.Orders.Dine_In || 0 },
      { name: 'Takeaway', value: data.Orders.Takeaway || 0 },
      { name: 'Swiggy', value: data.Orders.Swiggy || 0 },
      { name: 'Zomato', value: data.Orders.Zomato || 0 },
    ].filter(item => item.value > 0);
  };

  const formatOrderId = (originalId, index) => {
    const shortId = String(index + 1).padStart(4, '0');
    return `ORDER${shortId}`;
  };

  const hasData = (data) => {
    return data?.Orders?.All_Order > 0 || data?.Amount?.All_Order > 0;
  };

  return (
    <div className='p-4'>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, {user[0]?.hotelName}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Here&apos;s what&apos;s happening with your hotel today.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-sm font-medium text-gray-700 bg-transparent border-0 cursor-pointer focus:ring-0 focus:outline-none pr-8"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateRange === 'custom' && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-px bg-gray-300"></div>
              <input
                type="date"
                value={customDates.from}
                onChange={(e) => setCustomDates(prev => ({ ...prev, from: e.target.value }))}
                className="text-sm border-0 py-1 px-2 rounded focus:ring-1 focus:ring-red-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="date"
                value={customDates.to}
                onChange={(e) => setCustomDates(prev => ({ ...prev, to: e.target.value }))}
                className="text-sm border-0 py-1 px-2 rounded focus:ring-1 focus:ring-red-500"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <dl
              key={item.name}
              className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-red-500 rounded-md p-3">
                  <item.icon className="h-6 w-6 text-white" aria-label='icons' aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                {/* <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p> */}
              </dd>
            </dl>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8">
        {/* Large Sales Trend Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Sales Analytics
            </h2>
            <div className="flex gap-2 text-sm">
              <span className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-[#FF8080] mr-1"></span>
                Revenue
              </span>
              <span className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-[#FFB366] mr-1"></span>
                Orders
              </span>
            </div>
          </div>
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            <div 
              className={`transition-all duration-500 ease-in-out ${
                hasData(dashboardData) ? 'h-[500px]' : 'h-[200px]'
              }`}
            >
              {hasData(dashboardData) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={formatChartData(dashboardData)}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8080" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF8080" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFB366" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFB366" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `₹${value.toLocaleString()}`}
                      label={{ value: 'Revenue (₹)', angle: -90, position: 'insideLeft', offset: -5 }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Orders', angle: 90, position: 'insideRight', offset: 10 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => {
                        if (name === 'amount') return [`₹${value.toLocaleString()}`, 'Revenue'];
                        return [value, 'Orders'];
                      }}
                      labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#FFB366"
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                      name="orders"
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="amount"
                      stroke="#FF8080"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      name="amount"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <p className="text-lg mb-2">No data available</p>
                    <p className="text-sm">Select a different date range to view sales analytics</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Two Column Layout for Pie Chart and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Distribution Pie Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Order Distribution
            </h2>
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : (
              <div 
                className={`transition-all duration-500 ease-in-out ${
                  hasData(dashboardData) ? 'h-[300px]' : 'h-[150px]'
                }`}
              >
                {hasData(dashboardData) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={formatPieChartData(dashboardData)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {formatPieChartData(dashboardData).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            stroke="none"
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} orders (${((value / dashboardData?.Orders?.All_Order) * 100).toFixed(1)}%)`, name]}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => {
                          const { payload } = entry;
                          return `${value} (${payload.value} orders)`;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <p className="text-lg mb-2">No orders to display</p>
                      <p className="text-sm">Select a different date range to view order distribution</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Orders
              </h2>
              <span className="text-sm text-gray-500">Last 5 orders</span>
            </div>
            {loading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : dashboardData?.Table?.All?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dashboardData.Table.All.slice(0, 5).map((order, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatOrderId(order._id, index)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.Type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.TotalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No recent orders to display.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
