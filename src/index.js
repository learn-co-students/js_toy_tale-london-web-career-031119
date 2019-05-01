const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector(`#toy-collection`);
const toyFormEl = document.querySelector(`#add-toy-form`)
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

//! when dom loads im populating 
document.addEventListener("DOMContentLoaded",() => {
  // I have my getToys api request then I need to have a method that takes the api and populates 
  getToys().then(data => addToys(data))
  //* is the same as
  //* getToys().then(addToys) 
})

//! Adding toyyyyyyyyyy
const addAToy = (toy) => {
  // keep in mind this toy object can be used anywhere here 
  const card = document.createElement(`div`);
  card.className ="card"            //setAttribute("class","card")
  card.setAttribute("id",toy.id)
  card.innerHTML =`
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar"/>
  <p>${toy.likes}</p>
  <button type="submit" value="like" class="like-btn">like<3</button>
  <button type="submit" value="delete" class="delete-btn">delete </button
  `
  const likesEl = card.querySelector(`p`) ;

  //Logic for removing the card of page and off server when deleted
  const deleteBtn = card.querySelector('.delete-btn')
  deleteBtn.addEventListener('click', () => {
    card.remove();
    deleteToy(card.id);
  })
 //logic for adding likes when the liked button is clicked 
 const likeButton = card.querySelector('.like-btn')
  likeButton.addEventListener("click", () =>{
  toy.likes ++ 
  likesEl.innerText = toy.likes ;
  updateToyLikes(toy)
}

)

  toyCollection.append(card);
  }
  //! Function for adding toys IT BRIDGES the fetch for TOYS(nested hash) and the method that creates single Toys (with single hash)
  const addToys = apiToys => { 
     apiToys.forEach(toy => addAToy(toy)) // now imma invoke this when the dom STARTS!. refer to it to c how i bridged it
      //* why? if i wanted to use my addAtoy method on getToys fetch request the code would look like 
   // getToys().then(data => data.forEach(x => addToy(x))) so I abstract the forEach into addToys variable 
 }   
  
//! when sumbitting form to create a toy 
toyFormEl.addEventListener("submit", () => {
  let toy = {
      "name": toyFormEl.name.value,
      "image": toyFormEl.image.value,
      "likes": 0
  }
     
  createToy(toy); //*post request method passing the toy
  addAToy(toy);  //*using our addToys method to add this toy at the same time we update the server (i.e rendering it)
  
  toyFormEl.reset()
  });

//! get the Books from the server , I made it implicit arrow function 
const getToys = () => 
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())

//! get request
const fetchToy = 
fetch("http://localhost:3000/toys")

//!post request 

const createToy = toy =>
fetch("http://localhost:3000/toys",{ // when using fetch more arguments such post the one single parathensis encapulsates it 
  method: `POST`,
  headers: { "Content-type": "application/json"},
  body: JSON.stringify(toy)
}).then(resp => resp.json())

//!Patch request (update)
const updateToyLikes = toy =>
fetch(`http://localhost:3000/toys/${toy.id}`,{ // when using fetch more arguments such post the one single parathensis encapulsates it 
  method: `PATCH`,
  headers: { "Content-type": "application/json"},
  body: JSON.stringify({likes: toy.likes})
}).then(resp => resp.json())

//! delete request
const deleteToy = id =>
fetch(`http://localhost:3000/toys/${id}`, {
  method: 'DELETE',
})
