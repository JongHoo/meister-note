import { Modal, Space, Tag } from 'antd'
import type { Maintenances } from '@/types'
import { toDateString } from '@/utils/to'

type Props = {
  open: boolean
  maintenance: Maintenances | null
  statusColorMap: Record<Maintenances['status'], string>
  statusLabelMap: Record<Maintenances['status'], string>
  paymentMethodLabelMap: Record<Maintenances['payment_method'], string>
  onCloseClick: () => void
}

export const MaintenanceDetailModal = ({
  open,
  maintenance,
  statusColorMap,
  statusLabelMap,
  paymentMethodLabelMap,
  onCloseClick,
}: Props) => {
  if (!maintenance) {
    return null
  }

  const dateText = (() => {
    if (
      maintenance.status === 'RECEIVED' ||
      maintenance.status === 'IN_PROGRESS'
    ) {
      return `접수일 ${toDateString(maintenance.received_at)}`
    }

    if (maintenance.status === 'COMPLETED') {
      return `접수일 ${toDateString(maintenance.received_at)} / 완료일 ${toDateString(
        maintenance.completed_at,
      )}`
    }

    return `접수일 ${toDateString(maintenance.received_at)} / 완료일 ${toDateString(
      maintenance.completed_at,
    )} / 출고일 ${toDateString(maintenance.released_at)}`
  })()

  return (
    <Modal
      open={open}
      onCancel={onCloseClick}
      footer={null}
      title="정비 상세 정보"
      centered
      aria-label="정비 상세 정보 모달"
    >
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        <Space size="small" align="center">
          <Tag color={statusColorMap[maintenance.status]}>
            {statusLabelMap[maintenance.status]}
          </Tag>
          <span>{dateText}</span>
        </Space>

        <div>
          <h3 style={{ marginBottom: 8 }}>고객 정보</h3>
          <div>
            {maintenance.customers.name} {maintenance.customers.phone_number}
          </div>
          {maintenance.customers.memo && (
            <div style={{ marginTop: 4, fontSize: 12, color: '#888' }}>
              메모: {maintenance.customers.memo}
            </div>
          )}
        </div>

        <div>
          <h3 style={{ marginBottom: 8 }}>차량 정보</h3>
          <div>
            {maintenance.model_name} / {maintenance.plate_number}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#888' }}>
            VIN: {maintenance.vin} · 주행거리:{' '}
            {maintenance.distance.toLocaleString()} km
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 8 }}>정비 내역</h3>
          {maintenance.details.length === 0 ? (
            <span>정비 내역이 없습니다.</span>
          ) : (
            <table
              style={{ width: '100%', borderCollapse: 'collapse' }}
              aria-label="정비 상세 내역"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      borderBottom: '1px solid #f0f0f0',
                      padding: '4px 0',
                    }}
                  >
                    항목
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      borderBottom: '1px solid #f0f0f0',
                      padding: '4px 0',
                    }}
                  >
                    수량
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      borderBottom: '1px solid #f0f0f0',
                      padding: '4px 0',
                    }}
                  >
                    단가
                  </th>
                  <th
                    style={{
                      textAlign: 'right',
                      borderBottom: '1px solid #f0f0f0',
                      padding: '4px 0',
                    }}
                  >
                    금액
                  </th>
                </tr>
              </thead>
              <tbody>
                {maintenance.details.map((detail) => {
                  const lineTotal = detail.price * detail.amount
                  return (
                    <tr key={detail.title}>
                      <td style={{ padding: '4px 0' }}>{detail.title}</td>
                      <td
                        style={{
                          padding: '4px 0',
                          textAlign: 'right',
                        }}
                      >
                        {detail.amount.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: '4px 0',
                          textAlign: 'right',
                        }}
                      >
                        {detail.price.toLocaleString()}원
                      </td>
                      <td
                        style={{
                          padding: '4px 0',
                          textAlign: 'right',
                        }}
                      >
                        {lineTotal.toLocaleString()}원
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <h3 style={{ marginBottom: 8 }}>결제 정보</h3>
          <div>
            결제 방법: {paymentMethodLabelMap[maintenance.payment_method]}
          </div>
          <div style={{ marginTop: 4 }}>
            공급가액 {maintenance.net_amount.toLocaleString()}원 / 부가세{' '}
            {maintenance.tax_amount.toLocaleString()}원 / 합계{' '}
            <strong>{maintenance.total_amount.toLocaleString()}원</strong>
          </div>
        </div>
      </Space>
    </Modal>
  )
}
