export const toDateString = (date: string) => {
  if (!date) {
    return '-'
  }

  const value = new Date(date)

  if (Number.isNaN(value.getTime())) {
    return '-'
  }

  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, '0')
  const day = `${value.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}
