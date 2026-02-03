export type Maintenances = {
  id: number
  status: 'RECEIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'RELEASED'
  customers: Customers
  model_name: string
  vin: string
  plate_number: string
  distance: number
  details: MaintenanceDetail[]
  net_amount: number
  tax_amount: number
  total_amount: number
  payment_method: 'CASH' | 'CARD' | 'TRANSFER' | 'OTHER'
  received_at: string
  completed_at: string
  released_at: string
  created_at: string
  updated_at: string
}

export type MaintenanceDetail = {
  price: number
  title: string
  amount: number
}

export type Customers = {
  id: number
  name: string
  phone_number: string
  memo: string
  created_at: string
  updated_at: string
}
