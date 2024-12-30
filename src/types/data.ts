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
