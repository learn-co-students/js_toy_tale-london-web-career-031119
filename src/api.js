
//! Server side code


const TOYS_URL = 'http://localhost:3000/toys'

//* Grabs all the toys 

const getToys = () =>
  fetch(TOYS_URL)
    .then(resp => resp.json())

//* Createing a toy - used in a form

const createToy = toy =>
  fetch(TOYS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())

//* Post for replacing the likes to a new number

const updateToy = toy =>
  fetch(TOYS_URL + `/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())

//* Patch for updating the likes to a new number - PREF

const increaseLikes = toy =>
  fetch(TOYS_URL + `/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: toy.likes })
  }).then(resp => resp.json())

//* Delete for the delete button

const deleteToy = id =>
  fetch(TOYS_URL + `/${id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())