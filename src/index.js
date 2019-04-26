const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const toyFormId = document.querySelector('#toy-form')


let addToy = false

// YOUR CODE HERE

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

//! Display Toys

const getToys = () =>
  fetch('http://localhost:3000/toys/')
  .then(resp => resp.json())

const displayToy = toy => {
  const div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p class='likes'>${toy.likes} Likes</p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn">Delete :/</button>
    `
  const likeBtn = div.querySelector('.like-btn')
  const deleteBtn = div.querySelector('.delete-btn')
  const likesEl = div.querySelector('.likes')


  likeBtn.addEventListener('click', () => {
    toy.likes++
    updateToy(toy)
    likesEl.innerText = `${toy.likes} Likes`
  })

  deleteBtn.addEventListener('click', () => {
    deleteToy(toy.id)
    div.remove()
  })

  toyCollection.append(div)
}

const displayToys = toys => {
  toys.forEach(displayToy)
}

//! Create Toy

const createToy = toy =>
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())

const addNewToyFormListener = () => {
  toyFormId.addEventListener('submit', event => {
    event.preventDefault()
    const toy = {
      name: toyFormId.name.value,
      image: toyFormId.image.value,
      likes: 0
    }
    createToy(toy)
      .then(displayToy)
    toyFormId.reset()
    // event.target.reset() // Same as above line
  })
}

//! Update Likes

const updateToy = toy =>
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
    // body: JSON.stringify({ likes: toy.likes }) // Same as above line
  }).then(resp => resp.json())

//! Delete Card

const deleteToy = id =>
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())


//! initliaze page

const init = () => {
  getToys()
    .then(displayToys)
  addNewToyFormListener()
}

init()