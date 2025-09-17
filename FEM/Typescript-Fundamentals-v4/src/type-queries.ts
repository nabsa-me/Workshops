type DatePropertyNames = keyof Date

type DateStringPropertyNames = DatePropertyNames & string
type DateSymbolPropertyNames = DatePropertyNames & symbol

async function main() {
  const apiResponse = await Promise.all([fetch('https://example.com'), Promise.resolve('Titanium White')])

  type ApiResponseType = typeof apiResponse
}

const contact = { name: 'John Doe', phone: '555-1234', email: 'john.doe@example.com' }
type try1 = typeof contact
type try2 = keyof typeof contact

const MyAjaxConstructor = CSSRule
CSSRule.STYLE_RULE
const myAjax = new CSSRule()

const MyRule = CSSRule
CSSRule.STYLE_RULE
const foo = new MyRule()

type MyRuleType = typeof MyRule

interface Car {
  make: string
  model: string
  year: number
  color: {
    red: string
    green: string
    blue: string
  }
}

let carColor: Car['color' | 'year']
carColor = { red: 'ff0000', green: '00ff00', blue: '0000ff' }
carColor = 2020 // This is valid because 'year' is part of the union
