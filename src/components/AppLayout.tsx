import { Layout, Menu, theme, type MenuProps } from 'antd'
import { DashboardOutlined, ToolOutlined } from '@ant-design/icons'
import { useNavigate, useRouterState } from '@tanstack/react-router'

const { Header, Content } = Layout
const { useToken } = theme

type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '대시보드',
  },
  {
    key: '/maintenance',
    icon: <ToolOutlined />,
    label: '정비 이력',
  },
]

type AppLayoutProps = {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { token } = useToken()
  const navigate = useNavigate()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate({ to: key })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingInline: 24,
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorder}`,
        }}
      >
        <h1
          style={{
            margin: 0,
            marginRight: 32,
            fontSize: 20,
            fontWeight: 600,
            color: token.colorPrimary,
            flexShrink: 0,
          }}
        >
          Meister Note
        </h1>
        <Menu
          mode="horizontal"
          selectedKeys={[currentPath]}
          items={menuItems}
          onClick={onMenuClick}
          style={{
            flex: 1,
            minWidth: 0,
            borderBottom: 'none',
            background: 'transparent',
          }}
        />
      </Header>
      <Content
        style={{
          padding: 24,
          background: token.colorBgContainer,
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}
