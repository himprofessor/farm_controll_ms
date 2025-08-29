<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold">Process Payment - {{ employee?.name }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✖</button>
      </div>

      <!-- Body -->
      <div class="px-6 py-4 space-y-4">
        <p><strong>Base Salary:</strong> {{ formatCurrency(employee?.baseSalary) }}</p>
        <p><strong>Current Balance:</strong> {{ formatCurrency(employee?.currentBalance) }}</p>
        <p><strong>Total Earned:</strong> {{ formatCurrency(employee?.totalEarned) }}</p>

        <!-- Withdrawal -->
        <div>
          <label class="block text-sm font-medium">Withdrawal Amount</label>
          <input
            v-model.number="amount"
            type="number"
            class="w-full px-3 py-2 border rounded-md"
            placeholder="Enter withdrawal amount"
          />
        </div>

        <!-- Base Salary Override -->
        <div>
          <label class="block text-sm font-medium">Base Salary (Optional)</label>
          <input
            v-model.number="baseSalaryInput"
            type="number"
            class="w-full px-3 py-2 border rounded-md"
            placeholder="Enter base salary"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-between space-x-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>

        <div class="flex space-x-2">
          <!-- Base Salary Payment -->
          <button
            @click="payBaseSalary"
            :disabled="loading"
            class="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            <span v-if="loadingType === 'base'" class="loader mr-2"></span>
            {{ loadingType === 'base' ? 'Processing...' : 'Pay Base Salary' }}
          </button>

          <!-- Withdrawal Request -->
          <button
            @click="withdrawRequest"
            :disabled="loading"
            class="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            <span v-if="loadingType === 'withdraw'" class="loader mr-2"></span>
            {{ loadingType === 'withdraw' ? 'Processing...' : 'Withdraw' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "@/plugin/axios";

const props = defineProps({
  isOpen: Boolean,
  employee: Object,
});

const emit = defineEmits(["close", "payment-processed"]);

const amount = ref(0);
// Set default base salary to 400 if not provided
const baseSalaryInput = ref(props.employee?.baseSalary ?? 400);
const loading = ref(false);
const loadingType = ref("");

const formatCurrency = (value) => {
  if (!value) return "$0.00";
  return `$${parseFloat(value).toFixed(2)}`;
};

// Pay Base Salary
const payBaseSalary = async () => {
  const salary = baseSalaryInput.value ;
  if (!salary || salary <= 0) {
    alert("Base salary is required");
    return;
  }
  await processPayment(salary, "base");
};

// Withdrawal Request
const withdrawRequest = async () => {
  if (!amount.value || amount.value <= 0) {
    alert("Please enter a valid withdrawal amount");
    return;
  }
  const newBalance = (props.employee.currentBalance || 0) - amount.value;
  if (newBalance < 0) {
    alert("Withdrawal exceeds current balance!");
    return;
  }
  await processPayment(amount.value, "withdraw");
};

// Core Payment Logic
const processPayment = async (paymentAmount, type) => {
  try {
    loading.value = true;
    loadingType.value = type;

    const today = new Date().toISOString().split("T")[0];

    let updatedBalance = props.employee.currentBalance || 0;
    let updatedTotalEarned = props.employee.totalEarned || 0;

    if (type === "base") {
      updatedBalance += paymentAmount;
      updatedTotalEarned += paymentAmount;
    } else {
      updatedBalance -= paymentAmount;
    }

    const response = await API.post("/salaries", {
      staff_id: props.employee.id,
      base_salary: baseSalaryInput.value || 400,
      current_balance: updatedBalance,
      total_Earned: updatedTotalEarned,
      amount: paymentAmount,
      last_payment_date: today,
    });

    emit("payment-processed", response.data);
    emit("close");

    // Reset form
    amount.value = 0;
    baseSalaryInput.value = props.employee?.baseSalary ?? 400;
  } catch (error) {
    console.error("Error processing payment:", error.response?.data || error);
    alert(
      "Failed to process payment: " +
        (error.response?.data?.message || "Unknown error")
    );
  } finally {
    loading.value = false;
    loadingType.value = "";
  }
};
</script>
