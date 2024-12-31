<script lang="ts" setup>
import { Warning } from '@element-plus/icons-vue'
import { ref, watch, onMounted, computed } from 'vue'
import InputField from '../../../components/InputField.vue'
import DropdownSelect from '../../../components/DropdownSelect.vue'
import CurrencyField from '../../../components/CurrencyField.vue'
import FileUpload from '../../../components/FileUpload.vue'
import { useSummaryStore } from '../../../stores'

const summaryStore = useSummaryStore()
const emit = defineEmits(['update:currentForm'])

// Form state
const formData = ref<{
  purchaseOrder: File | null
  awardingCompany: string
  contractValue: { selectedCurrency: string; amount: number }
  incoterms: string
  invoiceDays: number
  previousInvoice: File | null
  bankStatement: File | null
  no_of_previous_contracts: number
  paymentTerms: string
  executionTime: number
}>({
  purchaseOrder: null,
  awardingCompany: '',
  contractValue: { selectedCurrency: '', amount: 0 },
  incoterms: '',
  invoiceDays: 0,
  previousInvoice: null,
  bankStatement: null,
  no_of_previous_contracts: 0,
  paymentTerms: '',
  executionTime: 0,
})

const awardingCompanies = computed(() => summaryStore.awardingCompanies)

const awardingCompanyOptions = computed(() =>
  awardingCompanies.value.map((company) => ({
    label: company.name,
    value: company.id,
  })),
)

const incotermsOptions = [
  { label: 'Ex-works', value: 'Ex-works' },
  { label: 'FCA', value: 'FCA' },
  { label: 'CPT', value: 'CPT' },
  { label: 'Dat', value: 'DAT' },
  { label: 'Fas', value: 'FAS' },
  { label: 'FOB', value: 'FOB' },
  { label: 'CFR', value: 'CFR' },
  { label: 'CIP', value: 'CIP' },
  { label: 'CIF', value: 'CIF' },
  { label: 'DAP', value: 'DAP' },
  { label: 'DDP', value: 'DDP' },
]

const no_of_previous_contractsOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
]

const paymentTermsOptions = [
  { label: 'Milestone Payment', value: 'milestone_payment' },
  { label: 'Bullet Payment', value: 'bullet_payment' },
]

// Validation rules
const rules = {
  awardingCompany: [{ required: true, message: 'Awarding company is required', trigger: 'change' }],
  contractValue: [
    { required: true, message: 'Contract value is required', trigger: 'blur' },
    {
      validator: (
        rule: { field: string },
        value: { selectedCurrency: string | null; amount: number },
        callback: (error?: Error) => void,
      ) => {
        if (!value || !value.selectedCurrency || !value.amount) {
          callback(new Error('Please select a currency and enter an amount'))
        } else if (value.amount <= 0) {
          callback(new Error('Amount must be greater than zero'))
        } else {
          callback() // validation passes
        }
      },
      trigger: 'blur',
    },
  ],
  incoterms: [{ required: true, message: 'Incoterms is required', trigger: 'change' }],
  invoiceDays: [
    { required: true, message: 'Invoice days is required', trigger: 'blur' },
    {
      validator: (rule: { field: string }, value: number, callback: (error?: Error) => void) => {
        if (value <= 0) callback(new Error('Invoice days must be greater than zero'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
  purchaseOrder: [{ required: true, message: 'Purchase order is required', trigger: 'change' }],
  previousInvoice: [{ required: true, message: 'Previous invoice is required', trigger: 'change' }],
  bankStatement: [{ required: true, message: 'Bank statement is required', trigger: 'change' }],
  no_of_previous_contracts: [
    { required: true, message: 'Number of previous contracts is required', trigger: 'change' },
    {
      validator: (rule: { field: string }, value: number, callback: (error?: Error) => void) => {
        if (value <= 0)
          callback(new Error('Number of previous contracts must be greater than zero'))
        else callback()
      },
      trigger: 'change',
    },
  ],
  paymentTerms: [{ required: true, message: 'Payment terms is required', trigger: 'change' }],
  executionTime: [
    { required: true, message: 'Execution time is required', trigger: 'blur' },
    {
      validator: (rule: { field: string }, value: number, callback: (error?: Error) => void) => {
        if (value <= 0) callback(new Error('Execution time must be greater than zero'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
}

const formRef = ref()

const isFormValid = ref(false)

watch(
  () => formData.value,
  async () => {
    if (!formRef.value) {
      isFormValid.value = false
      return
    }

    try {
      await formRef.value.validate()
      isFormValid.value = true
    } catch {
      isFormValid.value = false
    }
  },
  { deep: true },
)

// Submit handler
const handleSubmit = async () => {
  if (!formRef.value) return

  formRef.value.validate((valid: boolean) => {
    if (valid) {
      summaryStore.updateTransactionDetails({
        transaction_type: 'procurement',
        awarding_company_id: formData.value.awardingCompany,
        previous_transaction: Number(formData.value.no_of_previous_contracts),
        estimated_value: Number(formData.value.contractValue.amount),
        estimated_value_currency: formData.value.contractValue.selectedCurrency,
        awarding_payment_terms: formData.value.paymentTerms,
        incoterms: formData.value.incoterms,
        duration: Number(formData.value.executionTime),
        payment_after_invoice: Number(formData.value.invoiceDays),
        purchase_order: formData.value.purchaseOrder,
        previous_invoice: formData.value.previousInvoice,
        bank_statement: formData.value.bankStatement,
      })
      emit('update:currentForm', 1)
    }
    return !valid
  })
}

onMounted(() => {
  summaryStore.fetchAwardingCompanies()
})
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <div class="flex items-start justify-between space-x-8">
      <div class="w-1/2">
        <el-form-item prop="awardingCompany">
          <DropdownSelect
            v-model="formData.awardingCompany"
            :options="awardingCompanyOptions"
            placeholder="Select awarding company"
            label="Awarding Company"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="contractValue">
          <CurrencyField v-model="formData.contractValue" label="Value of contract" />
        </el-form-item>
        <el-form-item class="mt-7" prop="incoterms">
          <DropdownSelect
            v-model="formData.incoterms"
            :options="incotermsOptions"
            placeholder="Select incoterms"
            label="Incoterms"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="invoiceDays">
          <InputField
            v-model="formData.invoiceDays"
            type="number"
            placeholder="Enter invoice days"
            label="Payment after Invoice(days)"
          />
        </el-form-item>
        <el-form-item class="mt-12" prop="purchaseOrder">
          <FileUpload
            v-model="formData.purchaseOrder"
            :allowed-types="['.pdf', '.docx', '.pptx', '.xlsx']"
            label="Purchase Order"
            required
          />
        </el-form-item>
        <div class="mt-8">
          <div class="flex items-center space-x-4">
            <p class="text-sm poppins-medium text-[#665E59]">Previous Contracts Information</p>
            <el-icon>
              <Warning color="#665E59" size="14" />
            </el-icon>
          </div>
          <div class="mt-4 flex items-center space-x-12">
            <el-form-item prop="previousInvoice">
              <FileUpload
                v-model="formData.previousInvoice"
                :allowed-types="['.pdf', '.docx', '.pptx', '.xlsx']"
                label="Previous Invoice"
                required
              />
            </el-form-item>
            <el-form-item prop="bankStatement">
              <FileUpload
                v-model="formData.bankStatement"
                :allowed-types="['.pdf', '.docx', '.pptx', '.xlsx']"
                label="Bank Statement"
                required
              />
            </el-form-item>
          </div>
        </div>
      </div>

      <div class="w-1/2">
        <el-form-item prop="no_of_previous_contracts">
          <DropdownSelect
            v-model="formData.no_of_previous_contracts"
            :options="no_of_previous_contractsOptions"
            placeholder="Select number of previous contracts"
            label="No. of Previous Contracts"
          />
        </el-form-item>
        <el-form-item class="mt-7" props="paymentTerms">
          <DropdownSelect
            v-model="formData.paymentTerms"
            :options="paymentTermsOptions"
            placeholder="Select payment terms"
            label="Payment Terms"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="executionTime">
          <InputField
            v-model="formData.executionTime"
            type="number"
            placeholder="Enter execution time"
            label="Execution Time(days)"
          />
        </el-form-item>
      </div>
    </div>

    <el-form-item class="!text-center">
      <el-button
        class="!bg-[#CC5500] !rounded-[4px] !border w-[68px] !h-[50px] !py-3 !px-4 !text-white poppins-medium !text-base disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleSubmit"
        :disabled="!isFormValid"
      >
        Next
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped></style>
