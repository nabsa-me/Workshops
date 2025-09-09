function timeout(n: number) {
  return new Promise((res) => setTimeout(res, n))
}

export async function addNumbers(a: number, b: number): Promise<number> {
  await timeout(500)
  return a + b
}

class Foo {
  static #bar = 3
  static getValue() {
    return this.#bar
  }
}

;(async () => {
  const result = await addNumbers(2, 3)
  console.log(result) // 5
})()

export const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500
const startTime = new Date()
let endTime: Date

setTimeout(() => {
  //   endTime = 0
  endTime = new Date()
}, RANDOM_WAIT_TIME)

const frontEndMastersFounding = new Date('Jan 1, 2012')
const date1 = frontEndMastersFounding
const date2 = frontEndMastersFounding as any
