const getToys = () =>
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())

const increaseLikes = (toy) =>
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())

const createToy = (toy) =>
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
