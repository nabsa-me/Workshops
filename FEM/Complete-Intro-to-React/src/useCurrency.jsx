const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export const priceConverter = (price) => intl.format(price)
