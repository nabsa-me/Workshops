import { useEffect, useState } from 'react'

export const useDoneEffect = () => {
  const [doneEffect, setDoneEffect] = useState<number>(Math.floor(Math.random() * 21))

  useEffect(() => {
    if (doneEffect < 0) setDoneEffect(Math.floor(Math.random() * 21))
  }, [doneEffect])

  return { doneEffect, setDoneEffect }
}
