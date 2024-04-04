class Project extends HTMLElement {
  constructor() {
    super();
  }

  set project(project) {
    this.innerHTML = `
    <div.col>
        <div class="card bg-dark text-secondary mb-3 shadow-sm">
            <img src="${project.image}" alt="${project.name}" class="img-fluid card-img-top" width="100%" height="225">
            <div class="card-body"> 
                <h2 class="card-title text-white">${project.name}</h2>
                <p class="card-text">${project.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" role="group" aria-label="Project Links">
                        <button type="button" class="btn btn-sm btn-outline-secondary"><a href="${project.githubLink}" target="_blank">GitHub</a></button>
                        <button type="button" class="btn btn-sm btn-outline-secondary"><a href="${project.liveSite}" target="_blank">Live Demo</a></button>
                    </div>
                    <small class="text-secondary">${project.date}</small>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

async function createProjectList() {
  try {
    const response = await fetch("/projects.json");
    if (!response.ok) {
      throw new Error("Projects not found");
    }
    const projects = await response.json();

    const projectsContainer = document.getElementById("projects");
    if (!projectsContainer) {
      throw new Error("Projects container not found");
    }

    projects.reverse().forEach((project) => {
      const projectElement = document.createElement("project-card");
      projectElement.project = project;
      projectsContainer.appendChild(projectElement);
    });
  } catch (error) {
    console.error(error);
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Projects not found
      </div>
    `;
  }
}

customElements.define("project-card", Project);
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#projects") {
    createProjectList();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#projects") {
    createProjectList();
  }
});
