<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Financial Reports</h2>
    </div>
    
    <!-- Report Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Profit & Loss Statement -->
      <div 
        @click="generateReport('profit-loss')"
        class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md hover:border-green-200 cursor-pointer transition duration-200 group"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition duration-200">
            <TrendingUp class="w-6 h-6 text-green-600" />
          </div>
          <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-green-600 transition duration-200" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Profit & Loss Statement</h3>
        <p class="text-gray-600 text-sm">Monthly P&L report</p>
      </div>
      
      <!-- Cash Flow Report -->
      <div 
        @click="generateReport('cash-flow')"
        class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md hover:border-green-200 cursor-pointer transition duration-200 group"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition duration-200">
            <ArrowUpDown class="w-6 h-6 text-blue-600" />
          </div>
          <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-green-600 transition duration-200" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Cash Flow Report</h3>
        <p class="text-gray-600 text-sm">Track cash movements</p>
      </div>
      
      <!-- Expense Analysis -->
      <div 
        @click="generateReport('expense-analysis')"
        class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md hover:border-green-200 cursor-pointer transition duration-200 group"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition duration-200">
            <PieChart class="w-6 h-6 text-red-600" />
          </div>
          <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-green-600 transition duration-200" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Expense Analysis</h3>
        <p class="text-gray-600 text-sm">Detailed expense breakdown</p>
      </div>
    </div>

    <!-- Report Generation Modal -->
    <div v-if="showReportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Generate {{ currentReportTitle }}</h3>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Report Period</label>
            <select 
              v-model="reportPeriod"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div v-if="reportPeriod === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="customStartDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="customEndDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select 
              v-model="reportFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
        
        <div class="flex gap-3 mt-6">
          <button 
            @click="processReport"
            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Generate Report
          </button>
          <button 
            @click="showReportModal = false"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Reports Section -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
      <div class="space-y-3">
        <div v-for="report in recentReports" :key="report.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
              <FileText class="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ report.name }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(report.date) }} • {{ report.format.toUpperCase() }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="text-green-600 hover:text-green-700 text-sm font-medium">
              Download
            </button>
            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View
            </button>
          </div>
        </div>
        
        <div v-if="recentReports.length === 0" class="text-center py-8">
          <FileText class="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-500">No reports generated yet</p>
          <p class="text-sm text-gray-400">Click on a report type above to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  TrendingUp, 
  ArrowUpDown, 
  PieChart, 
  ChevronRight, 
  FileText, 
  X 
} from 'lucide-vue-next'

const showReportModal = ref(false)
const currentReportType = ref('')
const currentReportTitle = ref('')
const reportPeriod = ref('this-month')
const reportFormat = ref('pdf')
const customStartDate = ref('')
const customEndDate = ref('')

const recentReports = ref([
  {
    id: 1,
    name: 'January 2024 P&L Statement',
    date: '2024-01-15',
    format: 'pdf',
    type: 'profit-loss'
  },
  {
    id: 2,
    name: 'Q4 2023 Cash Flow Report',
    date: '2024-01-08',
    format: 'excel',
    type: 'cash-flow'
  },
  {
    id: 3,
    name: 'December Expense Analysis',
    date: '2024-01-05',
    format: 'pdf',
    type: 'expense-analysis'
  }
])

const reportTitles = {
  'profit-loss': 'Profit & Loss Statement',
  'cash-flow': 'Cash Flow Report',
  'expense-analysis': 'Expense Analysis'
}

const generateReport = (reportType) => {
  currentReportType.value = reportType
  currentReportTitle.value = reportTitles[reportType]
  showReportModal.value = true
}

const processReport = () => {
  // Simulate report generation
  const newReport = {
    id: Date.now(),
    name: `${currentReportTitle.value} - ${getPeriodLabel()}`,
    date: new Date().toISOString().split('T')[0],
    format: reportFormat.value,
    type: currentReportType.value
  }
  
  recentReports.value.unshift(newReport)
  showReportModal.value = false
  
  // Reset form
  reportPeriod.value = 'this-month'
  reportFormat.value = 'pdf'
  customStartDate.value = ''
  customEndDate.value = ''
  
  // Show success message
  alert(`${currentReportTitle.value} generated successfully!`)
}

const getPeriodLabel = () => {
  const labels = {
    'this-month': 'This Month',
    'last-month': 'Last Month',
    'this-quarter': 'This Quarter',
    'this-year': 'This Year',
    'custom': 'Custom Period'
  }
  return labels[reportPeriod.value] || 'Custom Period'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>