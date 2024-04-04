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

window.addEventListener("load", () => {
  createProjectList();
});

async function createProjectList() {
  const response = await fetch("/projects.json");
  const projects = await response.json();

  const projectsContainer = document.getElementById("projects");

  projects.reverse().forEach((project) => {
    const projectElement = document.createElement("project-card");
    projectElement.project = project;
    projectsContainer.appendChild(projectElement);
  });
}

customElements.define("project-card", Project);
