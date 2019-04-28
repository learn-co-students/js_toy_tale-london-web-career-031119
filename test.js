const formEl = document.querySelector('#book-form')
const tbody = document.querySelector('tbody')

// add a single book to the page
const addBook = book => {
  const tr = document.createElement('tr')
  
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.desc}</td>
    <td>${book.year}</td>
    <td><button class='delete'>X</button></td>
  `
  const deleteBtn = tr.querySelector('.delete')
  deleteBtn.addEventListener('click', () => {
    deleteBook(book.id)
      .then(() => tr.remove())
  })

  tbody.append(tr)
}

// add multiple books to the page
const addBooks = books => {
	books.forEach(addBook)
}

formEl.addEventListener('submit', event => {
	event.preventDefault()

  const book = {
	  title: formEl.title.value,
	  desc: formEl.desc.value,
    year: formEl.year.value
  }

  createBook(book)
    .then(addBook)

	event.target.reset()
})

// get books from the server
const getBooks = () =>
	fetch('http://localhost:3000/books')
    .then(resp => resp.json())

// create a book on the server
const createBook = book => 
  fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
  }).then(resp => resp.json())

// delete a book from the server
const deleteBook = id =>
  fetch(`http://localhost:3000/books/${id}`, {
    method: 'DELETE',
  })
    
// get all server books and put them on the page
getBooks()
  .then(addBooks)