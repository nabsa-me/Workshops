const banana: Fruit = {
  name: 'banana',
  color: 'yellow',
  mass: 183
}

interface Fruit {
  name: string
  mass: number
  color: string
}

function Fruit(kind: string) {
  switch (kind) {
    case 'banana':
      return banana
    default:
      throw new Error(`fruit type ${kind} not supported`)
  }
}

// the namespace
namespace Fruit {
  const createBanana = () => Fruit('banana')
}

const is_a_value = 4
type is_a_type = {}
namespace is_a_namespace {
  const foo = 17
}

// how to test for a (value | namespace)
const x = is_a_value // the value position (RHS of =).
const xx = is_a_type
// how to test for a type
const y: is_a_type = {} // the type position (LHS of =).
const yy: is_a_value = 4
// how to test for a namespace (hover over is_a_namespace symbol)
const z: typeof is_a_namespace = {}
const zz: typeof is_a_type

// NAMESPACES

function $(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector)
}

namespace $ {
  export function ajax(arg: { url: string; data: any; success: (response: any) => void }): Promise<any> {
    return Promise.resolve()
  }
}

$.ajax({
  url: '/api/getWeather',
  data: {
    zipcode: 97201
  },
  success: function (result) {
    $('#weather-temp')[0].innerHTML = '<strong>' + result + '</strong> degrees'
  }
})

$('h1.title').forEach((node) => {
  node.tagName // "h1"
})

// CLASSES

class Fruit2 {
  name?: string
  mass?: number
  color?: string
  static createBanana() {
    return { name: 'banana', color: 'yellow', mass: 183 } as const
  }
}

// how to test for a value
const valueTest = Fruit2 // Fruit is a value!
valueTest.createBanana

// how to test for a type
const typeTest: Fruit2 = {} as any // Fruit is a type!
typeTest.color

export { Fruit2 }
