import test from 'node:test'

const phoneList = [
  { id: '0001', areaCode: '321', num: '123-4566' },
  { id: '0002', areaCode: '174', num: '142-3626' },
  { id: '0003', areaCode: '192', num: '012-7190' },
  { id: '0005', areaCode: '402', num: '652-5782' },
  { id: '0004', areaCode: '301', num: '184-8501' }
]

const phoneDict = {
  '0001': {
    id: '0001',
    areaCode: '321',
    num: '123-4566'
  },
  '0002': {
    id: '0002',
    areaCode: '174',
    num: '142-3626'
  }
  /*... and so on */
}

interface HasId {
  id: string
}
interface Dict<T> {
  [k: string]: T
}

function listToDict(list: HasId[]): Dict<HasId> {
  const dict: Dict<HasId> = {}

  list.forEach((item) => {
    dict[item.id] = item
  })

  return dict
}

function flexListToDict<T extends HasId>(list: T[]): Dict<T> {
  const dict: Dict<T> = {}

  list.forEach((item) => {
    dict[item.id] = item
  })

  return dict
}

interface ColorWithId extends HasId {
  color?: string
  alpha?: number
}

const myColor = { id: '001', color: 'red' } satisfies ColorWithId
myColor.color.substring(0, 3)

const testResult = flexListToDict(phoneList)
testResult['0001'].id

// SCOPES & TYPES PARAMS
function eatApple(bowl: any, eater: (arg: any) => void) {}

function receiveFruitBasket(bowl: any) {
  console.log('Thanks for the fruit basket!')
  // only `bowl` can be accessed here
  eatApple(bowl, (apple) => {
    // both `bowl` and `apple` can be accessed here
  })
}

// outer function
function tupleCreator<T>(first: T) {
  // inner function
  return function finish<S>(last: S): [T, S] {
    return [first, last]
  }
}
const finishTuple = tupleCreator(3 as const)
const t1 = finishTuple(null)
const t2 = finishTuple([4, 8, 15, 16, 23, 42])

// BEST PRACTICES

interface HasId {
  id: string
}
interface DictTwo<T> {
  [k: string]: T
}

function example1<T extends HasId[]>(list: T) {
  return list.pop()
}
function example2<T extends HasId>(list: T[]) {
  return list.pop()
}

class Payment implements HasId {
  static #next_id_counter = 1
  id = `pmnt_${Payment.#next_id_counter++}`
}
class Invoice implements HasId {
  static #next_id_counter = 1
  id = `invc_${Invoice.#next_id_counter++}`
}

const result1 = example1([new Payment(), new Invoice(), new Payment()])

const result2 = example2([new Payment(), new Invoice(), new Payment()])
