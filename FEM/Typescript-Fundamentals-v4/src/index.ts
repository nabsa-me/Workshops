function timeout(n: number) {
  return new Promise((res) => setTimeout(res, n))
}

export async function addNumbers(a: number, b: number): Promise<number> {
  await timeout(500)
  return a + b
}

class Foo {
  static #bar = 3
  static getValue() {
    return this.#bar
  }
}

;(async () => {
  const result = await addNumbers(2, 3)
  console.log(result) // 5
})()

export const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500
const startTime = new Date()
let endTime: Date

setTimeout(() => {
  //   endTime = 0
  endTime = new Date()
}, RANDOM_WAIT_TIME)

const frontEndMastersFounding = new Date('Jan 1, 2012')
const date1 = frontEndMastersFounding
const date2 = frontEndMastersFounding as any

// OBJECTS, ARRAYS AND TUPLES

// EXERCISE 1
const myCar = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020
}

const car: { make: string; model: string; year: number } = myCar

function printCar(car: { make: string; model: string; year: number }) {
  console.log(`${car.make} ${car.model} (${car.year})`)
}
printCar(car)
printCar({ make: 'Honda', model: 'Civic', year: 2020, color: 'red' })

// EXCERCISE 2
const myElectricCar = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020
}

const electricCar: { make: string; model: string; year: number; chargeVoltage?: number } = myElectricCar

function printElectricCar(car: { make: string; model: string; year: number; chargeVoltage?: number }) {
  let str = `${car.make} ${car.model} (${car.year})`
  if (typeof car.chargeVoltage === 'number') str += `// ${car.chargeVoltage}V`
  console.log(str)
}

printElectricCar(electricCar)

// EXERCISE 3

// const phones = {
//   home: { country: '+1', area: '211', number: '652-4515' },
//   work: { country: '+1', area: '670', number: '752-5856' },
//   fax: { country: '+1', area: '322', number: '525-4357' }
// }

const phones: {
  [key: string]: {
    country: string
    area: string
    number: string
  }
} = {
  home: { country: '+1', area: '211', number: '652-4515' },
  work: { country: '+1', area: '670', number: '752-5856' },
  fax: { country: '+1', area: '322', number: '525-4357' }
}
console.log(phones.home)

//EXERCISE 4

const fileExtensions: string[] = ['js', 'ts', 'jsx', 'tsx']
const theCar = [2002, 'Toyota', 'Corolla']
const [year, make, model] = theCar

const otherCar: [number, string, string] = [2020, 'Honda', 'Civic']
const [otherYear, otherMake, otherModel] = otherCar

const numPair: [number, number] = [4, 5]
const numTriplet: [number, number, number] = [4, 5]

numPair.length
numPair.push(6)
console.log(numPair.length) // 3

const roNumPair: readonly [number, number] = [4, 5]
roNumPair.length
roNumPair.push(6)

// UNION AND INTERSECTION TYPES

type Evens = 2 | 4 | 6 | 8
type OneThroughFive = 1 | 2 | 3 | 4 | 5

type Union = Evens | OneThroughFive
type Intersection = Evens & OneThroughFive

const union: Union = 4
const intersection: Intersection = 2

function flipCoin(): 'heads' | 'tails' {
  if (Math.random() > 0.5) return 'heads'
  return 'tails'
}

const success = ['success', { name: 'Mike North', email: 'mike@example.com' }] as const
const fail = ['error', new Error('Something went wrong!')] as const

function maybeGetUserInfo() {
  if (flipCoin() === 'heads') {
    return success
  } else {
    return fail
  }
}

// const outcome = maybeGetUserInfo()

function printEven(even: Evens): void {}
function printLowNumber(lowNum: OneThroughFive): void {}
function printEvenNumberUnder5(num: 2 | 4): void {}
function printNumber(num: number): void {}

const x = 5 as Evens | OneThroughFive

let evenOrLowNumber: Evens | OneThroughFive
evenOrLowNumber = 6 //✔️ An even
evenOrLowNumber = 3 //✔️ A low number
evenOrLowNumber = 4 //✔️ A even low number

printEven(x)
printLowNumber(x)
printEvenNumberUnder5(x)
printNumber(x)

const outcome = maybeGetUserInfo()
const [first, second] = outcome

// NARROWING TYPEGUARDS
if (second instanceof Error) {
  // In this branch of your code, second is an Error
  second
  // ^?
} else {
  // In this branch of your code, second is the user info
  second
  // ^?
}

// DISCRIMINATED UNIONS
if (first === 'error') {
  // In this branch of your code, second is an Error
  second
  // ^?
} else {
  // In this branch of your code, second is the user info
  second
  // ^?
}

let evenAndLowNumber: Evens & OneThroughFive
evenAndLowNumber = 6 //✔️ An even
evenAndLowNumber = 3 //✔️ A low number
evenAndLowNumber = 4 //✔️ A even low number

let y: Evens & OneThroughFive

printEven(y)
printLowNumber(y)
printEvenNumberUnder5(y)
printNumber(y)
