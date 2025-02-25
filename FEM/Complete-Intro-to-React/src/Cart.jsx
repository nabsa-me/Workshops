import { priceConverter } from './useCurrency'

export default function Cart({ cart, checkout }) {
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i]
    total += current.pizza.sizes[current.size]
  }
  return (
    <div className='cart'>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li title='item' key={index}>
            <span title='item-size' className='size'>
              {item.size}
            </span>{' '}
            {'–'}
            <span title='item-type' className='type'>
              {item.pizza.name}
            </span>{' '}
            {'–'}
            <span title='item-price' className='price'>
              {item.price}
            </span>
          </li>
        ))}
      </ul>
      <p title='total'>Total: {priceConverter(total)}</p>
      <button type='button' onClick={checkout}>
        Checkout
      </button>
    </div>
  )
}
