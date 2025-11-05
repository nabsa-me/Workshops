import { useState } from 'react'

export function Query() {
  const [query, setQuery] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handleChange} />
      <p>Searching for: {query}</p>
    </div>
  )
}
