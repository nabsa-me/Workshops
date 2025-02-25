const testPizza = {
  id: 'calabrese',
  name: 'The Calabrese Pizza',
  category: 'Supreme',
  description: 'Description for my pizza',
  image: '/public/pizzas/calabrese.webp',
  size: { S: 12.25, M: 16.25, L: 20.25 }
}

const testPizzaOfTheDay = {
  id: 'pepperoni',
  name: 'The Pepperoni Pizza',
  category: 'Classic',
  description: 'Mozzarella Cheese, Pepperoni',
  image: '/public/pizzas/pepperoni.webp',
  sizes: { S: 9.75, M: 12.55, L: 15.25 }
}

const testOrderValue = [
  {
    order_id: 21355,
    date: '2025-02-23',
    time: '10:23:07'
  }
]
const testPastOrders = {
  order: {
    total: 25,
    order_id: 21355,
    date: '2025-02-23',
    time: '10:23:07'
  },
  orderItems: [
    {
      pizzaTypeId: 'pepperoni',
      name: 'The Pepperoni Pizza',
      category: 'Classic',
      description: 'Mozzarella Cheese, Pepperoni',
      quantity: 2,
      price: 12.57,
      total: 25.03,
      size: 'M',
      image: '/public/pizzas/pepperoni.webp'
    }
  ]
}

const testCart = [
  {
    pizza: {
      id: 'pepperoni',
      name: 'The Pepperoni Pizza',
      category: 'Classic',
      description: 'Mozzarella Cheese, Pepperoni',
      image: '/public/pizzas/pepperoni.webp',
      sizes: {
        S: 9.75,
        M: 12.5,
        L: 15.25
      }
    },
    size: 'S',
    price: '$12.50'
  },
  {
    pizza: {
      id: 'pepperoni',
      name: 'The Pepperoni Pizza',
      category: 'Classic',
      description: 'Mozzarella Cheese, Pepperoni',
      image: '/public/pizzas/pepperoni.webp',
      sizes: {
        S: 9.75,
        M: 12.5,
        L: 15.25
      }
    },
    size: 'M',
    price: '$15.25'
  },
  {
    pizza: {
      id: 'pepperoni',
      name: 'The Pepperoni Pizza',
      category: 'Classic',
      description: 'Mozzarella Cheese, Pepperoni',
      image: '/public/pizzas/pepperoni.webp',
      sizes: {
        S: 9.75,
        M: 12.5,
        L: 15.25
      }
    },
    size: 'L',
    price: '$12.50'
  }
]

export { testPizza, testPizzaOfTheDay, testPastOrders, testOrderValue, testCart }
