const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const submitToyForm = document.querySelector('.add-toy-form')
const likeBtn = document.querySelectorAll('.like-btn')
const delBtn = document.querySelectorAll('.del-btn')
const toysDiv = document.querySelector('div#toy-collection')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    submitToyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const toy = {
        name: submitToyForm.name.value,
        image: submitToyForm.image.value,
        likes: 0
      }
      createToy(toy)
      showToy(toy)
      submitToyForm.reset()
    })
  } else {
    toyForm.style.display = 'none'
  }
})

const createToy = toy => {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(toy)
  }).then(r => console.log(r.ok))
}

// OR HERE!

const show = toys => toys.forEach(showToy)
const showToy = toy => {
  // create Toy card
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  toyDiv.innerHTML =`
    <button id="${toy.id}" class="del-btn">X</button>
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <button id="${toy.id}" class="like-btn">${toy.likes} ♡</button>
    `
  toysDiv.append(toyDiv)
}

const likeToy = (id) => {
  let likedBtn = document.querySelector(`.like-btn #${id}`)
  const toy = {
    likes: likedBtn.textContent.to_i
  }
  likedBtn.textContent = `${toy.likes}`
}

const deleteToy = (id) => {
  let deletedBtn = document.querySelector(`.del-btn #${id}`)
}

const listenToCards = () => {
  likeBtn.addEventListener('click', () => {
    likeToy(likeBtn.id)
  })
  delBtn.addEventListener('click', () => {
    deleteToy(delBtn.id)
  })
}

const getToys = () =>
fetch('http://localhost:3000/toys')
  .then(r => r.json())

  // Init
  getToys()
    .then(toys => show(toys))
    .then(listenToCards())