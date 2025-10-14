class Snack {
  protected constructor(public readonly petFriendly: boolean) {}
}

class Pretzel extends Snack {
  constructor(public readonly salted = true) {
    super(!salted)
  }
}

class Cookie extends Snack {
  public readonly petFriendly: false = false
  constructor(public readonly chocolateType: 'dark' | 'milk' | 'white') {
    super(false)
  }
}

// COVARIANCE
interface Producer<out T> {
  produce: () => T
}

let cookieProducer: Producer<Cookie> = {
  produce: () => new Cookie('dark')
}

const COOKIE_TO_PRETZEL_RATIO = 0.5

let snackProducer: Producer<Snack> = {
  produce: () => (Math.random() > COOKIE_TO_PRETZEL_RATIO ? new Cookie('milk') : new Pretzel(true))
}

snackProducer = cookieProducer // ✅
cookieProducer = snackProducer // ❌

// CONTRAVARIANCE
interface Packager<in T> {
  package: (item: T) => void
}

let cookiePackager: Packager<Cookie> = {
  package(item: Cookie) {}
}

let snackPackager: Packager<Snack> = {
  package(item: Snack) {
    if (item instanceof Cookie) {
      /* Package cookie */
    } else if (item instanceof Pretzel) {
      /* Package pretzel */
    } else {
      /* Package other snacks? */
    }
  }
}

cookiePackager = snackPackager
snackPackager = cookiePackager

// INVARIANCE

interface ProducerPackager<in out T> {
  package: (item: T) => void
  produce: () => T
}

let cookieProducerPackager: ProducerPackager<Cookie> = {
  produce() {
    return new Cookie('dark')
  },
  package(arg: Cookie) {}
}

let snackProducerPackager: ProducerPackager<Snack> = {
  produce() {
    return Math.random() > 0.5 ? new Cookie('milk') : new Pretzel(true)
  },
  package(item: Snack) {
    if (item instanceof Cookie) {
      /* Package cookie */
    } else if (item instanceof Pretzel) {
      /* Package pretzel */
    } else {
      /* Package other snacks? */
    }
  }
}

snackProducerPackager = cookieProducerPackager
cookieProducerPackager = snackProducerPackager

// BIVARIANCE

type PrepareFoodPackage<T> = (uncheckedItems: T[], qualityCheck: (arg: T) => boolean) => T[]

function cookieQualityCheck(cookie: Cookie): boolean {
  return Math.random() > 0.1
}

function snackQualityCheck(snack: Snack): boolean {
  if (snack instanceof Cookie) return cookieQualityCheck(snack)
  else return Math.random() > 0.16 // pretzel case
}

// Prepare a bunch of snacks for shipment
const prepareSnacks: PrepareFoodPackage<Snack> = (uncheckedItems, callback) => uncheckedItems.filter(callback)
const prepareCookies: PrepareFoodPackage<Cookie> = (uncheckedItems, callback) => uncheckedItems.filter(callback)

const cookies = [new Cookie('dark'), new Cookie('milk'), new Cookie('white')]
const snacks = [new Pretzel(true), new Cookie('milk'), new Cookie('white')]

prepareSnacks(cookies, snackQualityCheck)
prepareSnacks(snacks, snackQualityCheck)
prepareCookies(cookies, cookieQualityCheck)
