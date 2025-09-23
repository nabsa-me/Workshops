// Fields and methods

class Car {
  make: string
  model: string
  year: number
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
  honk(duration: number): string {
    return `h${'o'.repeat(duration)}nk`
  }
}

const sedan = new Car('Honda', 'Accord', 2017)
sedan.activateTurnSignal('left') // not safe!
new Car(2017, 'Honda', 'Accord') // not safe!

const ca = new Car('Honda', 'Accord', 2017)
ca.honk(5) // "hooooonk"

// static fields, methods and blocks

class CarTwo {
  // Static stuff
  // static nextSerialNumber = 100
  static nextSerialNumber: number
  static generateSerialNumber() {
    return this.nextSerialNumber++
  }
  static {
    // `this` is the static scope
    fetch('https://api.example.com/vin_number_data')
      .then((response) => response.json())
      .then((data) => {
        this.nextSerialNumber = data.mostRecentInvoiceId + 1
      })
  }

  // Instance stuff
  make: string
  model: string
  year: number
  serialNumber = CarTwo.generateSerialNumber()
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
}
console.log(new CarTwo('Honda', 'Accord', 2017))
// > "Honda Accord 2017 - #100
console.log(new CarTwo('Toyota', 'Camry', 2022))
// > "Toyota Camry 2022 - #101

// Access modifier keywords

class CarThree {
  // Static stuff
  private static nextSerialNumber: number
  private static generateSerialNumber() {
    return this.nextSerialNumber++
  }
  static {
    // `this` is the static scope
    fetch('https://api.example.com/vin_number_data')
      .then((response) => response.json())
      .then((data) => {
        this.nextSerialNumber = data.mostRecentInvoiceId + 1
      })
  }
  // Instance stuff
  make: string
  model: string
  year: number
  // private _serialNumber = CarThree.generateSerialNumber()
  #serialNumber = CarThree.generateSerialNumber()
  protected get serialNumber(): number {
    return this.#serialNumber
  }
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
  getLabel() {
    this.serialNumber = -123 // Cannot assign to 'serialNumber' because it is a read-only property
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
}

class Sedan extends CarThree {
  getSedanInformation() {
    this.#serialNumber
    const { make, model, year, serialNumber } = this
    return { make, model, year, serialNumber }
  }
}

const s = new Sedan('Nissan', 'Altima', 2020)
s.serialNumber

// Private field presence checks

class CarFour {
  static #nextSerialNumber: number
  static #generateSerialNumber() {
    return this.#nextSerialNumber++
  }

  make: string
  model: string
  year: number
  #serialNumber = CarFour.#generateSerialNumber()

  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
  equals(other: unknown) {
    if (other && typeof other === 'object' && #serialNumber in other) {
      // other
      return other.#serialNumber === this.#serialNumber
    }
    return false
  }
}
const c1 = new CarFour('Toyota', 'Hilux', 1987)
const c2 = c1
c2.equals(c1)

// readonly

class CarFive {
  static #nextSerialNumber: number
  static #generateSerialNumber() {
    return this.#nextSerialNumber++
  }

  public make: string
  public model: string
  public year: number
  readonly #serialNumber = CarFive.#generateSerialNumber()

  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }

  changeSerialNumber(num: number) {
    this.#serialNumber = num
  }
}

// Param properties

class CarSix {
  constructor(public make: string, public model: string, public year: number) {}
}

const myCarAgain = new CarSix('Honda', 'Accord', 2017)
myCarAgain.make

class Base {
  constructor() {
    console.log('base constructor')
  }
  honk() {
    console.log('beep')
  }
}
class CarDerived extends Base {
  foo = console.log('class field initializer')
  constructor(public make: string) {
    super()
    console.log('custom constructor stuff')
  }
  override honk() {
    // OOPS!
    console.log('BEEP')
  }
}

const cd = new CarDerived('honda')
cd.honk() // BEEP
