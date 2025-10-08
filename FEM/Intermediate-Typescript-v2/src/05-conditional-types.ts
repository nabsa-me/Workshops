const x = 16
const isXNegative = x >= 0 ? 'no' : 'yes'

class Grill {
  startGas() {}
  stopGas() {}
}
class Oven {
  setTemperature(degrees: number) {}
}

type CookingDevice<T> = T extends 'grill' ? Grill : Oven

// ---------------------------

let device1: CookingDevice<'grill'>
let device2: CookingDevice<'oven'>

const one = 1
const two = 2
const ten = 10

type IsLowNumber<T> = T extends 1 | 2 ? true : false
type TestOne = IsLowNumber<1>
type TestTwo = IsLowNumber<2>
type TestTen = IsLowNumber<10>
type TestTenWithTwo = IsLowNumber<10 | 2>

// EXTRACT
type FavoriteColors =
  | 'dark sienna'
  | 'van dyke brown'
  | 'yellow ochre'
  | 'sap green'
  | 'titanium white'
  | 'phthalo green'
  | 'prussian blue'
  | 'cadium yellow'
  | [number, number, number]
  | { red: number; green: number; blue: number }

type StringColors = Extract<FavoriteColors, string>
type ObjectColors = Extract<FavoriteColors, { red: number }>
type TupleColors = Extract<FavoriteColors, [number, number, number]>

//EXCLUDE

// a set of four specific things
type FavoriteColorsTwo =
  | 'dark sienna'
  | 'van dyke brown'
  | 'yellow ochre'
  | 'sap green'
  | 'titanium white'
  | 'phthalo green'
  | 'prussian blue'
  | 'cadium yellow'
  | [number, number, number]
  | { red: number; green: number; blue: number }

type NonStringColors = Exclude<FavoriteColorsTwo, string>

//INFERENCE IN CONDITIONAL TYPES
type AppleVarieties = 'fuji' | 'gala' | 'honeycrisp' | 'granny smith'
type OrangeVarieties = 'navel' | 'valencia' | 'blood orange' | 'cara cara'
type Allergies = 'peach' | 'kiwi' | 'strawberry' | 'pineapple'
type Ripeness = 'green' | 'ripe' | 'overripe'

type QuantityRange = {
  min: number
  max: number
}

type FruitOrderItem<Varieties extends string> = {
  variety: Varieties
  pricePerUnit: number
  quantity: number
  totalPrice: number
}

type FruitOrder = {
  apples: FruitOrderItem<AppleVarieties>[]
  oranges: FruitOrderItem<OrangeVarieties>[]
  subtotal: number
  salesTax: number
  grandTotal: number
}

type FruitOrderPreferences = {
  apples: {
    preferredVarieties: AppleVarieties[]
    avoidSeeds: boolean
    organicOnly: boolean
    ripeness: Ripeness
    quantity: QuantityRange
  }
  oranges: {
    preferredVarieties: OrangeVarieties[]
    seedlessOnly: boolean
    ripeness: Ripeness
    quantity: QuantityRange
  }
  allergies: Allergies[]
  prefersLocalProduce: boolean
}

function createOrder(prefs: FruitOrderPreferences): FruitOrder {
  console.log(prefs)
  return {
    apples: [],
    oranges: [],
    subtotal: 0.0,
    salesTax: 0.0,
    grandTotal: 0.0
  }
}

// type GetFirstArg<T> = any

const prefs: GetFirstArgTwo<typeof createOrder> = {}

createOrder(prefs)

type UnwrapPromise<P> = P extends PromiseLike<infer T> ? T : P

type test1 = UnwrapPromise<Promise<string>>
type test2 = UnwrapPromise<Promise<[string[], number[]]>>
type test3 = UnwrapPromise<number>

// @errors: 2344
type OneArgFn<A = any> = (firstArg: A, ..._args: any[]) => void
type GetFirstArgTwo<T extends OneArgFn> = T extends OneArgFn<infer R> ? R : never

// Test case
function foo(x: string, y: number) {
  return null
}
// Should be string[]
type t1 = GetFirstArgTwo<typeof foo>

// CONSTRAINTS TO INFER
type GetFirstStringIshElement<T> = T extends readonly [infer S, ..._: any[]] ? S : never

const t1 = ['success', 2, 1, 4] as const
const t2 = [4, 54, 5] as const

let firstT1: GetFirstStringIshElement<typeof t1>
let firstT2: GetFirstStringIshElement<typeof t2>
