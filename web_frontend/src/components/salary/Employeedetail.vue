<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">{{ employee.name }}</h3>
              <p class="text-lg text-gray-600">{{ employee.position }}</p>
              <p class="text-sm text-gray-500">Employee ID: {{ employee.id }}</p>
            </div>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-6">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon"></path>
              </svg>
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="space-y-6">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Personal Information -->
              <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Personal Information
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Full Name:</span>
                    <span class="font-medium">{{ employee.name }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Email:</span>
                    <span class="font-medium">{{ employee.email }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Phone:</span>
                    <span class="font-medium">{{ employee.phone }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Address:</span>
                    <span class="font-medium">{{ employee.address }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Date of Birth:</span>
                    <span class="font-medium">{{ employee.dateOfBirth }}</span>
                  </div>
                </div>
              </div>

              <!-- Employment Information -->
              <div class="bg-blue-50 p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                  </svg>
                  Employment Details
                </h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Position:</span>
                    <span class="font-medium">{{ employee.position }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Department:</span>
                    <span class="font-medium">{{ employee.department }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Hire Date:</span>
                    <span class="font-medium">{{ employee.hireDate }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Employment Type:</span>
                    <span class="font-medium">{{ employee.employmentType }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Manager:</span>
                    <span class="font-medium">{{ employee.manager }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Salary Overview -->
            <div class="bg-green-50 p-6 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                Salary Information
              </h4>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ formatCurrency(employee.baseSalary) }}</div>
                  <div class="text-sm text-gray-600">Base Salary</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{{ formatCurrency(employee.currentBalance) }}</div>
                  <div class="text-sm text-gray-600">Current Balance</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(employee.totalEarned) }}</div>
                  <div class="text-sm text-gray-600">Total Earned</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900">{{ employee.lastPayment }}</div>
                  <div class="text-sm text-gray-600">Last Payment</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment History Tab -->
          <div v-if="activeTab === 'payments'">
            <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h4 class="text-lg font-semibold text-gray-900">Payment History</h4>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="payment in employee.paymentHistory" :key="payment.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payment.date }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payment.type }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{{ formatCurrency(payment.amount) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ payment.method }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                          payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        ]">
                          {{ payment.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Performance Tab -->
          <div v-if="activeTab === 'performance'">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Performance Metrics -->
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                <div class="space-y-4">
                  <div v-for="metric in employee.performanceMetrics" :key="metric.name">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">{{ metric.name }}</span>
                      <span class="text-sm font-medium">{{ metric.score }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-blue-600 h-2 rounded-full" 
                        :style="{ width: metric.score + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Reviews -->
              <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h4>
                <div class="space-y-4">
                  <div v-for="review in employee.reviews" :key="review.id" class="border-l-4 border-blue-500 pl-4">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ review.title }}</p>
                        <p class="text-xs text-gray-500">{{ review.date }}</p>
                      </div>
                      <span class="text-sm font-medium text-blue-600">{{ review.rating }}/5</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Documents Tab -->
          <div v-if="activeTab === 'documents'">
            <div class="bg-white border border-gray-200 rounded-lg">
              <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h4 class="text-lg font-semibold text-gray-900">Employee Documents</h4>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="document in employee.documents" :key="document.id" 
                       class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center space-x-3">
                      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ document.name }}</p>
                        <p class="text-xs text-gray-500">{{ document.type }} • {{ document.uploadDate }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Close
        </button>
        <button
          @click="editEmployee"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Edit Employee
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeDetailsModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    employee: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'overview',
      tabs: [
        {
          id: 'overview',
          name: 'Overview',
          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        },
        {
          id: 'payments',
          name: 'Payment History',
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
        },
        {
          id: 'performance',
          name: 'Performance',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        },
        {
          id: 'documents',
          name: 'Documents',
          icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        }
      ]
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    editEmployee() {
      this.$emit('edit-employee', this.employee)
      this.closeModal()
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }
  }
}
</script>
