const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const submitToy = document.querySelector('.add-toy-form')

let addToy = false

// YOUR CODE HERE

// create a new div to display the toy collection when we load the page 
window.addEventListener('load', () => {
  getToys();
});

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

submitToy.addEventListener('submit', (event) => {
  event.preventDefault()
  const toy = { 
    name: submitToy.name.value, 
    image: submitToy.image.value,
    likes: 0
  }

  createToy(toy)
    .then(displayToy())

})


const displayToy = toy => {
  const card = document.createElement('div')
  card.className = 'card'

  card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p class='likes'>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn">Delete</button>
    `
  
  const likeBtn = card.querySelector('.like-btn')
  const deleteBtn = card.querySelector('.delete-btn')
  const likesEl = card.querySelector('p.likes')

  likeBtn.addEventListener('click', () => {
    toy.likes ++
    updateLikes(toy)
    likesEl.innerText = `${toy.likes} Likes`

  })

  deleteBtn.addEventListener('click', () => {
    card.remove()
    deleteCards(id)
  })

  toyCollection.append(card)
  
}

const toysCollection = toys => {
	toys.forEach(item => {
    displayToy(item)
  })
} 

// get the data from the server 
const getToys = () => 
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())

// create a new toy from the server
const createToy = function(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

const updateLikes = function(toy){
  fetch('http://localhost:3000/toys/${toy.id}', {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

const deleteCards = function(id){
  fetch('http://localhost:3000/toys/${id}', {
    method: 'DELETE'
  }) 
}
    
getToys()
  .then(toysCollection)



  
