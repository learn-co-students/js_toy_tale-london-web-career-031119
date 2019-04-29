const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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


// OR HERE!

const formEl = document.querySelector('#add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

//add single toy
function renderToy(toy){
  const toyDiv = document.createElement('div')
  toyDiv.className = "card"
  toyDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p class="myLikes">${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="delete-btn">Delete</button>
  `
  const increaseBn = toyDiv.querySelector('.like-btn')
  increaseBn.addEventListener('click', function(){
    toy.likes++
    updateToy(toy)
    const pTag = toyDiv.querySelector('.myLikes')
    pTag.innerText = `${toy.likes} likes`
  })

  const deleteBn = toyDiv.querySelector('.delete-btn')
  deleteBn.addEventListener('click', function(){
    toyDiv.remove()
    deleteToy(toy)
  })
  
  toyCollection.append(toyDiv)
}

//add multiple toys
function renderToys(toys){
	toys.forEach(renderToy)
}

//create one toy using the form for the client
function createNewToyUsingForm(){
  formEl.addEventListener('submit', function(event){
    event.preventDefault()

    toy = {
          name: formEl.name.value,
          image: formEl.image.value,
      likes: 0
      }

    renderToy(toy)
    createToy(toy)
    formEl.reset()
  })
}

//increase likes

//delete 

//initialise the page
const init = () => {
  getToysFromServer()
    .then(renderToys)
  createNewToyUsingForm()
}
init()

