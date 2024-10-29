const apiUrl = "https://todolist-backend-gxma.onrender.com/catalog"; // Your API base URL

// Function to fetch and display projects
async function fetchProjects() {
  try {
    const response = await fetch(`${apiUrl}/get-projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

// Function to display projects in the table
function displayProjects(projects) {
  const tableBody = document.getElementById("projectTableBody");
  tableBody.innerHTML = ""; // Clear the table

  if (projects.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = "<td colspan='7'>No projects available</td>"; // Message if no projects
    tableBody.appendChild(row);
    return;
  }

  projects.forEach((project, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${project.name}</td>
      <td><a href="${project.githubLink}" target="_blank">GitHub</a></td>
      <td>${project.reportLink ? `<a href="${project.reportLink}" target="_blank">Report</a>` : "N/A"}</td>
      <td>${project.mediaLink ? `<a href="${project.mediaLink}" target="_blank">Media</a>` : "N/A"}</td>
      <td>${project.owner}</td>
      <td><button onclick="deleteProject('${project._id}')" class="btn btn-danger btn-sm">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to add a new project
async function addProject(event) {
  event.preventDefault(); // Prevent the default form submission

  const projectName = document.getElementById("projectName").value.trim();
  const githubLink = document.getElementById("githubLink").value.trim();
  const reportLink = document.getElementById("reportLink").value.trim();
  const mediaLink = document.getElementById("mediaLink").value.trim();
  const owner = document.getElementById("owner").value;

  // Validate input fields
  if (!projectName || !githubLink || !owner) {
    alert("Please fill in all required fields.");
    return;
  }

  const newProject = { name: projectName, githubLink, reportLink, mediaLink, owner };
  console.log("New Project Data:", newProject); // Debug log

  try {
    const response = await fetch(`${apiUrl}/add-project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    console.log("Project added successfully!"); // Debug log
    fetchProjects(); // Refresh the list
    document.getElementById("addProjectForm").reset(); // Reset form fields
  } catch (error) {
    console.error("Error adding project:", error);
  }
}

// Function to delete a project
async function deleteProject(id) {
  try {
    const response = await fetch(`${apiUrl}/delete-project/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }

    fetchProjects(); // Refresh the list
  } catch (error) {
    console.error("Error deleting project:", error);
  }
}

document.getElementById('todoBtn').addEventListener('click', function() {
  window.location.href = 'todo.html'; 
});


// Event listener for form submission
document.getElementById("addProjectForm").addEventListener("submit", addProject);

// Initial fetch on page load
fetchProjects();
