const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
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

//Show Toys
const showToy = (toy) => {
  cardDiv = document.createElement('div')
  cardDiv.className = 'card'

  cardDiv.innerHTML =
    `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `

  let likeBtn = cardDiv.querySelector(".like-btn")
  let pDiv = cardDiv.querySelector("p")

  likeBtn.addEventListener('click', () =>
    {
      toy.likes++
      pDiv.innerText = `${toy.likes} Likes`
    }
  )

  toyCollection.append(cardDiv)
}

const showToys = toys => toys.forEach(showToy)

//Create A Toy
const makeToy = toy => {

  toyForm.addEventListener('submit', event => {
    event.preventDefault()

    const toy = {
    name: toyForm.name.value,
    image: toyForm.image.value,
    likes: 0
  }

  createToy(toy)
    .then(showToy)

  toyForm.reset()
  })
}

//initialisation
const init = () =>{
  fetchToys()
    .then(showToys)
}
init()
