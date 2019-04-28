const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

const toyCollection = document.querySelector('#toy-collection')
const formEL = document.querySelector('#add-toy-form')

let addToy = false

// Add Toy Button 

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// Display all toys
const displayToy = toy => {

  let div = document.createElement('div') 
      div.className = "card"
      div.innerHTML = 
  `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p class='likes>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
  `
  toyCollection.append(div)
  //like button 
  const likeBtn = div.querySelector('.like-btn')
  likeBtn.addEventListener('click', () => {
    toy.likes++
    likeBtn.previousElementSibling.innerHTML = `${toy.likes} Likes`
  })
}

// Create a toy in the server

formEL.addEventListener('submit', event => {
    event.preventDefault()
    const toy = {
      name: formEL.name.value,
      image: formEL.image.value,
      likes : 0
    }
    renderToy(toy)
    formEL.reset()
})

createBook(book)
.then(addBook)


const createToy = toy => 
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toy)
  }).then(resp => resp.json())


















// Grabbing and displaying data from server

const getToys = () =>
	fetch('http://localhost:3000/toys')
    .then(resp => resp.json())

const displayToys = toys => {
	toys.forEach(displayToy)
}

getToys()
  .then(displayToys)


  // const likeBtn = div.querySelector('.like-btn')
  // likeBtn.addEventListener('click', () => {
  //   toy.likes++
  //   likeBtn.previousElementSibling.innerHTML = `${toy.likes} Likes`
  // })