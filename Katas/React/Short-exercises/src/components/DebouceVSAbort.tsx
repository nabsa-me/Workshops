import { useEffect, useState } from 'react'

export function DebounceVSAbort() {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Record<string, string | number>[]>([])

  const apiCall = async (signal: AbortSignal) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10`,
        { signal }
      )
      const data = await res.json()
      setResults(data)
    } catch (error: any) {
      if (error.name !== 'AbortError') console.error(error)
    }
  }

  useEffect(() => {
    if (!query) return

    const controller = new AbortController()
    const timeoutId = setTimeout(() => apiCall(controller.signal), 500)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handleChange} />
      <p>The results are:</p>
      <ul>
        {results.length ? (
          results?.map((item, index) => <li key={index}>{item.display_name}</li>)
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  )
}
