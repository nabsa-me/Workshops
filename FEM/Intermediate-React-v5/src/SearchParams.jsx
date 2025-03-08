import { useContext, useState, useDeferredValue, useMemo, useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'
import Results from './Results'
import AdoptedPetContext from './AdoptedPetContext'
import useBreedList from './useBreedList'
import fetchSearch from './fetchSearch'
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: ''
  })
  const [adoptedPet] = useContext(AdoptedPetContext)
  const [animal, setAnimal] = useState('')
  const [breeds] = useBreedList(animal)
  const [isPending, startTransition] = useTransition()

  const results = useQuery(['search', requestParams], fetchSearch)
  const pets = results?.data?.pets ?? []
  const deferredPets = useDeferredValue(pets)
  const renderedPets = useMemo(() => <Results pets={deferredPets} />, [deferredPets])

  return (
    <div className='my-0 mx-auto w-11/12'>
      <form
        className='p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center'
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? ''
          }
          startTransition(() => {
            setRequestParams(obj)
          })
        }}
      >
        {adoptedPet ? (
          <div className='pet image-container'>
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor='location'>
          Location
          <input id='location' name='location' placeholder='Location' type='text' className='search-input' />
        </label>

        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            name='animal'
            className='search-input grayed-out-disabled'
            onChange={(e) => {
              setAnimal(e.target.value)
            }}
            onBlur={(e) => {
              setAnimal(e.target.value)
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor='breed'>
          Breed
          <select disabled={!breeds.length} id='breed' name='breed' className='w-60 mb-5 block disabled:opacity-50'>
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className='mini loading-pane'>
            <h2 className='loader'>🐩</h2>
          </div>
        ) : (
          <button className='rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500'>Submit</button>
        )}
      </form>
      {renderedPets}
    </div>
  )
}

export default SearchParams
