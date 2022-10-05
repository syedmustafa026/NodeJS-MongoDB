var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleString();

// myTodo = () => {
//     let todoT = document.querySelector("#todo").value
//     axios.post(`http://localhost:3000/todo`, {
//         text: todoT
//     })
//         .then((response) => {
//             console.log(response.data);
//             document.querySelector('#result').innerHTML = ""

//             response.data.data.map(eachTodo => {
//                 document.querySelector('#result').innerHTML += eachTodo
//                 document.querySelector('#result').innerHTML += '<br>'
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }

// getAllTodos = () => {
//     axios.get(`http://localhost:3000/todos`)
//         .then((response) => {
//             console.log(response.data);
//             document.querySelector('#result').innerHTML = ""

//             response.data.data.map(eachTodo => {
//                 document.querySelector('#result').innerHTML += eachTodo
//                 document.querySelector('#result').innerHTML += '<br>'
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         })
// }
// setInterval(getAllTodos, 1000);
