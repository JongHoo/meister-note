import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Table, Tag, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getMaintenances } from '@/api/client'
import type { Maintenances, MaintenanceDetail } from '@/types'
import { toDateString } from '@/utils/to'

const statusColorMap: Record<Maintenances['status'], string> = {
  RECEIVED: 'blue',
  IN_PROGRESS: 'orange',
  COMPLETED: 'green',
  RELEASED: 'default',
}

const statusLabelMap: Record<Maintenances['status'], string> = {
  RECEIVED: '접수',
  IN_PROGRESS: '진행중',
  COMPLETED: '완료',
  RELEASED: '출고',
}

const paymentMethodLabelMap: Record<Maintenances['payment_method'], string> = {
  CASH: '현금',
  CARD: '카드',
  TRANSFER: '계좌이체',
  OTHER: '기타',
}

const MaintenancePage = () => {
  const { data: maintenances, isLoading } = useQuery({
    queryKey: ['maintenances'],
    queryFn: getMaintenances,
  })

  const columns: ColumnsType<Maintenances> = [
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: Maintenances['status']) => (
        <Tag color={statusColorMap[status]}>{statusLabelMap[status]}</Tag>
      ),
    },
    {
      title: '고객 정보',
      dataIndex: 'customer',
      key: 'customer',
      width: 120,
      render: (_, record) => (
        <Space orientation="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>{record.customers.name}</span>
          <span style={{ fontSize: '12px', color: '#888' }}>
            {record.customers.phone_number}
          </span>
        </Space>
      ),
    },
    {
      title: '차량 정보',
      key: 'vehicle',
      width: 200,
      render: (_, record) => (
        <Space orientation="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>{record.model_name}</span>
          <span style={{ fontSize: '12px', color: '#888' }}>{record.vin}</span>
        </Space>
      ),
    },
    {
      title: '주행거리',
      dataIndex: 'distance',
      key: 'distance',
      width: 120,
      render: (distance: number) => `${distance.toLocaleString()} km`,
    },
    {
      title: '상세 내용',
      dataIndex: 'details',
      key: 'details',
      ellipsis: true,
      render: (details: MaintenanceDetail[]) => {
        const firstTitle = details[0]?.title || '-'
        const additionalCount = details.length - 1
        return (
          <span>
            {firstTitle}
            {additionalCount > 0 && ` 외 ${additionalCount}건`}
          </span>
        )
      },
    },
    {
      title: '결제 금액',
      key: 'amount',
      width: 150,
      render: (_, record) => (
        <Space orientation="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>
            {record.total_amount.toLocaleString()}원
          </span>
          <span style={{ fontSize: '12px', color: '#888' }}>
            (부가세: {record.tax_amount.toLocaleString()}원)
          </span>
        </Space>
      ),
    },
    {
      title: '결제 방법',
      dataIndex: 'payment_method',
      key: 'payment_method',
      width: 100,
      render: (method: Maintenances['payment_method']) =>
        paymentMethodLabelMap[method],
    },
    {
      title: '접수일',
      dataIndex: 'received_at',
      key: 'received_at',
      width: 100,
      render: (date: string) => toDateString(date),
    },
    {
      title: '완료일',
      dataIndex: 'completed_at',
      key: 'completed_at',
      width: 100,
      render: (date: string) => toDateString(date),
    },
    {
      title: '출고일',
      dataIndex: 'released_at',
      key: 'released_at',
      width: 100,
      render: (date: string) => toDateString(date),
    },
  ]

  return (
    <div>
      <Table
        size="small"
        columns={columns}
        dataSource={maintenances}
        loading={isLoading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `총 ${total}건`,
        }}
        scroll={{ x: 1200 }}
      />
    </div>
  )
}

export const Route = createFileRoute('/maintenance')({
  component: MaintenancePage,
})
