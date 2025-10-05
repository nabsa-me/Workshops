const userInfo = {
  name: 'Mike',
  email: 'mike@example.com',
  secondaryEmail: null // user has no secondary email
}

interface FormInProgress {
  createdAt: Date
  data: FormData
  completedAt?: Date
}
const formInProgress: FormInProgress = {
  createdAt: new Date(),
  data: new FormData()
}
function submitForm() {
  const myDate: Date = formInProgress.completedAt
  formInProgress.completedAt = new Date()
}
console.log('console.log returns nothing.')

// @errors: 2532 18048
type GroceryCart = {
  fruits?: { name: string; qty: number }[]
  vegetables?: { name: string; qty: number }[]
}
const cart: GroceryCart = {}
cart.fruits?.push({ name: 'kumkuat', qty: 1 })
cart.fruits!.push({ name: 'kumkuat', qty: 1 })
const { fruits } = cart
if (fruits) {
  fruits.push({ name: 'kumkuat', qty: 1 })
} else {
  console.log('no fruits in cart')
}

// @errors: 2564
class ThingWithAsyncSetup {
  setupPromise: Promise<any>
  isSetup: boolean

  constructor() {
    this.setupPromise = new Promise((resolve) => {
      this.isSetup = false
      return this.doSetup(resolve)
    }).then(() => {
      this.isSetup = true
    })
  }

  private async doSetup(resolve: (value: unknown) => void) {}
}

// @target: ES2017
// @showEmit
type Payment = {
  id: string
  amount: number
  createdAt: Date
}
type Invoice = {
  id: string
  due: number
  payments: Payment[]
  lastPayment?: Payment
  createdAt: Date
}

type Customer = {
  id: string
  lastInvoice?: Invoice
  invoices: Invoice[]
}

type ResponseData = {
  customers?: Customer[]
  customer?: Customer
}

function getLastPayment(data: ResponseData): number | undefined {
  return data?.customer?.lastInvoice?.lastPayment?.amount
}

// -- // -- //
function setVolume(v: number): void {}

type PlayerConfig = {
  volume?: 0 | 25 | 50 | 75 | 100
}

function initializePlayer(config: PlayerConfig): void {
  const vol = typeof config.volume === 'undefined' ? 50 : config.volume
  setVolume(vol)
}

const config: PlayerConfig = {}
const vol = config.volume ?? 50
const vol2 = config.volume || 50
