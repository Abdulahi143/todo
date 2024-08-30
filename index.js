const inputEl = document.getElementById("todo-input");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("todo");
const errorMessage = document.getElementById("error-message"); // Error message element
let toDos = [];
let doneList = [];

// Retrieve to-do list and checked states from localStorage
const toDoListFromLocalStorage = JSON.parse(localStorage.getItem("dos"));
const doneListFromLocalStorage = JSON.parse(localStorage.getItem("doneList"));

if (toDoListFromLocalStorage) {
    toDos = toDoListFromLocalStorage;
}

if (doneListFromLocalStorage) {
    doneList = doneListFromLocalStorage;
}

// Render the to-do list with checked states and add/remove 'done' class
function render(toDos, doneList) {
    let listItems = "";
    for (let i = 0; i < toDos.length; i++) {
        listItems += `
        <div class="list" id="list-${i}"> 
        <input
              type="checkbox"
              value="None"
              id="checkbox-${i}"
              name="check"
              class="check"
              ${doneList[i] ? "checked" : ""}
            />
            <label for="checkbox-${i}" class="${doneList[i] ? "done" : ""}">${toDos[i]}</label>
            <i class="fa-solid fa-trash delete-btn" data-index="${i}"></i>
            </div>
        `;
    }
    listEl.innerHTML = listItems;

    // Add event listeners for delete buttons
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            toDos.splice(index, 1);
            doneList.splice(index, 1); // Remove the corresponding done status
            localStorage.setItem('dos', JSON.stringify(toDos));
            localStorage.setItem('doneList', JSON.stringify(doneList));
            render(toDos, doneList);
        });
    });

    // Add event listeners for checkboxes
    const checkboxes = document.querySelectorAll('.check');
    const labels = document.querySelectorAll('label');
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            doneList[index] = checkbox.checked;

            if (checkbox.checked) {
                labels[index].classList.add('done');
            } else {
                labels[index].classList.remove('done');
            }

            localStorage.setItem('doneList', JSON.stringify(doneList));
        });
    });
}

render(toDos, doneList);

const addTodo = () => {
    const todoText = inputEl.value.trim();

    if (todoText === "") {
        errorMessage.style.display = "inline-block"; // Show error message
    } else {
        errorMessage.style.display = "none"; // Hide error message
        toDos.unshift(todoText);
        doneList.unshift(false); // New item is not checked by default
        localStorage.setItem("dos", JSON.stringify(toDos));
        localStorage.setItem("doneList", JSON.stringify(doneList));
        inputEl.value = "";
        render(toDos, doneList);
    }
};

addBtn.addEventListener('click', addTodo);

inputEl.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
