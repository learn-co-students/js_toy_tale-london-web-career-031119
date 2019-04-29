//Server stuff
const TOYS_URL = 'http://localhost:3000/toys'
//get toys

function getToysFromServer(){
    return fetch(TOYS_URL)
        .then(resp => resp.json())
}
//create toys
function createToy(toy){
    fetch(TOYS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toy)
    })
    .then(response => response.json())
}

//update toys
function updateToy(toy){
    fetch(TOYS_URL + `/${toy.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(toy)
    })
    .then(response => response.json())
}

//delete toys
function deleteToy(toy){
    fetch(TOYS_URL + `/${toy.id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
}