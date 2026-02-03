import ky from 'ky'
import type { Maintenances } from '@/types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL과 ANON KEY를 환경 변수에 설정해주세요.')
}

/**
 * Supabase REST API 클라이언트
 * ky를 사용하여 Supabase와 통신합니다.
 */
const client = ky.create({
  prefixUrl: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
})

export const getMaintenances = async (): Promise<Maintenances[]> => {
  return client
    .get('maintenances', {
      searchParams: {
        select: '*, customers(name, phone_number)',
      },
    })
    .json<Maintenances[]>()
}
