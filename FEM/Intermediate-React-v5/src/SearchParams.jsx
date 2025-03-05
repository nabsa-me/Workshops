import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchSearch from './fetchSearch'
import useBreedList from './useBreedList'
import Results from './Results'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({ location: '', animal: '', breed: '' })
  const [animal, setAnimal] = useState('')
  const [breeds] = useBreedList(animal)

  const results = useQuery(['search', requestParams], fetchSearch)
  const pets = results?.data?.pets ?? []

  return (
    <div className='search-params'>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.target)
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? ''
          }
          setRequestParams(obj)
        }}
      >
        <label htmlFor='location'>
          Location
          <input name='location' id='location' placeholder='location' />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            onChange={(event) => {
              setAnimal(event.target.value)
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor='breed'>
          Breed
          <select id='breed' disabled={breeds.length === 0} name='breed'>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams
