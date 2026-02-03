export const toDateString = (date: string) => {
  return date ? new Date(date).toLocaleDateString('ko-KR') : '-'
}
