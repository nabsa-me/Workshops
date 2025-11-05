import { useEffect, useState } from 'react'

export function Debounce() {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<string[]>([])

  const apiCall = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10`
    )
    const data = await res.json()
    const names = data.map((item: any) => item.display_name)
    setResults(names)

    return names
  }

  useEffect(() => {
    if (!query) return

    const timeoutId = setTimeout(() => apiCall(), 500)
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handleChange} />
      <p>The results are:</p>
      <ul>{results.length ? results?.map((name, index) => <li key={index}>{name}</li>) : <p>No results found</p>}</ul>
    </div>
  )
}
