import { useEffect } from 'react'
import { useHooks } from './useHooks'

export const useDoneEffect = () => {
  const { doneEffect, setDoneEffect } = useHooks()

  useEffect(() => {
    if (doneEffect < 0) setDoneEffect(Math.floor(Math.random() * 21))
  }, [doneEffect])

  return { doneEffect, setDoneEffect }
}
