const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = document.querySelector('.add-toy-form')
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

form.addEventListener('submit', () => {
  event.preventDefault()
  const toy = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  }
  createToy(toy)
  .then(addToy);
  event.target.reset();
  toyForm.style.display = 'none';
  addToy != addToy;
});

document.addEventListener('DOMContentLoaded', () => {
  getToys()
  .then(addToys)
})

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then( resp => resp.json() )
}

function addToyCard(toy) {
  const div = document.createElement('div')
  div.className = "card"
  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class="likes">${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  const likeBtn = div.querySelector('.like-btn')
  const likesP = div.querySelector('.likes')

  likeBtn.addEventListener('click', () => {
    toy.likes++
    debugger
    like(toy)
    likesP.innerHTML = `${toy.likes} Likes`
    // fucntion to update to json

  })

  toyCollection.appendChild(div)
}

function addToys(toys) {
  toys.forEach(addToyCard);
}

function createCard() {
  let card = document.createElement("div");
  return card.className = "card";
}

function createToy(toyData) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };

  return fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
}

function like(ToyObj) {
  let configObj = {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(ToyObj)
  };

  return fetch(`http://localhost:3000/toys/${ToyObj.id}`, configObj)
    .then( resp => resp.json() )
}