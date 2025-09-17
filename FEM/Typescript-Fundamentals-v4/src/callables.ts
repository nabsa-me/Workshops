interface TwoNumberCalculation {
  (x: number, y: number): number
}

type TwoNumberCalc = (x: number, y: number) => number

const add: TwoNumberCalculation = (a, b) => a + b
const subtract: TwoNumberCalc = (x, y) => x - y

function printFormattedJSON(obj: string[]) {
  console.log(JSON.stringify(obj, null, '  '))
}

const z = printFormattedJSON(['hello', 'world'])

function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000)
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000)
}

const values: number[] = []
invokeInFourSeconds(() => values.push(4))
invokeInFiveSeconds(() => values.push(4))

interface DateConstructor {
  new (value: number): Date
}

const MyDateConstructor: DateConstructor = Date
const d = new MyDateConstructor(1697923072611)

type FormSubmitHandler = (data: FormData) => void
type MessageHandler = (evt: MessageEvent) => void

function handleMainEvent(elem: HTMLFormElement, handler: FormSubmitHandler)
function handleMainEvent(elem: HTMLIFrameElement, handler: MessageHandler)
function handleMainEvent(elem: HTMLFormElement | HTMLIFrameElement, handler: FormSubmitHandler | MessageHandler) {}

const myFrame = document.getElementsByTagName('iframe')[0]
const myForm = document.getElementsByTagName('form')[0]
handleMainEvent(myFrame, (val) => {})
handleMainEvent(myForm, (val) => {})

type JSONPrimitiveTwo = string | number | boolean | null
type JSONObjectTwo = { [k: string]: JSONValueTwo }
type JSONArrayTwo = JSONValueTwo[]
type JSONValueTwo = JSONArrayTwo | JSONObjectTwo | JSONPrimitiveTwo
/// ---cut---
async function getData(url: string): Promise<{ properties: string[] }> {
  const resp = await fetch(url)
  if (resp.ok) {
    const data = (await resp.json()) as {
      properties: string[]
    }
    return data
  }
}

function loadData() {
  getData('https://example.com').then((result) => {
    console.log(result.properties.join(', '))
  })
}
