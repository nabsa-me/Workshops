import { useState, useEffect } from 'react'
import useBreedList from './useBreedList'
import Results from './Results'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
  const [location, setLocation] = useState('')
  const [animal, setAnimal] = useState('')
  const [breed, setBreed] = useState('')
  const [pets, setPets] = useState([])
  const [breeds] = useBreedList(animal)

  useEffect(() => {
    requestPets()
  }, [])

  async function requestPets() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
    const json = await res.json()
    setPets(json.pets)
  }

  return (
    <div className='search-params'>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          requestPets()
        }}
      >
        <label htmlFor='location'>
          Location
          <input
            onChange={(event) => {
              setLocation(event.target.value)
            }}
            id='location'
            value={location}
            placeholder='location'
          />
        </label>
        <label htmlFor='animal'>
          Animal
          <select
            id='animal'
            value={animal}
            onChange={(event) => {
              setAnimal(event.target.value)
              setBreed('')
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
          <select
            id='breed'
            disabled={breeds.length === 0}
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
          >
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
