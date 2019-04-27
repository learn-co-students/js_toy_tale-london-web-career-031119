const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const formEl = document.querySelector('.add-toy-form')

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

// render single toy

const renderToy = (toy) => {
  const div = document.createElement('div')
  div.className = "card"
  div.innerHTML = 
  `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p class='likes'>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    <button class="del-btn">Delete</button>
  `
  document.getElementById('toy-collection').appendChild(div)

  const likeBtn = div.querySelector('.like-btn')
  const likesEl = div.querySelector('.likes')

  likeBtn.addEventListener('click', () => {
    toy.likes++
    likesEl.innerText = `${toy.likes} Likes`
    increaseLikes(toy) 
  })

  const DelBtn = div.querySelector('.del-btn')
  DelBtn.addEventListener('click', () => {
    destroyToy(toy)
    div.remove()
  })

}

// render multiple toys 

const renderToys = (toys) => {
  toys.forEach(renderToy)
}

// create a toy

const addEventListenerToForm = () => {
  formEl.addEventListener('submit', event => {
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

// initialise page 

const init = () => {
  getToys()
  .then(renderToys)
  addEventListenerToForm()  
}

init()  