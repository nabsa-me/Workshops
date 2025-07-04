import { useState, useDeferredValue, useMemo, useTransition } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchQuery } from './petAPIService'
import Results from './Results'
import useBreedList from './useBreedList'
import { Animal, Pet } from './APIResponsesTypes'
import { all } from './SearchParamsSlice'

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

interface States {
  adoptedPet: { value: Pet }
  searchParams: {
    value: { animal: Animal; breed: string; location: string }
  }
}

const SearchParams = () => {
  const adoptedPet = useSelector((state: States) => state.adoptedPet?.value)
  const searchParams = useSelector((state: States) => state.searchParams?.value)

  const [animal, setAnimal] = useState('' as Animal)
  const [breeds] = useBreedList(animal)
  const dispatch = useDispatch()
  const [isPending, startTransition] = useTransition()

  const { data: pets } = useSearchQuery(searchParams)
  const deferredPets = useDeferredValue((pets as Pet[]) ?? [])
  const renderedPets = useMemo(() => <Results pets={deferredPets} />, [deferredPets])

  return (
    <div className='my-0 mx-auto w-11/12'>
      <form
        className='p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center'
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const obj = {
            animal: (formData.get('animal')?.toString() as Animal) ?? ('' as Animal),
            breed: formData.get('breed')?.toString() ?? '',
            location: formData.get('location')?.toString() ?? ''
          }
          startTransition(() => {
            dispatch(all(obj))
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
              setAnimal(e.target.value as Animal)
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal)
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
            {Array.isArray(breeds) &&
              breeds.map((breed) => (
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
