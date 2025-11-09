import { useState } from 'react'
import { useAddTask } from '../hooks/useTasks'

export const Input = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const addTask = useAddTask()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue) addTask(inputValue)
    setInputValue('')
  }

  return (
    <div className='single-box rounded'>
      <div className='button inactive'></div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='My new Todoy is...'
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue || ''}
        ></input>
      </form>
    </div>
  )
}
