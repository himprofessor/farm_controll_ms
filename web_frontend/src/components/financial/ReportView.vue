<template>
  <div class="min-h-screen ">
    <!-- Content Area -->
    <div class="px-8 py-8">
      <!-- Reports Tab Content -->
      <div v-if="activeTab === 'reports'"> 
        <!-- Success Notification for Report Generation -->
        <div v-if="showSuccessMessage" class="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                Report generated successfully! You can now download it from the Recent Reports section below.
              </p>
            </div>
            <div class="ml-auto pl-3">
              <div class="-mx-1.5 -my-1.5">
                <button @click="showSuccessMessage = false" class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Report Cards -->
       <div class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          <!-- Profit & Loss Statement -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" @click="generateReport('profit-loss')">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Profit & Loss Statement</h3>
                <p class="text-sm text-gray-600">Monthly P&L report</p>
              </div>
              <div class="ml-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-4">
              <button class="text-green-600 text-sm font-medium hover:text-green-700">
                Generate Report →
              </button>
            </div>
          </div>

          <!-- Cash Flow Report -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" @click="generateReport('cash-flow')">
            <div class="flex items-start justify-between">
  <div class="flex-1">
    <h3 class="text-lg font-medium text-gray-900 mb-2">Cash Flow Report</h3>
    <p class="text-sm text-gray-600">Track cash movements</p>
  </div>
  <div class="ml-4">
    <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <!-- Document-text icon -->
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  </div>
</div>
            <div class="mt-4">
              <button class="text-green-600 text-sm font-medium hover:text-green-700">
                Generate Report →
              </button>
            </div>
          </div>

          <!-- Expense Analysis -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" @click="generateReport('expense-analysis')">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Expense Analysis</h3>
                <p class="text-sm text-gray-600">Detailed expense breakdown</p>
              </div>
              <div class="ml-4">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
              </div>
            </div>
            <div class="mt-4">
              <button class="text-green-600 text-sm font-medium hover:text-green-700">
                Generate Report →
              </button>
            </div>
          </div>
        </div>

        <!-- Report Generation Form -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mt-7 p-6" v-if="showReportForm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Generate {{ selectedReportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select v-model="timePeriod" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
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
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Include Details</label>
              <select v-model="includeDetails" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="summary">Summary Only</option>
                <option value="detailed">Detailed View</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
            </div>
          </div>

          <div v-if="timePeriod === 'custom'" class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" v-model="customStartDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" v-model="customEndDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="processReport" :disabled="isProcessing" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50">
              <span v-if="!isProcessing">Generate Report</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </button>
            <button @click="cancelReport" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
          </div>

          <!-- Progress Bar -->
          <div v-if="isProcessing" class="mt-4">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>{{ processingStatus }}</span>
              <span>{{ Math.round(processingProgress) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full transition-all duration-300" :style="{ width: processingProgress + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Recent Reports -->
        <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div class="space-y-3">
            <div v-for="report in recentReports" :key="report.id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ report.name }}</p>
                  <p class="text-sm text-gray-500">{{ report.date }} • {{ report.format.toUpperCase() }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]">
                  {{ report.status }}
                </span>
                <!-- Icon-only download button with high contrast -->
                <button 
                  @click="downloadReport(report)" 
                  :disabled="report.status !== 'completed'"
                  :class="[
                    'p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
                    report.status === 'completed' 
                      ? 'text-gray-600 hover:text-green-600 hover:bg-green-50 focus:ring-green-500 cursor-pointer' 
                      : 'text-gray-300 cursor-not-allowed'
                  ]"
                  :title="report.status === 'completed' ? 'Download report' : 'Report not ready'"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
                <!-- Icon-only delete button with high contrast -->
                <button 
                  @click="confirmDeleteReport(report)" 
                  class="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 cursor-pointer"
                  title="Delete report"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Tab Contents -->
      <div v-else>
        <div class="text-center py-12">
          <p class="text-gray-500">{{ tabs.find(t => t.id === activeTab)?.name }} content coming soon...</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Delete Report</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete "{{ reportToDelete?.name }}"? This action cannot be undone.
            </p>
          </div>
          <div class="items-center px-4 py-3">
            <div class="flex gap-3 justify-center">
              <button 
                @click="deleteReport" 
                class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
              <button 
                @click="cancelDelete" 
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Navigation tabs
const tabs = ref([
  { id: 'overview', name: 'Overview' },
  { id: 'income', name: 'Income' },
  { id: 'expenses', name: 'Expenses' },
  { id: 'reports', name: 'Reports' }
])

const activeTab = ref('reports')

// Report generation
const showReportForm = ref(false)
const selectedReportType = ref('')
const timePeriod = ref('current-month')
const exportFormat = ref('pdf')
const includeDetails = ref('summary')
const customStartDate = ref('')
const customEndDate = ref('')
const isProcessing = ref(false)
const processingProgress = ref(0)
const processingStatus = ref('')
const showSuccessMessage = ref(false)

// Delete functionality
const showDeleteModal = ref(false)
const reportToDelete = ref(null)

// Recent reports
const recentReports = ref([
  { id: 1, name: 'Profit & Loss Statement - August 2025', date: '2025-08-15', format: 'pdf', status: 'completed' },
  { id: 2, name: 'Cash Flow Report - July 2025', date: '2025-07-30', format: 'excel', status: 'completed' },
  { id: 3, name: 'Expense Analysis - Q2 2025', date: '2025-06-28', format: 'csv', status: 'processing' }
])

// Methods
const generateReport = (reportType) => {
  console.log(`[v0] Generating ${reportType} report`)
  selectedReportType.value = reportType
  showReportForm.value = true
}

const generateReportContent = (reportType, format) => {
  const currentDate = new Date().toLocaleDateString()
  const reportTitle = reportType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  if (format === 'csv') {
    return `Farm Management System - ${reportTitle}
Generated: ${currentDate}
Period: ${timePeriod.value}

Category,Amount,Percentage,Notes
Revenue,34710,100%,Total farm income
Seeds,2000,5.8%,Crop production costs
Feed,2400,6.9%,Livestock feed expenses
Equipment,0,0%,No equipment purchases
Labor,0,0%,Staff costs
Net Profit,30310,87.3%,Total profit margin

Summary:
Total Revenue: $34,710
Total Expenses: $4,400
Net Profit: $30,310
Profit Margin: 87.3%`
  }
  
  if (format === 'excel') {
    // Simple tab-separated format for Excel compatibility
    return `Farm Management System - ${reportTitle}\t\t\t
Generated: ${currentDate}\t\t\t
Period: ${timePeriod.value}\t\t\t
\t\t\t
Category\tAmount\tPercentage\tNotes
Revenue\t34710\t100%\tTotal farm income
Seeds\t2000\t5.8%\tCrop production costs
Feed\t2400\t6.9%\tLivestock feed expenses
Equipment\t0\t0%\tNo equipment purchases
Labor\t0\t0%\tStaff costs
Net Profit\t30310\t87.3%\tTotal profit margin
\t\t\t
Summary:\t\t\t
Total Revenue:\t$34,710\t\t
Total Expenses:\t$4,400\t\t
Net Profit:\t$30,310\t\t
Profit Margin:\t87.3%\t\t`
  }
  
  // PDF format (plain text)
  return `FARM MANAGEMENT SYSTEM
${reportTitle}

Generated: ${currentDate}
Period: ${timePeriod.value}
Detail Level: ${includeDetails.value}

FINANCIAL SUMMARY
================
Total Revenue:     $34,710
Total Expenses:    $4,400
Net Profit:        $30,310
Profit Margin:     87.3%

REVENUE BREAKDOWN
=================
Crop Sales:        $20,500
Livestock Sales:   $14,210

EXPENSE BREAKDOWN
=================
Seeds:             $2,000 (5.8%)
Feed:              $2,400 (6.9%)
Equipment:         $0 (0%)
Labor:             $0 (0%)

ANALYSIS
========
The farm shows strong profitability with an 87.3% profit margin.
Revenue streams are well diversified between crops and livestock.
Operating expenses are well controlled at 12.7% of total revenue.

This report was generated automatically by the Farm Management System.
For questions, please contact your farm administrator.`
}

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const downloadReport = (report) => {
  console.log(`[v0] Downloading report: ${report.name}`)
  
  const reportType = report.name.toLowerCase().includes('profit') ? 'profit-loss' :
                    report.name.toLowerCase().includes('cash') ? 'cash-flow' : 'expense-analysis'
  
  const content = generateReportContent(reportType, report.format)
  const timestamp = new Date().toISOString().slice(0, 10)
  
  let filename, mimeType
  
  switch (report.format) {
    case 'csv':
      filename = `${reportType}-report-${timestamp}.csv`
      mimeType = 'text/csv'
      break
    case 'excel':
      filename = `${reportType}-report-${timestamp}.xls`
      mimeType = 'application/vnd.ms-excel'
      break
    default: // pdf
      filename = `${reportType}-report-${timestamp}.txt`
      mimeType = 'text/plain'
  }
  
  downloadFile(content, filename, mimeType)
}

const processReport = async () => {
  console.log(`[v0] Processing ${selectedReportType.value} report`)
  isProcessing.value = true
  processingProgress.value = 0
  
  const steps = [
    'Collecting financial data...',
    'Analyzing transactions...',
    'Calculating metrics...',
    'Generating visualizations...',
    'Formatting report...',
    'Finalizing document...'
  ]
  
  for (let i = 0; i < steps.length; i++) {
    processingStatus.value = steps[i]
    
    // Simulate processing time with realistic delays
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 800))
    processingProgress.value = ((i + 1) / steps.length) * 100
  }
  
  // Add to recent reports
  const reportNames = {
    'profit-loss': 'Profit & Loss Statement',
    'cash-flow': 'Cash Flow Report',
    'expense-analysis': 'Expense Analysis'
  }
  
  const newReport = {
    id: Date.now(),
    name: `${reportNames[selectedReportType.value]} - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
    date: new Date().toISOString().split('T')[0],
    format: exportFormat.value,
    status: 'completed'
  }
  
  recentReports.value.unshift(newReport)
  
  // Reset form
  isProcessing.value = false
  showReportForm.value = false
  processingProgress.value = 0
  processingStatus.value = ''
  
  console.log(`[v0] Report generated successfully: ${newReport.name}`)
  
  showSuccessMessage.value = true
  
  // Auto-hide success message after 5 seconds
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 5000)
}

const cancelReport = () => {
  console.log(`[v0] Cancelling report generation`)
  showReportForm.value = false
  isProcessing.value = false
  processingProgress.value = 0
  processingStatus.value = ''
}

const confirmDeleteReport = (report) => {
  console.log(`[v0] Confirming delete for report: ${report.name}`)
  reportToDelete.value = report
  showDeleteModal.value = true
}

const deleteReport = () => {
  if (reportToDelete.value) {
    console.log(`[v0] Deleting report: ${reportToDelete.value.name}`)
    const index = recentReports.value.findIndex(r => r.id === reportToDelete.value.id)
    if (index > -1) {
      recentReports.value.splice(index, 1)
    }
  }
  cancelDelete()
}

const cancelDelete = () => {
  console.log(`[v0] Cancelled delete operation`)
  showDeleteModal.value = false
  reportToDelete.value = null
}

onMounted(() => {
  console.log('[v0] Financial Reports component mounted')
})
</script>
