const TOYS_URL = 'http://localhost:3000/toys'

const getToys = () =>
  fetch(TOYS_URL)
    .then(resp => resp.json())

const createToy = toy => {
    fetch(TOYS_URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(toy)
  }).then(resp => resp.json())

}

const increaseLikes = toy => {
    fetch(TOYS_URL + `/${toy.id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({likes :toy.likes})
  }).then(resp => resp.json()) 
}

const destroyToy = toy => {
    fetch(TOYS_URL + `/${toy.id}`, {
        method: 'DELETE'
  }).then(resp => resp.json()) 
}