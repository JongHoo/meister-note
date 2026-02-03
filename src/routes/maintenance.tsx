import { createFileRoute } from '@tanstack/react-router'

const MaintenancePage = () => {
  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>정비 이력</h2>
      <p>정비 이력 페이지입니다.</p>
    </div>
  )
}

export const Route = createFileRoute('/maintenance')({
  component: MaintenancePage,
})
