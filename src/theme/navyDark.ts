import type { ThemeConfig } from 'antd'
import { theme } from 'antd'

const { darkAlgorithm } = theme

/**
 * 네이비 톤 다크 모드 테마
 * antd darkAlgorithm + 네이비 계열 시드 토큰 오버라이드
 */
export const navyDarkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    // 네이비 블루 계열 primary
    colorPrimary: '#5b8def',
    colorPrimaryHover: '#7ba3f5',
    colorPrimaryActive: '#4a7ad9',
    // 다크 배경을 네이비 톤으로 (기본 다크 그레이 대신)
    colorBgBase: '#0f172a',
    colorBgContainer: '#1e293b',
    colorBgElevated: '#334155',
    colorBorder: '#334155',
    colorBorderSecondary: '#475569',
  },
  components: {
    Table: {
      cellPaddingBlockSM: 2,
      cellPaddingInlineSM: 8,
    },
  },
}
