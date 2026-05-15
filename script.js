// Select Elements
const input = document.getElementById("todo-input");

const addBtn = document.getElementById("add-btn");

const list = document.getElementById("todo-list");

const count = document.getElementById("count");

// Load saved todos
const saved = localStorage.getItem("todos");

const todos = saved ? JSON.parse(saved) : [];

// Save todos
function saveTodos(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

// Update remaining count
function updateCount(){

    const remaining =
    todos.filter(todo => !todo.completed).length;

    count.textContent = remaining;
}

// Create Todo
function createTodoNode(todo, index){

    // Create li
    const li = document.createElement("li");

    // Left div
    const leftDiv = document.createElement("div");

    leftDiv.classList.add("left");

    // Checkbox
    const checkbox =
    document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = todo.completed;

    // Todo text
    const textSpan =
    document.createElement("span");

    textSpan.textContent = todo.text;

    // Completed style
    if(todo.completed){
        textSpan.classList.add("completed");
    }

    // Checkbox event
    checkbox.addEventListener("change", () => {

        todo.completed = checkbox.checked;

        if(todo.completed){
            textSpan.classList.add("completed");
        }

        else{
            textSpan.classList.remove("completed");
        }

        saveTodos();

        updateCount();
    });


    // =========================
    // EDIT BUTTON
    // =========================

    const editBtn =
    document.createElement("button");
    // Black pencil//
    editBtn.innerHTML = "&#9998;";
    editBtn.classList.add("edit-btn");

    // Edit event
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit todo:", todo.text);
        if(newText !== null){
            if(newText.trim() !== "") {
                todo.text = newText.trim();
                textSpan.textContent = todo.text;
                saveTodos();
            }

        }
    });

    // Delete Button
    const delBtn =
    document.createElement("button");

    delBtn.innerHTML = "×";

    delBtn.classList.add("delete-btn");

    // Delete event
    delBtn.addEventListener("click", () => {

        todos.splice(index, 1);

        render();

        saveTodos();
    });

    // Add elements
    leftDiv.appendChild(checkbox);

    leftDiv.appendChild(textSpan);

    li.appendChild(leftDiv);

    li.appendChild(editBtn);

    li.appendChild(delBtn);

    return li;
}

// Render Todos
function render(){

    list.innerHTML = "";

    todos.forEach((todo, index) => {

        const node =
        createTodoNode(todo, index);

        list.appendChild(node);
    });

    updateCount();
}

// Add Todo
function addTodo(){

    const text = input.value.trim();

    // Stop empty input
    if(!text){
        return;
    }

    // Add todo object
    todos.push({
        text,
        completed:false
    });

    // Clear input
    input.value = "";

    render();

    saveTodos();
}

// Add button click
addBtn.addEventListener("click",addTodo
);

// Enter key support
input.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){
        addTodo();
    }
});

// Initial render
render();
