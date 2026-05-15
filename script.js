//Select Dom Elements 
const input = document.getElementById("todo-input")
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

/*=====new changes=====*/
const count = document.createElement('p');
count.id = 'count';
document.body.appendChild(count);


//Try to load saved todos from local storage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //this saves current todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Create a dom node for a todo object & append it to the list 
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;  // double not gives us exact False value or gieves exact boolean value
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;

        // TODO: Visual feedback : strick-through when completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    });

    //TExt of the TODO 
    const textSpan = document.createElement('span')
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    //Add double click event llistener to edit todo
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim()
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    /*=====new changes=====*/

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.classList.add('edit-btn');

    editBtn.addEventListener('click', () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });



    //Delete ToDo button 
    const delBtn = document.createElement('button');
    /*=====new changes=====*/
    delBtn.textContent = '✕';
    delBtn.classList.add('delete-btn');
    
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    return li; // to call from render function  
}

//Render the whole TOdo list from todos array
function render() {
    list.innerHTML = '';

    //Recreate each item 
    todos.forEach((todo, index) => {

        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
    /*=====new changes=====*/
    const remaining = todos.filter(todo => !todo.completed).length;
    count.textContent = `Your remaining tasks are : ${remaining}`;

}

/*=====new changes=====*/
// Quote Box
const quote = document.createElement('div');

quote.classList.add('quote-box');

quote.innerHTML = `
<span>❝</span>
"It always seems impossible until it's done"- Nelson Mandela.
`;

document.body.appendChild(quote);



function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    //Push a new todo object 
    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}


addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})
render();






