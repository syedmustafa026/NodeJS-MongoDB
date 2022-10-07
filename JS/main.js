
// Selectors


const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard')
    : changeTheme(localStorage.getItem('savedTheme'));

// Functions;
function addToDo(event) {
    // Prevents form from submitting / Prevents form from relaoding;
    event.preventDefault();

    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
        alert("You must write something!");
    }
    else {
        toDoList.innerHTML +=
            `<div class="todo ${savedTheme}-todo">
                    <div  class="todo-item">
                   <li>${toDoInput.value}</li></div>
                     <button class="check-btn"><i class="fas fa-check"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>`
        // adding to server
        axios.post('http://localhost:3000/todo', {
            text: toDoInput.value
        })
            .catch((err) => console.log("err", err))
        // CLearing the input;
        toDoInput.value = '';
    }

}


function deletecheck(event) {
console.log("deleted");
axios.delete(`http://localhost:3000/todo/${text}`, {
    text: toDoInput.value
})
    // console.log(event.target);
    const item = event.target;

    // delete
    if (item.classList[0] === 'delete-btn') {
        // item.parentElement.remove();
        // animation
        item.parentElement.classList.add("fall");

        //removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        })
    }

    // check
    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}
console.log();
function getTodos() {
    // adding to server
    axios.get(`http://localhost:3000/todos`)
        .then((response) => {
            response.data.data.map((value, id) => {
                var todoID = value._id
                console.log(todoID);
                toDoList.innerHTML +=
                    `<div class="todo ${savedTheme}-todo">
                <div  class="todo-item">
               <li>${value.text}</li></div>
                <button class="check-btn"><i class="fas fa-check"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
               </div>`
            })
        })
        .catch((err) => console.log("err", err))

}

// POST /todo
// GET /todos
// GET /todo/id
// PUT /todo/id
// DELETE /todo/id

function removeLocalTodos(todo) {
    //Check: if item/s are there;
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Change theme function:
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;
    // Change blinking cursor for darker theme:
    color === 'darker' ?
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;
    // Change todo color without changing their status (completed or not):
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ?
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });
    // Change buttons color according to their type (todo, check or delete):
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`;
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}
