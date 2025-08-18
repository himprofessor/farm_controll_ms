Ya Chhoeun(Class 2025 B), [8/16/2025 3:40 PM]
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">Farm Management Reports & Analytics</h1>
          <p class="mt-2 text-gray-600">Comprehensive reporting system for all farm operations and processes</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in reportTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Financial Reports Tab -->
      <div v-if="activeTab === 'financial'" class="space-y-8">
        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">${{ totalRevenue.toLocaleString() }}</p>
                <p class="text-sm text-green-600">+12.5% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Expenses</p>
                <p class="text-2xl font-bold text-gray-900">${{ totalExpenses.toLocaleString() }}</p>
                <p class="text-sm text-red-600">+5.2% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Net Profit</p>
                <p class="text-2xl font-bold text-gray-900">${{ netProfit.toLocaleString() }}</p>
                <p class="text-sm text-green-600">+18.3% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Profit Margin</p>
                <p class="text-2xl font-bold text-gray-900">{{ profitMargin }}%</p>
                <p class="text-sm text-green-600">+2.1% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Report Generation -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Generate Financial Reports</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select v-model="selectedFinancialReport" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="profit-loss">Profit & Loss Statement</option>
                  <option value="cash-flow">Cash Flow Report</option>
                  <option value="expense-analysis">Expense Analysis</option>
                  <option value="revenue-breakdown">Revenue Breakdown</option>
                  <option value="budget-variance">Budget vs Actual</option>
                  <option value="tax-summary">Tax Summary</option>
                  <option value="roi-analysis">ROI Analysis</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select v-model="selectedPeriod" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="current-month">Current Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <select v-model="exportFormat" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            
            <div v-if="selectedPeriod === 'custom'" class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input type="date" v-model="customStartDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input type="date" v-model="customEndDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button @click="generateReport('financial')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Generate Report
              </button>
              <button @click="generateAndDownload('financial')" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Generate & Download
              </button>
              <button @click="submitForApproval('financial')" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Operations Reports Tab -->
      <div v-if="activeTab === 'operations'" class="space-y-8">
        <!-- ... existing code ... -->
        <!-- Operations Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Inventory Items</p>
                <p class="text-2xl font-bold text-gray-900">{{ inventoryStats.totalItems }}</p>
                <p class="text-sm text-red-600">{{ inventoryStats.lowStockAlerts }} Low Stock Alerts</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Production Output</p>
                <p class="text-2xl font-bold text-gray-900">{{ productionStats.totalOutput }}</p>
                <p class="text-sm text-green-600">+8% from last month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Equipment Status</p>
                <p class="text-2xl font-bold text-gray-900">{{ equipmentStats.operational }}</p>
                <p class="text-sm text-yellow-600">{{ equipmentStats.maintenance }} Need Maintenance</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Animal Health</p>
                <p class="text-2xl font-bold text-gray-900">{{ animalStats.healthy }}%</p>
                <p class="text-sm text-green-600">{{ animalStats.totalAnimals }} Total Animals</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Operations Report Generation -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Generate Operations Reports</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select v-model="selectedOperationsReport" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="inventory-status">Inventory Status Report</option>
                  <option value="production-summary">Production Summary</option>
                  <option value="equipment-maintenance">Equipment Maintenance Log</option>
                  <option value="feed-consumption">Feed Consumption Analysis</option>
                  <option value="crop-yield">Crop Yield Report</option>
                  <option value="animal-health">Animal Health Summary</option>
                  <option value="compliance-audit">Compliance Audit Report</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select v-model="selectedDepartment" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="all">All Departments</option>
                  <option value="livestock">Livestock</option>
                  <option value="crops">Crops</option>
                  <option value="equipment">Equipment</option>
                  <option value="feed">Feed & Supplies</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select v-model="reportPriority" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button @click="generateReport('operations')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Generate Report
              </button>
              <button @click="generateAndDownload('operations')" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Generate & Download
              </button>
              <button @click="submitForApproval('operations')" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Staff Reports Tab -->
      <div v-if="activeTab === 'staff'" class="space-y-8">
        <!-- ... existing code ... -->
        <!-- Staff Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Staff</p>
                <p class="text-2xl font-bold text-gray-900">{{ staffStats.totalStaff }}</p>
                <p class="text-sm text-green-600">{{ staffStats.newHires }} New This Month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p class="text-2xl font-bold text-gray-900">{{ staffStats.attendanceRate }}%</p>
                <p class="text-sm text-green-600">Above Target</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Payroll Total</p>
                <p class="text-2xl font-bold text-gray-900">${{ staffStats.payrollTotal.toLocaleString() }}</p>
                <p class="text-sm text-blue-600">This Month</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-8">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Training Complete</p>
                <p class="text-2xl font-bold text-gray-900">{{ staffStats.trainingComplete }}%</p>
                <p class="text-sm text-green-600">Compliance Rate</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Staff Report Generation -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Generate Staff Reports</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select v-model="selectedStaffReport" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="payroll-summary">Payroll Summary</option>
                  <option value="attendance-report">Attendance Report</option>
                  <option value="performance-review">Performance Reviews</option>
                  <option value="training-compliance">Training Compliance</option>
                  <option value="overtime-analysis">Overtime Analysis</option>
                  <option value="benefits-utilization">Benefits Utilization</option>
                  <option value="safety-incidents">Safety Incident Report</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Staff Category</label>
                <select v-model="selectedStaffCategory" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="all">All Staff</option>
                  <option value="management">Management</option>
                  <option value="supervisors">Supervisors</option>
                  <option value="field-workers">Field Workers</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confidentiality</label>
                <select v-model="reportConfidentiality" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="public">Public</option>
                  <option value="internal">Internal Only</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted">Restricted Access</option>
                </select>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button @click="generateReport('staff')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Generate Report
              </button>
              <button @click="generateAndDownload('staff')" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Generate & Download
              </button>
              <button @click="submitForApproval('staff')" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Submit for HR Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Queue and Status -->
      <div class="mt-8">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Report Queue & Status</h3>
            <div class="flex space-x-2">
              <button @click="refreshQueue" class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                Refresh
              </button>
              <button @click="clearCompleted" class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
                Clear Completed
              </button>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="report in reportQueue" :key="report.id" class="px-6 py-4 hover:bg-gray-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <div :class="getStatusColor(report.status)" class="w-3 h-3 rounded-full"></div>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ report.name }}</p>
                    <p class="text-xs text-gray-500">{{ report.type }} • {{ report.submittedBy }} • {{ report.submittedAt }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <span :class="getStatusTextColor(report.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ report.status }}
                  </span>
                  <div class="flex space-x-2">
                    <button v-if="report.status === 'completed'" @click="downloadReport(report)" class="p-1 text-gray-400 hover:text-gray-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </button>
                    <button @click="viewReportDetails(report.id)" class="p-1 text-gray-400 hover:text-gray-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="report.status === 'processing'" class="mt-2">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full transition-all duration-300" :style="{ width: report.progress + '%' }"></div>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ report.progress }}% complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Report View Modal -->
    <div v-if="selectedReport" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="header text-center mb-8">
              <h1 class="text-2xl font-bold">{{ selectedReportData.farmName }}</h1>
              <h2 class="text-xl font-semibold">{{ selectedReportData.reportType.replace('-', ' ').toUpperCase() }} REPORT</h2>
              <p class="text-sm text-gray-600">Generated: {{ new Date(selectedReportData.generatedAt).toLocaleString() }}</p>
              <p class="text-sm text-gray-600">Period: {{ selectedReportData.reportPeriod }}</p>
            </div>
            
            <div v-if="selectedReportData.financialData" class="section mb-6">
              <h3 class="text-lg font-medium mb-4">Financial Summary</h3>
              <div class="summary bg-gray-50 p-4 rounded-md mb-4">
                <p><strong>Total Revenue:</strong> ${{ selectedReportData.financialData.totalRevenue.toLocaleString() }}</p>
                <p><strong>Total Expenses:</strong> ${{ selectedReportData.financialData.totalExpenses.toLocaleString() }}</p>
                <p><strong>Net Profit:</strong> ${{ selectedReportData.financialData.netProfit.toLocaleString() }}</p>
                <p><strong>Profit Margin:</strong> {{ selectedReportData.financialData.profitMargin }}%</p>
              </div>
              
              <h4 class="text-md font-medium mb-2">Revenue Breakdown</h4>
              <table class="data-table w-full border-collapse border border-gray-300">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="border border-gray-300 p-2 text-left">Source</th>
                    <th class="border border-gray-300 p-2 text-left">Amount</th>
                    <th class="border border-gray-300 p-2 text-left">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedReportData.financialData.revenueBreakdown" :key="item.source">
                    <td class="border border-gray-300 p-2">{{ item.source }}</td>
                    <td class="border border-gray-300 p-2">${{ item.amount.toLocaleString() }}</td>
                    <td class="border border-gray-300 p-2">{{ item.percentage }}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div v-if="selectedReportData.operationsData" class="section mb-6">
              <h3 class="text-lg font-medium mb-4">Operations Summary</h3>
              <div class="summary bg-gray-50 p-4 rounded-md">
                <p><strong>Total Inventory Items:</strong> {{ selectedReportData.operationsData.inventoryItems }}</p>
                <p><strong>Low Stock Alerts:</strong> {{ selectedReportData.operationsData.lowStockAlerts }}</p>
                <p><strong>Production Output:</strong> {{ selectedReportData.operationsData.productionOutput }}</p>
                <p><strong>Equipment Operational:</strong> {{ selectedReportData.operationsData.equipmentOperational }}</p>
                <p><strong>Animal Health Rate:</strong> {{ selectedReportData.operationsData.animalHealthRate }}%</p>
              </div>
            </div>
            
            <div v-if="selectedReportData.staffData" class="section mb-6">
              <h3 class="text-lg font-medium mb-4">Staff Summary</h3>
              <div class="summary bg-gray-50 p-4 rounded-md">
                <p><strong>Total Staff:</strong> {{ selectedReportData.staffData.totalStaff }}</p>
                <p><strong>Attendance Rate:</strong> {{ selectedReportData.staffData.attendanceRate }}%</p>
                <p><strong>Payroll Total:</strong> ${{ selectedReportData.staffData.payrollTotal.toLocaleString() }}</p>
                <p><strong>Training Complete:</strong> {{ selectedReportData.staffData.trainingComplete }}%</p>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="closeModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Active tab
const activeTab = ref('financial')

// Report tabs
const reportTabs = ref([
  { id: 'financial', name: 'Financial Reports' },
  { id: 'operations', name: 'Operations Reports' },
  { id: 'staff', name: 'Staff Reports' }
])

// Form data
const selectedFinancialReport = ref('profit-loss')
const selectedOperationsReport = ref('inventory-status')
const selectedStaffReport = ref('payroll-summary')
const selectedPeriod = ref('current-month')
const selectedDepartment = ref('all')
const selectedStaffCategory = ref('all')
const reportPriority = ref('standard')
const reportConfidentiality = ref('internal')
const exportFormat = ref('pdf')
const customStartDate = ref('')
const customEndDate = ref('')

// Sample data
const totalRevenue = ref(21774)
const totalExpenses = ref(4400)
const netProfit = computed(() => totalRevenue.value - totalExpenses.value)
const profitMargin = computed(() => ((netProfit.value / totalRevenue.value) * 100).toFixed(1))

const inventoryStats = ref({
  totalItems: 247,
  lowStockAlerts: 3
})

const productionStats = ref({
  totalOutput: '1,250 units'
})

const equipmentStats = ref({
  operational: 12,
  maintenance: 2
})

const animalStats = ref({
  healthy: 98,
  totalAnimals: 450
})

const staffStats = ref({
  totalStaff: 24,
  newHires: 3,
  attendanceRate: 94,
  payrollTotal: 54000,
  trainingComplete: 87
})

const reportQueue = ref([
  {
    id: 1,
    name: 'Monthly P&L Statement',
    type: 'Financial',
    status: 'completed',
    progress: 100,
    submittedBy: 'John Smith',
    submittedAt: '2 hours ago',
    format: 'pdf',
    category: 'financial',
    reportType: 'profit-loss'
  },
  {
    id: 2,
    name: 'Inventory Status Report',
    type: 'Operations',
    status: 'processing',
    progress: 65,
    submittedBy: 'Sarah Johnson',
    submittedAt: '1 hour ago',
    format: 'excel',
    category: 'operations',
    reportType: 'inventory-status'
  },
  {
    id: 3,
    name: 'Staff Attendance Report',
    type: 'Staff',
    status: 'pending_approval',
    progress: 100,
    submittedBy: 'Mike Davis',
    submittedAt: '30 minutes ago',
    format: 'csv',
    category: 'staff',
    reportType: 'attendance-report'
  }
])

// <CHANGE> Enhanced report generation with actual data creation
const generateReportData = (category, reportType) => {
  const baseData = {
    generatedAt: new Date().toISOString(),
    farmName: 'Green Valley Farm',
    reportPeriod: selectedPeriod.value,
    category: category,
    reportType: reportType
  }


  switch (category) {
    case 'financial':
      return {
        ...baseData,
        financialData: {
          totalRevenue: totalRevenue.value,
          totalExpenses: totalExpenses.value,
          netProfit: netProfit.value,
          profitMargin: profitMargin.value,
          revenueBreakdown: [
            { source: 'Pig Sales', amount: 15000, percentage: 69 },
            { source: 'Manure Sales', amount: 4000, percentage: 18 },
            { source: 'Egg Sales', amount: 2774, percentage: 13 }
          ],
          expenseBreakdown: [
            { category: 'Feed', amount: 2400, percentage: 55 },
            { category: 'Salaries', amount: 1200, percentage: 27 },
            { category: 'Equipment', amount: 500, percentage: 11 },
            { category: 'Utilities', amount: 300, percentage: 7 }
          ]
        }
      }
    
    case 'operations':
      return {
        ...baseData,
        operationsData: {
          inventoryItems: inventoryStats.value.totalItems,
          lowStockAlerts: inventoryStats.value.lowStockAlerts,
          productionOutput: productionStats.value.totalOutput,
          equipmentOperational: equipmentStats.value.operational,
          equipmentMaintenance: equipmentStats.value.maintenance,
          animalHealthRate: animalStats.value.healthy,
          totalAnimals: animalStats.value.totalAnimals,
          inventoryDetails: [
            { item: 'Pig Feed', currentStock: '800 kg', minStock: '100 kg', status: 'OK' },
            { item: 'Seeds', currentStock: '20 kg', minStock: '17 kg', status: 'Critical' },
            { item: 'Equipment Parts', currentStock: '45 units', minStock: '10 units', status: 'OK' }
          ]
        }
      }
    
    case 'staff':
      return {
        ...baseData,
        staffData: {
          totalStaff: staffStats.value.totalStaff,
          newHires: staffStats.value.newHires,
          attendanceRate: staffStats.value.attendanceRate,
          payrollTotal: staffStats.value.payrollTotal,
          trainingComplete: staffStats.value.trainingComplete,
          staffBreakdown: [
            { department: 'Management', count: 3, avgSalary: 5500 },
            { department: 'Field Workers', count: 15, avgSalary: 2800 },
            { department: 'Maintenance', count: 4, avgSalary: 3200 },
            { department: 'Administration', count: 2, avgSalary: 3800 }
          ]
        }
      }
    
    default:
      return baseData
  }
}

// <CHANGE> Enhanced download functionality with multiple format support
const downloadReport = (report) => {
  console.log(`[v0] Downloading report: ${report.name} in ${report.format} format`)
  
  const reportData = generateReportData(report.category, report.reportType)
  const fileName = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`
  
  switch (report.format) {
    case 'pdf':
      downloadAsPDF(reportData, fileName)
      break
    case 'excel':
      downloadAsExcel(reportData, fileName)
      break
    case 'csv':
      downloadAsCSV(reportData, fileName)
      break
    case 'json':
      downloadAsJSON(reportData, fileName)
      break
    default:
      downloadAsJSON(reportData, fileName)
  }
}

// <CHANGE> PDF download implementation
const downloadAsPDF = (data, fileName) => {
  // Create a simple HTML report structure
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.farmName} - ${data.reportType}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .data-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        .data-table th, .data-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .data-table th { background-color: #f2f2f2; }
        .summary { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.farmName}</h1>
        <h2>${data.reportType.replace('-', ' ').toUpperCase()} REPORT</h2>
        <p>Generated: ${new Date(data.generatedAt).toLocaleString()}</p>
        <p>Period: ${data.reportPeriod}</p>
      </div>
      
      ${data.financialData ? `
        <div class="section">
          <h3>Financial Summary</h3>
          <div class="summary">
            <p><strong>Total Revenue:</strong> $${data.financialData.totalRevenue.toLocaleString()}</p>
            <p><strong>Total Expenses:</strong> $${data.financialData.totalExpenses.toLocaleString()}</p>
            <p><strong>Net Profit:</strong> $${data.financialData.netProfit.toLocaleString()}</p>
            <p><strong>Profit Margin:</strong> ${data.financialData.profitMargin}%</p>
          </div>
          
          <h4>Revenue Breakdown</h4>
          <table class="data-table">
            <tr><th>Source</th><th>Amount</th><th>Percentage</th></tr>
            ${data.financialData.revenueBreakdown.map(item => 
              `<tr><td>${item.source}</td><td>$${item.amount.toLocaleString()}</td><td>${item.percentage}%</td></tr>`
            ).join('')}
          </table>
        </div>
      ` : ''}
      
      ${data.operationsData ? `
        <div class="section">
          <h3>Operations Summary</h3>
          <div class="summary">
            <p><strong>Total Inventory Items:</strong> ${data.operationsData.inventoryItems}</p>
            <p><strong>Low Stock Alerts:</strong> ${data.operationsData.lowStockAlerts}</p>
            <p><strong>Production Output:</strong> ${data.operationsData.productionOutput}</p>
            <p><strong>Equipment Operational:</strong> ${data.operationsData.equipmentOperational}</p>
            <p><strong>Animal Health Rate:</strong> ${data.operationsData.animalHealthRate}%</p>
          </div>
        </div>
      ` : ''}
      
      ${data.staffData ? `
        <div class="section">
          <h3>Staff Summary</h3>
          <div class="summary">
            <p><strong>Total Staff:</strong> ${data.staffData.totalStaff}</p>
            <p><strong>Attendance Rate:</strong> ${data.staffData.attendanceRate}%</p>
            <p><strong>Payroll Total:</strong> $${data.staffData.payrollTotal.toLocaleString()}</p>
            <p><strong>Training Complete:</strong> ${data.staffData.trainingComplete}%</p>
          </div>
        </div>
      ` : ''}
    </body>
    </html>
  `
  
  // Create blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// <CHANGE> Excel download implementation (as CSV for simplicity)
const downloadAsExcel = (data, fileName) => {
  let csvContent = `${data.farmName} - ${data.reportType.toUpperCase()} REPORT\n`
  csvContent += `Generated: ${new Date(data.generatedAt).toLocaleString()}\n`
  csvContent += `Period: ${data.reportPeriod}\n\n`
  
  if (data.financialData) {
    csvContent += `FINANCIAL SUMMARY\n`
    csvContent += `Total Revenue,$${data.financialData.totalRevenue}\n`
    csvContent += `Total Expenses,$${data.financialData.totalExpenses}\n`
    csvContent += `Net Profit,$${data.financialData.netProfit}\n`
    csvContent += `Profit Margin,${data.financialData.profitMargin}%\n\n`
    
    csvContent += `REVENUE BREAKDOWN\n`
    csvContent += `Source,Amount,Percentage\n`
    data.financialData.revenueBreakdown.forEach(item => {
      csvContent += `${item.source},$${item.amount},${item.percentage}%\n`
    })
  }
  
  if (data.operationsData) {
    csvContent += `\nOPERATIONS SUMMARY\n`
    csvContent += `Total Inventory Items,${data.operationsData.inventoryItems}\n`
    csvContent += `Low Stock Alerts,${data.operationsData.lowStockAlerts}\n`
    csvContent += `Production Output,${data.operationsData.productionOutput}\n`
  }
  
  if (data.staffData) {
    csvContent += `\nSTAFF SUMMARY\n`
    csvContent += `Total Staff,${data.staffData.totalStaff}\n`
    csvContent += `Attendance Rate,${data.staffData.attendanceRate}%\n`
    csvContent += `Payroll Total,$${data.staffData.payrollTotal}\n`
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// <CHANGE> CSV download implementation
const downloadAsCSV = (data, fileName) => {
  downloadAsExcel(data, fileName) // Reuse Excel logic for CSV
}

// <CHANGE> JSON download implementation
const downloadAsJSON = (data, fileName) => {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// <CHANGE> New method for immediate generation and download
const generateAndDownload = (category) => {
  console.log(`[v0] Generating and downloading ${category} report immediately`)
  
  const reportTypes = {
    financial: selectedFinancialReport.value,
    operations: selectedOperationsReport.value,
    staff: selectedStaffReport.value
  }
  
  const reportData = generateReportData(category, reportTypes[category])
  const fileName = `${reportTypes[category].replace('-', '_')}_${new Date().toISOString().split('T')[0]}`
  
  // Download immediately based on selected format
  switch (exportFormat.value) {
    case 'pdf':
      downloadAsPDF(reportData, fileName)
      break
    case 'excel':
      downloadAsExcel(reportData, fileName)
      break
    case 'csv':
      downloadAsCSV(reportData, fileName)
      break
    case 'json':
      downloadAsJSON(reportData, fileName)
      break
    default:
      downloadAsJSON(reportData, fileName)
  }
}


// Methods
const generateReport = (category) => {
  console.log(`[v0] Generating ${category} report`)
  const reportTypes = {
    financial: selectedFinancialReport.value,
    operations: selectedOperationsReport.value,
    staff: selectedStaffReport.value
  }
  
  const newReport = {
    id: Date.now(),
    name: `${reportTypes[category].replace('-', ' ')} - ${new Date().toLocaleDateString()}`,
    type: category.charAt(0).toUpperCase() + category.slice(1),
    status: 'processing',
    progress: 0,
    submittedBy: 'Current User',
    submittedAt: 'Just now',
    format: exportFormat.value,
    category: category,
    reportType: reportTypes[category]
  }
  
  reportQueue.value.unshift(newReport)
  
  // Simulate progress
  const progressInterval = setInterval(() => {
    newReport.progress += Math.random() * 20
    if (newReport.progress >= 100) {
      newReport.progress = 100
      newReport.status = 'completed'
      clearInterval(progressInterval)
    }
  }, 1000)
}

const submitForApproval = (category) => {
  console.log(`[v0] Submitting ${category} report for approval`)
  const reportTypes = {
    financial: selectedFinancialReport.value,
    operations: selectedOperationsReport.value,
    staff: selectedStaffReport.value
  }
  
  const newReport = {
    id: Date.now(),
    name: `${reportTypes[category].replace('-', ' ')} - ${new Date().toLocaleDateString()}`,
    type: category.charAt(0).toUpperCase() + category.slice(1),
    status: 'pending_approval',
    progress: 100,
    submittedBy: 'Current User',
    submittedAt: 'Just now',
    format: exportFormat.value,
    category: category,
    reportType: reportTypes[category]
  }
  
  reportQueue.value.unshift(newReport)
}

const getStatusColor = (status) => {
  const colors = {
    'completed': 'bg-green-500',
    'processing': 'bg-blue-500',
    'pending_approval': 'bg-yellow-500',
    'submitted': 'bg-purple-500',
    'failed': 'bg-red-500'
  }
  return colors[status] || 'bg-gray-500'
}

const getStatusTextColor = (status) => {
  const colors = {
    'completed': 'bg-green-100 text-green-800',
    'processing': 'bg-blue-100 text-blue-800',
    'pending_approval': 'bg-yellow-100 text-yellow-800',
    'submitted': 'bg-purple-100 text-purple-800',
    'failed': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const refreshQueue = () => {
  console.log('[v0] Refreshing report queue')
  // Add refresh logic here
}

const clearCompleted = () => {
  reportQueue.value = reportQueue.value.filter(report => report.status !== 'completed')
}

const selectedReport = ref(null)

const selectedReportData = computed(() => {
  if (!selectedReport.value) return null
  return generateReportData(selectedReport.value.category, selectedReport.value.reportType)
})

const viewReportDetails = (reportId) => {
  console.log(`[v0] Viewing details for report ${reportId}`)
  const report = reportQueue.value.find(r => r.id === reportId)
  if (report) {
    selectedReport.value = report
  }
}

const closeModal = () => {
  selectedReport.value = null
}
</script>