type Fruit = {
  name: string
  color: string
  mass: number
}

type Dict<T> = { [k: string]: T | undefined } // <- index signature

const fruitCatalog: Dict<Fruit> = {}
fruitCatalog.apple

type MyRecord = { [FruitKey in 'apple' | 'cherry']: Fruit }

function printFruitCatalog(fruitCatalog: MyRecord) {
  fruitCatalog.cherry
  fruitCatalog.apple
  fruitCatalog.pineapple
}

type MyRecord2<K extends keyof any, V> = { [Key in K]: V }
/**
 * Construct a type with a set of properties K of type T
 */
type Record2<K extends keyof any, T> = {
  [P in K]: T
}
type MyRecord3<K extends keyof any, V> = { [Key in K]: V }
type PartOfWindow = {
  [Key in 'document' | 'navigator' | 'setTimeout']: Window[Key]
}

/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type ArtFeatures = 'cabin' | 'tree' | 'sunset'
type Colors = 'darkSienna' | 'sapGreen' | 'titaniumWhite' | 'prussianBlue'
type ArtMethodNames = `paint${Capitalize<Colors>}${Capitalize<ArtFeatures>}`

// @errors: 2345 2561
interface DataState {
  digits: number[]
  names: string[]
  flags: Record<'darkMode' | 'mobile', boolean>
}

type DataSDK = {
  // The mapped type
  [K in keyof DataState as `set${Capitalize<K>}`]: (arg: DataState[K]) => void
}

function load(dataSDK: DataSDK) {
  dataSDK.setDigits([14])
  dataSDK.setFlags({ darkMode: true, mobile: false })
}

// @errors: 2322
const courseWebsite = 'Frontend Masters'

type ExtractMasterName<S> = S extends `${infer T} Masters` ? T : never

const fe: ExtractMasterName<typeof courseWebsite> = 'Backend'
type myType = typeof courseWebsite

//FILTERING PROPERTIES
type DocKeys = Extract<keyof Document, `query${string}`>
type KeyFilteredDoc = {
  [K in DocKeys]: Document[K]
}

// Get keys of type T whose values are assignable to type U
type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T] &
  keyof T

type RelevantDocumentKeys = FilteredKeys<Document, (...args: any[]) => Element | Element[]>

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>

function load2(doc: ValueFilteredDoc) {
  doc.querySelector('input')
}
