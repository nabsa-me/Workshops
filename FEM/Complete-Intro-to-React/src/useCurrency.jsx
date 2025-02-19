const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export default function useCurrency(price) {
  return intl.format(price)
}

export const priceConverter = (price) => intl.format(price)
