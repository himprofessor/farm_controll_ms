
<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <p class="text-gray-500">{{ $t('financial.loading') }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ $t('financial.error') }}</p>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-6">
      <!-- Page Header -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900">{{ $t('financial.reports.title') }}</h2>
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('financial.reports.profitLoss') }}</h3>
          <p class="text-gray-600 text-sm">{{ $t('financial.reports.profitLossDesc') }}</p>
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('financial.reports.cashFlow') }}</h3>
          <p class="text-gray-600 text-sm">{{ $t('financial.reports.cashFlowDesc') }}</p>
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('financial.reports.expenseAnalysis') }}</h3>
          <p class="text-gray-600 text-sm">{{ $t('financial.reports.expenseAnalysisDesc') }}</p>
        </div>
      </div>

      <!-- Report Generation Modal -->
      <div v-if="showReportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ $t('financial.reports.generate', { title: currentReportTitle }) }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('financial.reports.reportPeriod') }}
              </label>
              <select
                v-model="reportPeriod"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="this-month">{{ $t('financial.income.filters.thisMonth') }}</option>
                <option value="last-month">{{ $t('financial.income.filters.lastMonth') }}</option>
                <option value="this-quarter">{{ $t('financial.income.filters.thisQuarter') }}</option>
                <option value="this-year">{{ $t('financial.income.filters.thisYear') }}</option>
                <option value="custom">{{ $t('financial.reports.custom') }}</option>
              </select>
            </div>

            <div v-if="reportPeriod === 'custom'" class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('financial.reports.startDate') }}
                </label>
                <input
                  v-model="customStartDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('financial.reports.endDate') }}
                </label>
                <input
                  v-model="customEndDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('financial.reports.format') }}
              </label>
              <select
                v-model="reportFormat"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pdf">{{ $t('financial.reports.pdf') }}</option>
                <option value="excel">{{ $t('financial.reports.excel') }}</option>
                <option value="csv">{{ $t('financial.reports.csv') }}</option>
              </select>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="processReport"
              class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
            >
              {{ $t('financial.reports.generateButton') }}
            </button>
            <button
              @click="closeModal"
              class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              {{ $t('confirmationDialog.cancel') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Reports Section -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('financial.reports.recentReports') }}</h3>
        <div class="space-y-3">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <FileText class="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ report.name || $t('staffCard.na') }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(report.date) }} • {{ report.format.toUpperCase() }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="downloadReport(report.id)"
                class="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                {{ $t('financial.reports.download') }}
              </button>
              <button
                @click="viewReport(report.id)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {{ $t('financial.reports.view') }}
              </button>
            </div>
          </div>

          <div v-if="recentReports.length === 0" class="text-center py-8">
            <FileText class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500">{{ $t('financial.reports.noReports') }}</p>
            <p class="text-sm text-gray-400">{{ $t('financial.reports.noReportsHint') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { saveAs } from 'file-saver'
import { TrendingUp, ArrowUpDown, PieChart, ChevronRight, FileText, X } from 'lucide-vue-next'
import API from '@/plugin/axios'

const { t: $t, locale } = useI18n()
const toast = useToast()
const showReportModal = ref(false)
const currentReportType = ref('')
const currentReportTitle = ref('')
const reportPeriod = ref('this-month')
const reportFormat = ref('pdf')
const customStartDate = ref('')
const customEndDate = ref('')
const recentReports = ref([])
const isLoading = ref(true)
const error = ref(null)

const reportTitles = {
  'profit-loss': $t('financial.reports.profitLoss'),
  'cash-flow': $t('financial.reports.cashFlow'),
  'expense-analysis': $t('financial.reports.expenseAnalysis'),
}

const fetchReports = async () => {
  try {
    isLoading.value = true
    const res = await API.get('/financial/reports')
    recentReports.value = res.data.map(report => ({
      id: report.id || '',
      name: report.name || $t('staffCard.na'),
      date: report.date || $t('staffCard.na'),
      format: report.format || 'pdf',
      type: report.type || 'profit-loss',
    }))
  } catch (err) {
    error.value = err.message
    toast.error($t('financial.error'))
  } finally {
    await nextTick()
    isLoading.value = false
  }
}

const generateReport = async (reportType) => {
  currentReportType.value = reportType
  currentReportTitle.value = reportTitles[reportType]
  showReportModal.value = true
  await nextTick()
}

const closeModal = async () => {
  showReportModal.value = false
  reportPeriod.value = 'this-month'
  reportFormat.value = 'pdf'
  customStartDate.value = ''
  customEndDate.value = ''
  currentReportType.value = ''
  currentReportTitle.value = ''
  await nextTick()
}

const processReport = async () => {
  if (reportPeriod.value === 'custom' && (!customStartDate.value || !customEndDate.value)) {
    toast.error($t('financial.reports.dateRequired'))
    return
  }

  const payload = {
    type: currentReportType.value,
    period: reportPeriod.value,
    format: reportFormat.value,
    ...(reportPeriod.value === 'custom' && {
      startDate: customStartDate.value,
      endDate: customEndDate.value,
    }),
  }

  try {
    const res = await API.post('/financial/reports', payload)
    recentReports.value.unshift({
      id: res.data.id,
      name: res.data.name || `${currentReportTitle.value} - ${getPeriodLabel()}`,
      date: res.data.date || new Date().toISOString().split('T')[0],
      format: res.data.format || reportFormat.value,
      type: res.data.type || currentReportType.value,
    })
    toast.success($t('financial.reports.generated', { title: currentReportTitle.value }))
  } catch (err) {
    toast.error($t('financial.error'))
  } finally {
    await closeModal()
  }
}

const downloadReport = async (reportId) => {
  try {
    const res = await API.get(`/financial/reports/${reportId}/download`, { responseType: 'blob' })
    const report = recentReports.value.find(r => r.id === reportId)
    const fileName = `${report.name}.${report.format}`
    saveAs(res.data, fileName)
    toast.success($t('financial.reports.downloaded', { name: report.name }))
  } catch (err) {
    toast.error($t('financial.error'))
  }
}

const viewReport = async (reportId) => {
  try {
    const res = await API.get(`/financial/reports/${reportId}/view`, { responseType: 'blob' })
    const report = recentReports.value.find(r => r.id === reportId)
    const url = window.URL.createObjectURL(res.data)
    window.open(url, '_blank')
    toast.success($t('financial.reports.viewed', { name: report.name }))
  } catch (err) {
    toast.error($t('financial.error'))
  }
}

const getPeriodLabel = () => {
  const labels = {
    'this-month': $t('financial.income.filters.thisMonth'),
    'last-month': $t('financial.income.filters.lastMonth'),
    'this-quarter': $t('financial.income.filters.thisQuarter'),
    'this-year': $t('financial.income.filters.thisYear'),
    'custom': $t('financial.reports.custom'),
  }
  return labels[reportPeriod.value] || $t('financial.reports.custom')
}

const formatDate = (dateString) => {
  if (!dateString || dateString === $t('staffCard.na')) return $t('staffCard.na')
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}

onMounted(fetchReports)
</script>
