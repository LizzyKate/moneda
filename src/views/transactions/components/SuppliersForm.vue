<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import InputField from '../../../components/InputField.vue'
import DropdownSelect from '../../../components/DropdownSelect.vue'
import CurrencyField from '../../../components/CurrencyField.vue'
import FileUpload from '../../../components/FileUpload.vue'
import { useSummaryStore } from '../../../stores'

const summaryStore = useSummaryStore()
const emit = defineEmits(['update:currentForm'])
// Form state
const formData = ref<{
  nameOfSupplier: string
  paymentTerms: string
  country: string
  supplierIncoterms: string
  deliveryTime: number
  no_of_previous_purchases: number
  basis_of_selection_of_supplier: string
  continent: string
  procurementType: string
  costOfItems: { selectedCurrency: string; amount: number }
  logisticsCost: { selectedCurrency: string; amount: number }
  others: { selectedCurrency: string; amount: number }
  fundingRequest: { selectedCurrency: string; amount: number }
  proFormaInvoice: File | null
}>({
  nameOfSupplier: '',
  paymentTerms: '',
  country: '',
  supplierIncoterms: '',
  deliveryTime: 0,
  no_of_previous_purchases: 0,
  basis_of_selection_of_supplier: '',
  continent: '',
  procurementType: '',
  costOfItems: {
    selectedCurrency: '',
    amount: 0,
  },
  logisticsCost: {
    selectedCurrency: '',
    amount: 0,
  },
  others: {
    selectedCurrency: '',
    amount: 0,
  },
  fundingRequest: {
    selectedCurrency: '',
    amount: 0,
  },
  proFormaInvoice: null,
})

const isSubmitting = computed(() => summaryStore.isSubmitting)

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

const paymentTermsOptions = [
  { label: 'Upfront Payment', value: 'upfront_payment' },
  { label: 'Milestone Payment', value: 'milestone_payment' },
  { label: 'Deferred Payment', value: 'deferred_payment' },
]

const countries = [
  { label: 'Nigeria', value: 'nigeria' },
  { label: 'Ghana', value: 'ghana' },
  { label: 'Kenya', value: 'kenya' },
  { label: 'South Africa', value: 'south_africa' },
  { label: 'Togo', value: 'togo' },
  { label: 'Benin', value: 'benin' },
  { label: 'Cameroon', value: 'cameroon' },
  { label: 'Senegal', value: 'senegal' },
  { label: 'Ivory Coast', value: 'ivory_coast' },
  { label: 'Mali', value: 'mali' },
  { label: 'Burkina Faso', value: 'burkina_faso' },
  { label: 'Niger', value: 'niger' },
  { label: 'Chad', value: 'chad' },
  { label: 'Sudan', value: 'sudan' },
  { label: 'Egypt', value: 'egypt' },
  { label: 'Morocco', value: 'morocco' },
  { label: 'Algeria', value: 'algeria' },
  { label: 'Tunisia', value: 'tunisia' },
  { label: 'Libya', value: 'libya' },
  { label: 'Mauritania', value: 'mauritania' },
  { label: 'Western Sahara', value: 'western_sahara' },
  { label: 'Guinea', value: 'guinea' },
  { label: 'Sierra Leone', value: 'sierra_leone' },
  { label: 'Liberia', value: 'liberia' },
  { label: 'Ivory Coast', value: 'ivory_coast' },
  { label: 'Ghana', value: 'ghana' },
  { label: 'Togo', value: 'togo' },
  { label: 'Benin', value: 'benin' },
  { label: 'Nigeria', value: 'nigeria' },
  { label: 'Cameroon', value: 'cameroon' },
  { label: 'Central African Republic', value: 'central_african_republic' },
  { label: 'Equatorial Guinea', value: 'equatorial_guinea' },
  { label: 'Gabon', value: 'gabon' },
  { label: 'Congo', value: 'congo' },
  { label: 'Democratic Republic of the Congo', value: 'democratic_republic_of_the_congo' },
]

const deliveryTimeOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
]

const no_of_previous_purchasesOptions = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
]

const basis_of_selection_of_supplierOptions = [
  { label: 'Contractor’s Choice', value: 'Contractor’s Choice' },
  { label: 'Awarding Company’s Choice', value: 'Awarding Company’s Choice' },
]

const continentsOptions = [
  { label: 'Africa', value: 'africa' },
  { label: 'Antarctica', value: 'antarctica' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'North America', value: 'north_america' },
  { label: 'Oceania', value: 'oceania' },
  { label: 'South America', value: 'south_america' },
]

const procurementTypeOptions = [
  { label: 'Bespoke', value: 'bespoke' },
  { label: 'Off-the-shelf', value: 'off_the_shelf' },
]
// Validation rules
const rules = {
  nameOfSupplier: [{ required: true, message: 'Name of supplier is required', trigger: 'blur' }],
  paymentTerms: [{ required: true, message: 'Payment terms is required', trigger: 'change' }],
  country: [{ required: true, message: 'Country is required', trigger: 'change' }],
  supplierIncoterms: [
    { required: true, message: 'Supplier incoterms is required', trigger: 'change' },
  ],
  deliveryTime: [{ required: true, message: 'Delivery time is required', trigger: 'change' }],
  no_of_previous_purchases: [
    { required: true, message: 'Number of previous purchases is required', trigger: 'change' },
  ],
  basis_of_selection_of_supplier: [
    { required: true, message: 'Basis of selection of supplier is required', trigger: 'change' },
  ],
  continent: [{ required: true, message: 'Continent is required', trigger: 'change' }],
  procurementType: [{ required: true, message: 'Procurement type is required', trigger: 'change' }],
  costOfItems: [
    { required: true, message: 'Cost of items is required', trigger: 'blur' },
    {
      validator: (
        rule: { field: string },
        value: { selectedCurrency: string; amount: number },
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
  logisticsCost: [
    { required: true, message: 'Logistics cost is required', trigger: 'blur' },
    {
      validator: (
        rule: { field: string },
        value: { selectedCurrency: string; amount: number },
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
  others: [
    { required: true, message: 'Others is required', trigger: 'blur' },
    {
      validator: (
        rule: { field: string },
        value: { selectedCurrency: string; amount: number },
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
  fundingRequest: [
    { required: true, message: 'Funding request is required', trigger: 'blur' },
    {
      validator: (
        rule: { field: string },
        value: { selectedCurrency: string; amount: number },
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
  proFormaInvoice: [
    { required: true, message: 'Pro-forma invoice is required', trigger: 'change' },
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

const goToPreviousForm = () => {
  emit('update:currentForm', 0)
}

// Submit handler
const handleSubmit = async () => {
  if (!formRef.value) return

  formRef.value.validate((valid: boolean) => {
    if (valid) {
      const supplierData = {
        soc_name: formData.value.nameOfSupplier,
        country: formData.value.country,
        continent: formData.value.continent,
        basis_of_selection: formData.value.basis_of_selection_of_supplier,
        incoterms: formData.value.supplierIncoterms,
        previous_purchase: formData.value.no_of_previous_purchases,
        delivery_time: formData.value.deliveryTime,
        procurement_type: formData.value.procurementType,
        payment_terms: formData.value.paymentTerms,
        item_cost_currency: formData.value.costOfItems.selectedCurrency,
        item_cost: formData.value.costOfItems.amount,
        logistics_cost_currency: formData.value.logisticsCost.selectedCurrency,
        logistics_cost: formData.value.logisticsCost.amount,
        other_cost_currency: formData.value.others.selectedCurrency,
        other_cost: formData.value.others.amount,
        funding_request_currency: formData.value.fundingRequest.selectedCurrency,
        funding_request: formData.value.fundingRequest.amount,
        pro_forma_invoice: formData.value.proFormaInvoice,
      }
      summaryStore.updateTransactionDetails({
        supplier_oem_subcontractors: [supplierData],
      })
      summaryStore.submitTransactionData()
    }
    return !valid
  })
}
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <div class="md:flex block items-start justify-between md:space-x-8">
      <div class="md:w-1/2 w-full">
        <el-form-item prop="nameOfSupplier">
          <InputField
            v-model="formData.nameOfSupplier"
            type="text"
            placeholder="Enter name of supplier"
            label="Name of Supplier[1]"
          />
        </el-form-item>
        <el-form-item prop="paymentTerms">
          <DropdownSelect
            v-model="formData.paymentTerms"
            :options="paymentTermsOptions"
            placeholder="Select payment terms"
            label="Payment Terms"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="country">
          <DropdownSelect
            v-model="formData.country"
            :options="countries"
            placeholder="Select country"
            label="Country"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="supplierIncoterms">
          <DropdownSelect
            v-model="formData.supplierIncoterms"
            :options="incotermsOptions"
            placeholder="Select supplier incoterms"
            label="Supplier Incoterms"
          />
        </el-form-item>
        <el-form-item class="mt-7" props="deliveryTime">
          <DropdownSelect
            v-model="formData.deliveryTime"
            :options="deliveryTimeOptions"
            placeholder="Select delivery time"
            label="Delivery Time(days)"
          />
        </el-form-item>
      </div>

      <div class="md:w-1/2 w-full">
        <el-form-item prop="no_of_previous_purchases">
          <DropdownSelect
            v-model="formData.no_of_previous_purchases"
            :options="no_of_previous_purchasesOptions"
            placeholder="Select number of previous purchases"
            label="No. of Previous Purchases"
          />
        </el-form-item>
        <el-form-item class="mt-4" props="basis_of_selection_of_supplier">
          <DropdownSelect
            v-model="formData.basis_of_selection_of_supplier"
            :options="basis_of_selection_of_supplierOptions"
            placeholder="Select basis of selection of supplier"
            label="Basis of Selection of Supplier(Choice)"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="continent">
          <DropdownSelect
            v-model="formData.continent"
            :options="continentsOptions"
            placeholder="Select continent"
            label="Continent"
          />
        </el-form-item>
        <el-form-item class="mt-7" prop="procurementType">
          <DropdownSelect
            v-model="formData.procurementType"
            :options="procurementTypeOptions"
            placeholder="Select procurement type"
            label="Procurement Type"
          />
        </el-form-item>
      </div>
    </div>

    <div class="md:mt-4 mt-8">
      <h3 class="text-[#A6A6A6] poppins-medium text-xl">Cost</h3>
      <div class="md:grid block grid-cols-2 gap-x-4">
        <el-form-item prop="costOfItems">
          <CurrencyField
            v-model="formData.costOfItems"
            placeholder="Enter cost of items"
            label="Cost of Items"
          />
        </el-form-item>
        <el-form-item prop="logisticsCost">
          <CurrencyField
            v-model="formData.logisticsCost"
            placeholder="Enter logistics cost"
            label="Logistics Cost"
          />
        </el-form-item>
        <el-form-item prop="others">
          <CurrencyField v-model="formData.others" placeholder="Enter other costs" label="Others" />
        </el-form-item>
        <el-form-item prop="fundingRequest">
          <CurrencyField
            v-model="formData.fundingRequest"
            placeholder="Enter funding request"
            label="Funding Request"
          />
        </el-form-item>
      </div>
      <div class="mt-4">
        <el-form-item prop="proFormaInvoice">
          <FileUpload
            v-model="formData.proFormaInvoice"
            :allowed-types="['.pdf', '.docx', '.pptx', '.xlsx']"
            label="Pro-Forma Invoice"
            required
          />
        </el-form-item>
      </div>
    </div>
    <div class="flex justify-center items-center md:mt-0 mt-8 space-x-8">
      <el-button
        @click="goToPreviousForm"
        type="button"
        class="!border-0 !text-base poppns-medium text-[#4B5563]"
        >Back</el-button
      >
      <el-form-item>
        <el-button
          class="!bg-[#CC5500] !rounded-[4px] !border !h-[50px] !py-3 !px-4 !text-white poppins-medium !text-base disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleSubmit"
          :disabled="isSubmitting || !isFormValid"
        >
          <span v-if="isSubmitting">Submitting...</span>
          <span v-else>Submit</span>
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<style scoped></style>
