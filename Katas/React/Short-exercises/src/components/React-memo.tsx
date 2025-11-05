import React, { useState } from 'react'

const Item = React.memo(({ name }: { name: string }) => {
  console.log('Rendering:', name)
  return <li>{name}</li>
})

// const Item = ({ name }: { name: string }) => {
//   console.log('Rendering:', name)
//   return <li>{name}</li>
// }

export function ItemList({ items }: { items: string[] }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Click {count}</button>
      <ul>
        {items.map((item) => (
          <Item key={item} name={item} />
        ))}
      </ul>
    </div>
  )
}
