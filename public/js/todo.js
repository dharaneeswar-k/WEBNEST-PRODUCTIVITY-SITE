const API_URL = "https://todolist-backend-gxma.onrender.com/todo";

// Fetch and display todos
async function fetchTodos() {
    try {
      const response = await fetch(`${API_URL}/get-todos`);
      const todos = await response.json();
      const todoList = document.getElementById("todoList");
      todoList.innerHTML = ""; // Clear the current list
  
      todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
  
        listItem.innerHTML = `
          <div class="form-check">
            <input 
              type="checkbox" 
              class="form-check-input" 
              id="todo-${todo._id}" 
              ${todo.completed ? 'checked' : ''} 
              onchange="toggleTodo('${todo._id}')"
            />
            <label class="form-check-label ${todo.completed ? 'completed' : ''}" for="todo-${todo._id}">
              ${todo.text}
            </label>
          </div>
          <button onclick="deleteTodo('${todo._id}')" class="btn btn-danger btn-sm">Delete</button>
        `;
  
        todoList.appendChild(listItem);
      });
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  }
  

// Add a new todo
document.getElementById("addTodoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const todoText = document.getElementById("todoText").value;

  try {
    await fetch(`${API_URL}/add-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: todoText }),
    });
    document.getElementById("todoText").value = ""; // Clear input
    fetchTodos(); // Refresh the list
  } catch (error) {
    console.log("Error adding todo:", error);
  }
});

// Toggle a todo's completion status
async function toggleTodo(todoId) {
  try {
    await fetch(`${API_URL}/toggle-todo/${todoId}`, {
      method: "POST",
    });
    fetchTodos(); // Refresh the list after toggling
  } catch (error) {
    console.log("Error toggling todo:", error);
  }
}


// Delete a todo
async function deleteTodo(todoId) {
  try {
    await fetch(`${API_URL}/delete-todo/${todoId}`, {
      method: "DELETE",
    });
    fetchTodos(); // Refresh the list after deletion
  } catch (error) {
    console.log("Error deleting todo:", error);
  }
}

document.getElementById('catalogBtn').addEventListener('click', function() {
  window.location.href = 'catalog.html'; // Change 'catalog.html' to your actual catalog page URL
});


// Initial fetch of todos on page load
fetchTodos();
