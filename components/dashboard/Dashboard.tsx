'use client';

import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import LineChart from './LineChart';

// Sample data for sales pipeline
const salesPipelineData = [
  { label: 'Prospects', value: 45, color: '#3B82F6' },
  { label: 'Qualified Leads', value: 30, color: '#10B981' },
  { label: 'Proposals', value: 20, color: '#F59E0B' },
  { label: 'Negotiations', value: 15, color: '#EF4444' },
  { label: 'Closed Won', value: 12, color: '#8B5CF6' },
];

// Sample data for booking trends
const bookingTrendsData = [
  { label: 'Jan', value: 25 },
  { label: 'Feb', value: 30 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 35 },
  { label: 'May', value: 50 },
  { label: 'Jun', value: 60 },
  { label: 'Jul', value: 55 },
  { label: 'Aug', value: 70 },
  { label: 'Sep', value: 65 },
  { label: 'Oct', value: 80 },
  { label: 'Nov', value: 75 },
  { label: 'Dec', value: 90 },
];

// Sample data for revenue trends
const revenueTrendsData = [
  { label: 'Q1 2024', value: 125000 },
  { label: 'Q2 2024', value: 150000 },
  { label: 'Q3 2024', value: 180000 },
  { label: 'Q4 2024', value: 200000 },
  { label: 'Q1 2025', value: 220000 },
];

// Sample data for booking status
const bookingStatusData = [
  { label: 'Confirmed', value: 120, color: '#10B981' },
  { label: 'Pending', value: 35, color: '#F59E0B' },
  { label: 'Cancelled', value: 15, color: '#EF4444' },
  { label: 'Completed', value: 80, color: '#8B5CF6' },
];

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className = '' }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate summary statistics
  const totalBookings = bookingStatusData.reduce((sum, item) => sum + item.value, 0);
  const totalRevenue = revenueTrendsData[revenueTrendsData.length - 1].value;
  const totalPipelineValue = salesPipelineData.reduce((sum, item) => sum + item.value, 0);
  const conversionRate = ((salesPipelineData[4].value / salesPipelineData[0].value) * 100);

  // Prevent hydration mismatch by not rendering charts until mounted
  if (!isMounted) {
    return (
      <div className={`min-h-screen bg-gray-50 p-6 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your sales pipeline and booking performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-green-600">+8% from last quarter</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900">{totalPipelineValue}</p>
                <p className="text-sm text-blue-600">Active prospects</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
                <p className="text-sm text-green-600">+2.1% from last month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Pipeline Chart */}
          <PieChart 
            data={salesPipelineData} 
            title="Sales Pipeline Distribution"
            size={300}
          />

          {/* Booking Status Chart */}
          <PieChart 
            data={bookingStatusData} 
            title="Booking Status Overview"
            size={300}
          />
        </div>

        {/* Line Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Trends */}
          <LineChart
            data={bookingTrendsData}
            title="Monthly Booking Trends"
            width={500}
            height={300}
            color="#3B82F6"
          />

          {/* Revenue Trends */}
          <LineChart
            data={revenueTrendsData.map(item => ({
              label: item.label,
              value: item.value / 1000 // Convert to thousands for better display
            }))}
            title="Quarterly Revenue Trends (in thousands)"
            width={500}
            height={300}
            color="#10B981"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;