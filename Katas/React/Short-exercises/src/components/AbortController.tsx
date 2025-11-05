import { useEffect, useState } from 'react'

export const Abort = () => {
  const [data, setData] = useState<Record<string, string | number>[]>([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent('Barcelona')}&format=json&limit=10`,
          { signal: controller.signal }
        )
        const data = await res.json()
        setData(data)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      }
    }

    fetchData()

    return () => controller.abort() // cleanup on unmount
  }, [])

  return (
    <>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.display_name}</li>
        ))}
      </ul>
    </>
  )
}
