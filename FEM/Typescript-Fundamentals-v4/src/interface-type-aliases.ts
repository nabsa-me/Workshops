type Amount = { currency: string; value: number }

function printAmount(amt: Amount) {
  console.log(amt)

  const { currency, value } = amt
  console.log(`${currency} ${value}`)
}

const donation = {
  currency: 'USD',
  value: 30.0,
  description: 'Donation to food bank'
}

printAmount(donation)

function flipCoinTwo() {
  if (Math.random() > 0.5) return 'heads'
  return 'tails'
}

const successTwo = ['success', { name: 'Mike North', email: 'mike@example.com' }] as const
const failTwo = ['error', new Error('Something went wrong!')] as const

type UserInfoOutcomeError = readonly ['error', Error]
type UserInfoOutcomeSuccess = readonly ['success', { readonly name: string; readonly email: string }]
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess

function maybeGetUserInfo(): UserInfoOutcome {
  if (flipCoinTwo() === 'heads') {
    return successTwo
  } else {
    return failTwo
  }
}

type SpecialDate = Date & { getDescription(): string }

const newYearsEve: SpecialDate = Object.assign(new Date(), { getDescription: () => 'Last day of the year' })
newYearsEve.getDescription()

interface AmountTwo {
  currency: string
  value: number
}
function printAmounts(amt: AmountTwo) {
  amt.currency
}

function consumeFood(arg) {}

class AnimalThatEats {
  eat(food) {
    consumeFood(food)
  }
}
class Cat extends AnimalThatEats {
  meow() {
    return 'meow'
  }
}

const c = new Cat()
c.eat
c.meow()

interface Animal {
  isAlive(): boolean
}
interface Mammal extends Animal {
  getFurOrHairColor(): string
}
interface Hamster extends Mammal {
  squeak(): string
}
function careForHamster(h: Hamster) {
  h.getFurOrHairColor()
  h.squeak()
}

interface AnimalLike {
  eat(food): void
}

class Dog implements AnimalLike {
  bark() {
    return 'woof'
  }
  eat(food) {
    consumeFood(food)
  }
}

class LivingOrganism {
  isAlive() {
    return true
  }
}

interface CanBark {
  bark(): string
}

class Dog2 extends LivingOrganism implements AnimalLike, CanBark {
  bark() {
    return 'woof'
  }
  eat(food) {
    consumeFood(food)
  }
}

type CanJump = {
  jumpToHeight(): number
}

class Dog3 implements CanJump {
  jumpToHeight() {
    return 1.7
  }
  eat(food) {
    consumeFood(food)
  }
}
