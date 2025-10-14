interface DataTypeRegistry {
  book: Book
  magazine: Magazine
}

// interface DataTypeRegistry {
//   magazine: Magazine
// }
// the "& string" is just a trick to get
// a nicer tooltip to show you in the next step
function fetchRecord(arg: keyof DataTypeRegistry & string, id: string) {}
function fetchRecords(arg: keyof DataTypeRegistry & string, id: string[]) {}

class Book {
  deweyDecimalNumber(): number {
    return 42
  }
}

class Magazine {
  issueNumber(): number {
    return 42
  }
}

// Assumption -- our user has set up resources like Book and Magazine
//
// returns a Book
fetchRecord('book', 'bk_123')
// returns a Magazine
fetchRecord('magazine', 'mz_456')

async function main() {
  const myBook = await fetchRecord('book', 'book_123')
  const myMagazine = await fetchRecord('magazine', 'magazine_123')
  const myBookList = await fetchRecords('book', ['book_123'])
  const myMagazineList = await fetchRecords('magazine', ['magazine_123'])

  fetchRecord('book', 'booooook_123')
  fetchRecord('magazine', 'mag_123')
  fetchRecords('book', ['booooook_123'])
  fetchRecords('magazine', ['mag_123'])
}
