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

// Fetching 

const getToys = function(){
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
  
}

const createToy = function(toy){
  fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(toy)
}).then(resp => resp.json())}

const updateToy = function(toy){
      fetch('http://localhost:3000/toys' + `/${toy.id}`,{
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(toy)
      }).then(resp => resp.json())
  }

const formEl = document.querySelector('#add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

//show single toy
renderToy = function(toy){
const toyDiv = document.createElement('div')
toyDiv.innerHTML = `
  
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class='likes'> ${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>

`
  const likeBtn =toyDiv.querySelector('.like-btn')
  toyDiv.addEventListener('click', function(){
    toy.likes++
    updateToy(toy)

    const likesEl = toyDiv.querySelector('.likes')
    likesEl.innerText = `${toy.likes} Likes`

  })

  toyCollection.append(toyDiv)
}

// show multiple toy
  const renderToys = function(toys){
    toys.forEach(renderToy)
}
  // create toy

const addNewToyFromListener = function(){
  formEl.addEventListener('submit', function(event){
	event.preventDefault()

	 const toy = {
		name: formEl.name.value,
		image: formEl.image.value,
		likes: 0
    }
    
    createToy(toy)
    renderToy(toy)
    formEl.reset()
  })
}

// initialize
const init = () => {
  getToys()
    .then(renderToys)
    addNewToyFromListener()
}

 init()