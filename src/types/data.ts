import type { Component } from 'vue'

export interface ModalProps {
  openModal: boolean
  title?: string
}
export interface CardProps {
  title: string
  value: string
  icon?: Component
}

export interface DashboardData {
  soc_summary: Supplier[]
  awarding_company_summary: Company[]
  total_transaction: string
  transaction_value: string
  transaction_cost: string
  avg_completed_date: string
  total_disbursement: string
  gross_profitability: string
  transaction_type_summary: TransactionData[]
}

export interface Company {
  awarding_company: string
  value_usd: string
  color?: string
  width?: string
}

export interface Supplier {
  name: string
  value_usd: string
}

export interface Transaction {
  name: string
  value: string
  icon: Component
}

export interface TransactionData {
  transaction_type: string
  value_usd: string
}

export interface SupplierOemSubcontractors {
  soc_name: string
  country: string
  continent: string
  basis_of_selection: string
  incoterms: string
  previous_purchase: number
  delivery_time: number
  procurement_type: string
  payment_terms: string
  item_cost_currency: string
  item_cost: number
  logistics_cost_currency: string
  logistics_cost: number
  other_cost_currency: string
  other_cost: number
  funding_request_currency: string
  funding_request: number
  pro_forma_invoice?: File | null
}
export interface TransactionDetails {
  transaction_type: string
  awarding_company_id: string
  previous_transaction: number
  estimated_value: number
  estimated_value_currency: string
  awarding_payment_terms: string
  incoterms: string
  duration: number
  payment_after_invoice: number
  purchase_order: File | null
  previous_invoice: File | null
  bank_statement: File | null
  supplier_oem_subcontractors: SupplierOemSubcontractors[]
}
