document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  fetchData();
});

async function fetchData() {
  try {
    const response = await fetch("data/portfolio.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);
    // Call rendering functions here
    // renderHero(data.personalInfo);
    // renderProjects(data.projects);
    // renderWorkExperience(data.workExperience);
    // renderSkills(data.skills);
    // renderContact(data.personalInfo);
  } catch (error) {
    console.error("Could not fetch portfolio data:", error);
    // Optionally display an error message to the user on the page
  }
}

// --- Rendering Functions ---
// (Define renderHero, renderProjects, etc. below)

/*
function renderProjects(projects) {
    const container = document.querySelector('.projects-container');
    if (!container) return;
    container.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card'; // Add a class for styling
        
        // Populate card with project data (Title, Description, Image, Links, Tech Stack)
        // Example:
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            // Add more elements for image, links, tech stack
        `;
        container.appendChild(card);
    });
}
*/

// Add other rendering functions similarly
