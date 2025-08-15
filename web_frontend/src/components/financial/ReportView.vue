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
      <!-- Profit & Loss Modal -->
      <div v-if="currentReportType === 'profit-loss'" class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4 sticky top-0 bg-white pb-4">
          <h3 class="text-lg font-semibold text-gray-900">Generate {{ currentReportTitle }}</h3>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- First Row - Detail Level and Report Period -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Detail Level -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Detail Level</label>
              <select 
                v-model="reportDetailLevel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="summary">Summary View</option>
                <option value="detailed">Detailed Breakdown</option>
                <option value="by-department">By Department</option>
              </select>
            </div>

            <!-- Report Period -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Report Period</label>
              <select 
                v-model="reportPeriod"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          
          <!-- Custom Date Range -->
          <div v-if="reportPeriod === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="customStartDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="customEndDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
            </div>
          </div>

          <!-- Pig Farm Specific Categories -->
          <div v-if="showCategoryFilters">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ categoryFilterLabel }}
            </label>
            <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
              <!-- Revenue Categories -->
              <div class="col-span-2 font-medium text-sm text-gray-500 pt-2">Revenue</div>
              <div v-for="category in filteredCategories.filter(c => c.type === 'revenue')" :key="category.id" class="flex items-center">
                <input 
                  v-model="selectedCategories"
                  type="checkbox" 
                  :id="category.id" 
                  :value="category.id"
                  class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                >
                <label :for="category.id" class="ml-2 text-sm text-gray-700">{{ category.name }}</label>
              </div>
              
              <!-- Expense Categories -->
              <div class="col-span-2 font-medium text-sm text-gray-500 pt-2">Expenses</div>
              <div v-for="category in filteredCategories.filter(c => c.type === 'expense')" :key="category.id" class="flex items-center">
                <input 
                  v-model="selectedCategories"
                  type="checkbox" 
                  :id="category.id" 
                  :value="category.id"
                  class="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                >
                <label :for="category.id" class="ml-2 text-sm text-gray-700">{{ category.name }}</label>
              </div>
            </div>
          </div>
          
          <!-- Export Format -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
            <select 
              v-model="reportFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-3 mt-6 sticky bottom-0 bg-white pt-4">
          <button 
            @click="processReport"
            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 text-sm"
          >
            Generate Report
          </button>
          <button 
            @click="showReportModal = false"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Cash Flow Report Modal -->
      <div v-if="currentReportType === 'cash-flow'" class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Generate Cash Flow Report</h3>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
    
        <div class="space-y-4">
          <!-- Combined Report Period and Cash Flow Type -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Report Period</label>
              <select 
                v-model="reportPeriod"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <!-- Cash Flow Type -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cash Flow Type</label>
              <select 
                v-model="cashFlowType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Transactions</option>
                <option value="inflows">Inflows Only</option>
                <option value="outflows">Outflows Only</option>
              </select>
            </div>
          </div>
          
          <!-- Custom Date Range -->
          <div v-if="reportPeriod === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="customStartDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="customEndDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- Accounts -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Accounts</label>
            <div class="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-md">
              <div v-for="account in accounts" :key="account.id" class="flex items-center">
                <input 
                  v-model="selectedAccounts"
                  type="checkbox" 
                  :id="account.id" 
                  :value="account.id"
                  class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                >
                <label :for="account.id" class="ml-2 text-sm text-gray-700">{{ account.name }}</label>
              </div>
            </div>
          </div>

          <!-- Format -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
            <select 
              v-model="reportFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <!-- Additional Options -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Options</label>
            <div class="flex items-center">
              <input 
                v-model="includeForecast"
                type="checkbox" 
                id="forecast"
                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              >
              <label for="forecast" class="ml-2 text-sm text-gray-700">Include Forecast</label>
            </div>
            <div class="flex items-center">
              <input 
                v-model="showRunningBalance"
                type="checkbox" 
                id="running-balance"
                class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              >
              <label for="running-balance" class="ml-2 text-sm text-gray-700">Show Running Balance</label>
            </div>
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

      <!-- Expense Analysis Modal -->
      <div v-if="currentReportType === 'expense-analysis'" class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4 sticky top-0 bg-white pb-4">
          <h3 class="text-lg font-semibold text-gray-900">Generate Farm Expense Analysis</h3>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="space-y-4">
          <!-- First Row - Period and Group By -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Report Period</label>
              <select 
                v-model="reportPeriod"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <!-- Group By -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Group By</label>
              <select 
                v-model="expenseGroupBy"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                <option value="category">Category</option>
                <option value="barn">Barn/Section</option>
                <option value="supplier">Supplier</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>
          
          <!-- Custom Date Range -->
          <div v-if="reportPeriod === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="customStartDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="customEndDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
            </div>
          </div>

          <!-- Farm Expense Categories -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Farm Expense Categories</label>
            <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md">
              <!-- Animal Related -->
              <div class="col-span-2 font-medium text-sm text-gray-500 pt-2">Animal Costs</div>
              <div v-for="category in expenseCategories.filter(c => c.type === 'animal')" :key="category.id" class="flex items-center">
                <input 
                  v-model="selectedExpenseCategories"
                  type="checkbox" 
                  :id="category.id" 
                  :value="category.id"
                  class="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                >
                <label :for="category.id" class="ml-2 text-sm text-gray-700 truncate">{{ category.name }}</label>
              </div>
              
              <!-- Facility Costs -->
              <div class="col-span-2 font-medium text-sm text-gray-500 pt-2">Facility Costs</div>
              <div v-for="category in expenseCategories.filter(c => c.type === 'facility')" :key="category.id" class="flex items-center">
                <input 
                  v-model="selectedExpenseCategories"
                  type="checkbox" 
                  :id="category.id" 
                  :value="category.id"
                  class="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                >
                <label :for="category.id" class="ml-2 text-sm text-gray-700 truncate">{{ category.name }}</label>
              </div>
              
              <!-- Operational Costs -->
              <div class="col-span-2 font-medium text-sm text-gray-500 pt-2">Operational Costs</div>
              <div v-for="category in expenseCategories.filter(c => c.type === 'operation')" :key="category.id" class="flex items-center">
                <input 
                  v-model="selectedExpenseCategories"
                  type="checkbox" 
                  :id="category.id" 
                  :value="category.id"
                  class="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                >
                <label :for="category.id" class="ml-2 text-sm text-gray-700 truncate">{{ category.name }}</label>
              </div>
            </div>
          </div>

          <!-- Options Checkboxes -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center">
              <input 
                v-model="includeSubcategories"
                type="checkbox" 
                id="subcategories"
                class="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              >
              <label for="subcategories" class="ml-2 text-sm text-gray-700">Include Subcategories</label>
            </div>
            <div class="flex items-center">
              <input 
                v-model="showPercentages"
                type="checkbox" 
                id="percentages"
                class="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              >
              <label for="percentages" class="ml-2 text-sm text-gray-700">Show Percentages</label>
            </div>
            <div class="flex items-center">
              <input 
                v-model="compareToBudget"
                type="checkbox" 
                id="budget-comparison"
                class="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              >
              <label for="budget-comparison" class="ml-2 text-sm text-gray-700">Compare to Budget</label>
            </div>
          </div>

          <!-- Export Format -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
            <select 
              v-model="reportFormat"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-3 mt-6 sticky bottom-0 bg-white pt-4">
          <button 
            @click="processReport"
            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 text-sm"
          >
            Generate Report
          </button>
          <button 
            @click="showReportModal = false"
            class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200 text-sm"
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
            <!-- Download Icon Button -->
            <button @click="downloadReport(report)" class="text-green-600 hover:text-green-700 p-1" title="Download">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
            </button>

            <!-- View Icon Button -->
            <button @click="viewReport(report)" class="text-blue-600 hover:text-blue-700 p-1" title="View">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
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

    <!-- View Report Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4 sticky top-0 bg-white pb-4">
          <h3 class="text-lg font-semibold text-gray-900">Viewing: {{ selectedReport.name }}</h3>
          <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-4">
          <p><strong>Date:</strong> {{ formatDate(selectedReport.date) }}</p>
          <p><strong>Format:</strong> {{ selectedReport.format.toUpperCase() }}</p>
          <p><strong>Details:</strong></p>
          <ul class="list-disc pl-5">
            <li v-if="selectedReport.detailLevel">Detail Level: {{ selectedReport.detailLevel }}</li>
            <li v-if="selectedReport.categories && selectedReport.categories.length">Categories: {{ selectedReport.categories.join(', ') }}</li>
            <li v-if="selectedReport.cashFlowType">Cash Flow Type: {{ selectedReport.cashFlowType }}</li>
            <li v-if="selectedReport.accounts && selectedReport.accounts.length">Accounts: {{ selectedReport.accounts.join(', ') }}</li>
            <li v-if="selectedReport.includeForecast">Includes Forecast</li>
            <li v-if="selectedReport.showRunningBalance">Shows Running Balance</li>
            <li v-if="selectedReport.groupBy">Grouped By: {{ selectedReport.groupBy }}</li>
            <li v-if="selectedReport.includeSubcategories">Includes Subcategories</li>
            <li v-if="selectedReport.showPercentages">Shows Percentages</li>
            <li v-if="selectedReport.compareToBudget">Compares to Budget</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  TrendingUp, 
  ArrowUpDown, 
  PieChart, 
  ChevronRight, 
  FileText, 
  X 
} from 'lucide-vue-next'

const showReportModal = ref(false)
const showViewModal = ref(false)
const currentReportType = ref('')
const currentReportTitle = ref('')
const reportPeriod = ref('this-month')
const reportFormat = ref('pdf')
const reportDetailLevel = ref('summary')
const customStartDate = ref('')
const customEndDate = ref('')
const selectedCategories = ref([])
const cashFlowType = ref('all')
const selectedAccounts = ref([])
const includeForecast = ref(false)
const showRunningBalance = ref(false)

// Expense Analysis specific refs
const expenseGroupBy = ref('category')
const selectedExpenseCategories = ref([])
const includeSubcategories = ref(false)
const showPercentages = ref(true)
const compareToBudget = ref(false)

// Sample category data for pig farm
const categories = ref([
  // Revenue Categories
  { id: 'rev-pig-sales', name: 'Pig Sales', type: 'revenue' },
  { id: 'rev-breeding', name: 'Breeding Services', type: 'revenue' },
  { id: 'rev-manure', name: 'Manure Sales', type: 'revenue' },
  { id: 'rev-other', name: 'Other Income', type: 'revenue' },
  
  // Expense Categories
  { id: 'exp-feed', name: 'Animal Feed', type: 'expense' },
  { id: 'exp-medicine', name: 'Veterinary/Medicine', type: 'expense' },
  { id: 'exp-labor', name: 'Farm Labor', type: 'expense' },
  { id: 'exp-utilities', name: 'Farm Utilities', type: 'expense' },
  { id: 'exp-equipment', name: 'Equipment Maintenance', type: 'expense' },
  { id: 'exp-breeding', name: 'Breeding Costs', type: 'expense' },
  { id: 'exp-housing', name: 'Housing Maintenance', type: 'expense' },
  { id: 'exp-transport', name: 'Transportation', type: 'expense' }
])

// Sample account data
const accounts = ref([
  { id: 'operating', name: 'Operating Account' },
  { id: 'savings', name: 'Savings Account' },
  { id: 'credit', name: 'Credit Card' },
  { id: 'investment', name: 'Investment Account' },
])

// Expense categories
// Pig farm specific expense categories
const expenseCategories = ref([
  // Animal Related Expenses
  { id: 'feed', name: 'Animal Feed', type: 'animal' },
  { id: 'medicine', name: 'Veterinary/Medicine', type: 'animal' },
  { id: 'breeding', name: 'Breeding Costs', type: 'animal' },
  { id: 'vaccines', name: 'Vaccines', type: 'animal' },
  { id: 'livestock', name: 'Livestock Purchases', type: 'animal' },
  
  // Facility Costs
  { id: 'barn-maint', name: 'Barn Maintenance', type: 'facility' },
  { id: 'equipment', name: 'Equipment', type: 'facility' },
  { id: 'utilities', name: 'Farm Utilities', type: 'facility' },
  { id: 'repairs', name: 'Repairs', type: 'facility' },
  { id: 'cleaning', name: 'Cleaning Supplies', type: 'facility' },
  
  // Operational Costs
  { id: 'labor', name: 'Farm Labor', type: 'operation' },
  { id: 'transport', name: 'Transportation', type: 'operation' },
  { id: 'insurance', name: 'Insurance', type: 'operation' },
  { id: 'permits', name: 'Permits/Licenses', type: 'operation' },
  { id: 'office', name: 'Office Expenses', type: 'operation' }
])

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

const selectedReport = ref(null)

const reportTitles = {
  'profit-loss': 'Profit & Loss Statement',
  'cash-flow': 'Cash Flow Report',
  'expense-analysis': 'Expense Analysis'
}

// Computed properties
const showCategoryFilters = computed(() => {
  return currentReportType.value === 'profit-loss' && reportDetailLevel.value !== 'summary'
})

const categoryFilterLabel = computed(() => {
  return reportDetailLevel.value === 'by-department' ? 'Departments' : 'Categories'
})

const filteredCategories = computed(() => {
  return categories.value.filter(cat => {
    if (currentReportType.value === 'expense-analysis') {
      return cat.type === 'expense'
    }
    return true // For P&L show all when not filtered
  })
})

// Methods
const generateReport = (reportType) => {
  currentReportType.value = reportType
  currentReportTitle.value = reportTitles[reportType]
  selectedCategories.value = [] // Reset category selections
  selectedAccounts.value = [] // Reset account selections
  selectedExpenseCategories.value = [] // Reset expense category selections
  showReportModal.value = true
}

const processReport = () => {
  // Simulate report generation
  const newReport = {
    id: Date.now(),
    name: `${currentReportTitle.value} - ${getPeriodLabel()}`,
    date: new Date().toISOString().split('T')[0],
    format: reportFormat.value,
    type: currentReportType.value,
    // Profit & Loss specific fields
    ...(currentReportType.value === 'profit-loss' && {
      detailLevel: reportDetailLevel.value,
      categories: selectedCategories.value.length > 0 ? selectedCategories.value : null
    }),
    // Cash Flow specific fields
    ...(currentReportType.value === 'cash-flow' && {
      accounts: selectedAccounts.value.length > 0 ? selectedAccounts.value : null,
      cashFlowType: cashFlowType.value,
      includeForecast: includeForecast.value,
      showRunningBalance: showRunningBalance.value
    }),
    // Expense Analysis specific fields
    ...(currentReportType.value === 'expense-analysis' && {
      groupBy: expenseGroupBy.value,
      categories: selectedExpenseCategories.value.length > 0 ? selectedExpenseCategories.value : null,
      includeSubcategories: includeSubcategories.value,
      showPercentages: showPercentages.value,
      compareToBudget: compareToBudget.value
    })
  }
  
  recentReports.value.unshift(newReport)
  showReportModal.value = false
  
  // Reset form
  reportPeriod.value = 'this-month'
  reportFormat.value = 'pdf'
  reportDetailLevel.value = 'summary'
  customStartDate.value = ''
  customEndDate.value = ''
  selectedCategories.value = []
  selectedAccounts.value = []
  selectedExpenseCategories.value = []
  cashFlowType.value = 'all'
  includeForecast.value = false
  showRunningBalance.value = false
  expenseGroupBy.value = 'category'
  includeSubcategories.value = false
  showPercentages.value = true
  compareToBudget.value = false
  
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

const viewReport = (report) => {
  selectedReport.value = report
  showViewModal.value = true
}

const downloadReport = (report) => {
  let content;
  const fileName = `${report.name}.${report.format}`;

  // Generate content based on format
  switch (report.format) {
    case 'pdf':
      // Placeholder for PDF content (requires a library like jsPDF for real PDF generation)
      content = `%PDF-1.4\n% This is a minimal PDF placeholder\n`;
      break;
    case 'excel':
      // Simple tabular data for Excel compatibility
      content = `Date,Description,Amount\n2025-08-13,Sample Income,1000\n2025-08-13,Sample Expense,-500`;
      break;
    case 'csv':
      // Simple CSV content
      content = `Date,Description,Amount\n2025-08-13,Sample Income,1000\n2025-08-13,Sample Expense,-500`;
      break;
    default:
      content = `Report Content for ${report.name}`;
  }

  const blob = new Blob([content], { type: `application/${report.format === 'excel' ? 'vnd.ms-excel' : report.format}` });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
</script>