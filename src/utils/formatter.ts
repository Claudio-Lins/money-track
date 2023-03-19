export const dateFormatter = new Intl.DateTimeFormat('pt-PT')

export const priceFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
})