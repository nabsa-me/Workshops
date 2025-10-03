// ANY
let flexible: any = 4
flexible = 'Download some more ram'
flexible = window.document
flexible = setTimeout
flexible.it.is.possible.to.access.any.deep.property

// UNKNOWN
const myUnknown: unknown = 14
myUnknown.it.is.possible.to.access.any.deep.property

// This code runs for myUnknown = { all possible values }
if (typeof myUnknown === 'string') {
  // This code runs for myUnknown = { all strings }
  myUnknown
} else if (typeof myUnknown === 'number') {
  // This code runs for myUnknown = { all numbers }
  myUnknown
} else {
  myUnknown
  // this would run for "the leftovers"
  //       myUnknown = { anything except string or numbers }
}

// @noErrors
function doSomethingRisky() {
  if (Math.random() > 0.5) return 'ok'
  else if (Math.random() < 0.5) throw new Error('Bad luck!')
  else throw 'Really bad luck'
}

try {
  doSomethingRisky()
} catch (e) {
  if (e instanceof Error) {
    e
  } else if (typeof e === 'string') {
    e
  } else {
    // Last resort
    console.error(e)
  }
}

//OBJECT AND EMPTY OBJECT

// @errors: 2322
let val: object = { status: 'ok' }
val = 'foo'
val = null
val = () => 'ok'

// The type of this value cannot be modeled by an interface
const response = { success: 'ok', data: [] } as { success: string; data: unknown } | { error: string; code: number }

val = response

// ALMOST TOP TYPE {}
// @errors: 2322
const stringOrNumber: string | number = 4
const nullableString: string | null = null
const myObj: {
  a?: number
  b: string
} = { b: 'foo' }

let val2: {} = 4
val2 = 'abc'
val2 = new Date()
val2 = stringOrNumber
val2 = nullableString
val2 = myObj.a

// @errors: 2322
let withoutUndefined: {} | null = 37
let withUndefined: {} | null | undefined = 38
const anUnknown: unknown = '42'

withoutUndefined = anUnknown // ❌
withUndefined = anUnknown // ✅

type NullableStringOrNumber = string | number | null | undefined
type StringOrNumber = NullableStringOrNumber & {}

// BOTTOM TYPE NEVER

// @errors: 2345
function obtainRandomVehicle(): any {
  return {} as any
}
class Car {
  drive() {
    console.log('vroom')
  }
}
class Truck {
  tow() {
    console.log('dragging something')
  }
}
class Boat {
  isFloating() {
    return true
  }
}
type Vehicle = Truck | Car | Boat

const myVehicle: Vehicle = obtainRandomVehicle()

class UnreachableError extends Error {
  constructor(_nvr: never, message: string) {
    super(message)
  }
}

// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow() // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive() // Car
} else {
  // NEITHER!
  throw new UnreachableError(myVehicle, `Unexpected vehicle type: ${myVehicle}`)
}

//UNIT TYPES
const num: 65 = 65 // represents the set { 65 }
// @errors: 2322
let myNull: null = null
let myUndefined: undefined = undefined
myNull = undefined
myUndefined = null

// @errors: 2322
let myVoid: void = (function () {})() // invoking a void-returning IIFE
let myNull: null = null
let myUndefined: undefined = undefined

myVoid = undefined
myVoid = null

myUndefined = myVoid
myNull = myVoid
