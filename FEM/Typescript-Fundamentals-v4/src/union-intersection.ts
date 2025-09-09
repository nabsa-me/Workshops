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
