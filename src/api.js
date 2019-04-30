//Server code

// const getToys = function(){
//     return fetch('http://localhost:3000/toys')
//       .then(resp => resp.json())
    
//   }
  
//   const createToy = function(toy){
//     fetch('http://localhost:3000/toys',{
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(toy)
//   }).then(resp => resp.json())}

//   const updateToy = function(toy){
//         fetch('http://localhost:3000/toys' + `/${toy.id}`,{
//             method: 'PATCH',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(toy)
//         }).then(resp => resp.json())
//     }
