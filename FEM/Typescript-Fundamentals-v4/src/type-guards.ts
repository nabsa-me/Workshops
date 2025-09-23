function maybeGetUserInfo(): ['error', Error] | ['success', { name: string; email: string }] {
  if (Math.random() > 0.5) {
    return ['success', { name: 'Mike North', email: 'mike@example.com' }]
  } else {
    return ['error', new Error('The coin landed on TAILS :(')]
  }
}

const outcomeTwo = maybeGetUserInfo()

if (outcomeTwo[0] === 'error') {
  outcomeTwo
} else {
  outcomeTwo
}

// Built-in type guards
let value: Date | null | undefined | 'pineapple' | [number] | { dateRange: [Date, Date] }

// instanceof
if (value instanceof Date) {
  value
}
// typeof
else if (typeof value === 'string') {
  value
}
// Specific value check
else if (value === null) {
  value
}
// Truthy/falsy check
else if (!value) {
  value
}
// Some built-in functions
else if (Array.isArray(value)) {
  value
}
// Property presence check
else if ('dateRange' in value) {
  value
} else {
  value
}

// User-defined type guards
interface CarLike {
  make: string
  model: string
  year: number
}

let maybeCar: CarLike

// the guard
if (
  maybeCar &&
  typeof maybeCar === 'object' &&
  'make' in maybeCar &&
  typeof maybeCar['make'] === 'string' &&
  'model' in maybeCar &&
  typeof maybeCar['model'] === 'string' &&
  'year' in maybeCar &&
  typeof maybeCar['year'] === 'number'
) {
  maybeCar
}

interface CarLikeTwo {
  make: string
  model: string
  year: number
}

let maybeCarTwo: CarLikeTwo

// the guard
function isCarLikeTwo(valueToTest: CarLikeTwo): valueToTest is CarLikeTwo {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'make' in valueToTest &&
    typeof valueToTest['make'] === 'string' &&
    'model' in valueToTest &&
    typeof valueToTest['model'] === 'string' &&
    'year' in valueToTest &&
    typeof valueToTest['year'] === 'number'
  )
}

// using the guard
if (isCarLikeTwo(maybeCarTwo)) {
  maybeCarTwo
}

// asserts value is Foo
interface CarLikeThree {
  make: string
  model: string
  year: number
}

let maybeCarThree: any

// the guard
function assertsIsCarLike(valueToTest: any): asserts valueToTest is CarLikeThree {
  if (
    !(
      valueToTest &&
      typeof valueToTest === 'object' &&
      'make' in valueToTest &&
      typeof valueToTest['make'] === 'string' &&
      'model' in valueToTest &&
      typeof valueToTest['model'] === 'string' &&
      'year' in valueToTest &&
      typeof valueToTest['year'] === 'number'
    )
  )
    throw new Error(`Value does not appear to be a CarLike${valueToTest}`)
}

// using the guard
maybeCarThree
assertsIsCarLike(maybeCarThree)
maybeCarThree

// Use with private #field presence checks
class Invoice {
  static #nextInvoiceId = 1
  #invoice_id = Invoice.#nextInvoiceId++

  equals(other: any): boolean {
    return (
      other && // is it truthy
      typeof other === 'object' && // and an object
      #invoice_id in other && // and "branded" with the #invoice_id property
      //                     ^?
      other.#invoice_id === this.#invoice_id
    ) // and the values of #invoice_id are equal
    //     ^?
  }
}

const inv = new Invoice()
console.log(inv.equals(inv)) // ✅

class CarInvoiced {
  static #nextSerialNumber: number = 100
  static #generateSerialNumber() {
    return this.#nextSerialNumber++
  }

  #serialNumber = CarInvoiced.#generateSerialNumber()

  static isCar(other: any): other is CarInvoiced {
    if (
      other && // is it truthy
      typeof other === 'object' && // and an object
      #serialNumber in other
    ) {
      // and we can find a private field that we can access from here
      // then it *must* be a car
      other
      // ^?
      return true
    }
    return false
  }
}

let val: any

if (CarInvoiced.isCar(val)) {
  val
}

// Narrowing with switch(true)

class Fish {
  swim(): void {}
}
class Bird {
  fly(): void {}
}

const valTwo = {} as any
switch (true) {
  case valTwo instanceof Bird:
    valTwo.fly()
    break
  case valTwo instanceof Fish:
    valTwo.swim()
    break
}

// bad example of a type guard
function isNull(val: any): val is null {
  return !val
}

const empty = ''
const zero = 0
if (isNull(zero)) {
  console.log(zero) // is it really impossible to get here?
}
if (isNull(empty)) {
  console.log(empty) // is it really impossible to get here?
}
