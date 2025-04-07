import { Link } from 'react-router-dom'
import { Animal } from './APIResponsesTypes'

interface IProps {
  name: string
  animal: Animal
  breed: string
  images: string[]
  location: string
  id: number
}
const Pet = ({ name, animal, breed, images, location, id }: IProps) => {
  let hero = 'http://pets-images.dev-apis.com/pets/none.jpg'
  if (images && images.length) {
    hero = images[0]
  }

  return (
    <Link to={`/details/${id}`} className='relative block'>
      <div className='image-container'>
        <img data-testid='thumbnail' src={hero} alt={name} />
      </div>
      <div className='absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2pt-2'>
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  )
}

export default Pet
