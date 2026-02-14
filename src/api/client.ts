import ky from 'ky'
import type { Maintenances } from '@/types'
import { mockMaintenances } from '@/mocks/maintenances'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
/** 개발 시 API 호출 절약: DEV이거나 VITE_USE_MAINTENANCE_MOCK=true 이면 mock 사용 */
const USE_MAINTENANCE_MOCK =
  import.meta.env.DEV || import.meta.env.VITE_USE_MAINTENANCE_MOCK === 'true'

if (!USE_MAINTENANCE_MOCK && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  throw new Error('Supabase URL과 ANON KEY를 환경 변수에 설정해주세요.')
}

/**
 * Supabase REST API 클라이언트
 * ky를 사용하여 Supabase와 통신합니다.
 */
const client =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? ky.create({
        prefixUrl: `${SUPABASE_URL}/rest/v1`,
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      })
    : null

export const getMaintenances = async (): Promise<Maintenances[]> => {
  if (USE_MAINTENANCE_MOCK) {
    return Promise.resolve(mockMaintenances)
  }
  if (!client) {
    throw new Error('Supabase URL과 ANON KEY를 환경 변수에 설정해주세요.')
  }
  return client
    .get('maintenances', {
      searchParams: {
        select: '*, customers(name, phone_number)',
      },
    })
    .json<Maintenances[]>()
}
