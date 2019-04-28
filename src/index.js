const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const formEl = document.querySelector('.add-toy-form')
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

//render a single toy
const renderToy = (toy) => {
  const divEl = document.createElement("div")
  divEl.className = "card"

  divEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p class="likes">${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
 `

 const btnEl = divEl.querySelector(".like-btn")
 const pEl = divEl.querySelector(".likes")

 btnEl.addEventListener('click', () => {
   toy.likes++
   increaseLikes(toy)
   pEl.innerText = `${toy.likes} Likes`
 })

 toyCollection.append(divEl)
}

//render all toys
const renderToys = (toys) => {
  toys.forEach(renderToy)
}

//create a new toy
const addListenerToToyForm = () => {
  formEl.addEventListener('submit', event => {
    event.preventDefault()

    const toy = {
      name: formEl.name.value,
      image: formEl.image.value,
      likes: 0
    }

    createToy(toy)
    .then(renderToy)
    formEl.reset()

  })
}

//initiate
const init = () => {
  getToys()
    .then(renderToys)
  addListenerToToyForm()
}

init()
