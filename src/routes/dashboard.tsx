import { createFileRoute } from '@tanstack/react-router'

const DashboardPage = () => {
  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>대시보드</h2>
      <p>대시보드 페이지입니다.</p>
    </div>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})
