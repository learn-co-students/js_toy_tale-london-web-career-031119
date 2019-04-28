//* Query everything that needs to be changed on the top 

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const formEl = document.querySelector('#add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

//* Button to hide/unhide form html

let addToy = false
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

//* Rendering each of the cards with working like/delete buttons

const renderToy = toy => {
  //create an element and save it to the variable
	const toyDiv = document.createElement('div')
	toyDiv.className = 'card'
	toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p class='likes'>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
    <button class="delete-btn">Delete :X</button>
  `
  //query selecting the buttons
  const likeBtn = toyDiv.querySelector('.like-btn')
  const deleteBtn = toyDiv.querySelector('.delete-btn')
  //query selecting the likes text so it can be changed
  const likesEl = toyDiv.querySelector('.likes')
  //if clicked it will increase the likes 
  likeBtn.addEventListener('click', () => {
    toy.likes++
    //after incrementing, also update it in the server 
    increaseLikes(toy)
    //apply the change in the html
    likesEl.innerText = `${toy.likes} Likes`
  })
  //delete button to delete the card related to the id - also removes from server
  deleteBtn.addEventListener('click', () => {
    deleteToy(toy.id)
    toyDiv.remove()
  })
  //Appends created element to be inside the queried selector from the top
	toyCollection.append(toyDiv)
}

// add multiple toys to the page
const renderToys = toys => {
	toys.forEach(renderToy)
}

// create a new toy using the form
const addNewToyFormListener = () => {
  formEl.addEventListener('submit', event => {
    //stops the page from refreshing
    event.preventDefault()
    // filling in form data from the inputs with default values 
    const toy = {
      name: formEl.name.value,
      image: formEl.image.value,
      likes: 0
    }
    // create and render toy server side then reset the form 
    createToy(toy)
    renderToy(toy)
    formEl.reset()
  })
}

// initialize the page
const init = () => {
  getToys()
    .then(renderToys)
  addNewToyFormListener()
}

init()