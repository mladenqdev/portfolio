document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  setupThemeToggle(); // Setup toggle now that button exists in HTML
  renderCopyrightYear(); // Render copyright year immediately
  setupScrollToTopButton(); // Add setup for scroll button
  fetchData(); // Fetch dynamic data
});

let projectsData = [];
let currentProjectIndex = 0;

async function fetchData() {
  try {
    const response = await fetch("data/portfolio.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);

    // Store projects data
    projectsData = data.projects || [];

    // Call rendering functions for DYNAMIC content
    setLogoLink(data.personalInfo);
    renderHeroLinks(data.personalInfo);
    if (projectsData.length > 0) {
      renderCurrentProject(); // Initial render
      setupCarouselNav(); // Setup nav after data is ready
    } else {
      // Handle case where there are no projects
      const contentDiv = document.querySelector(
        "#projects-carousel .carousel-content"
      );
      if (contentDiv) contentDiv.innerHTML = "<p>No projects to display.</p>";
    }
    renderWorkExperience(data.workExperience);
    renderSkills(data.skills);
    renderContactButton(data.personalInfo);
  } catch (error) {
    console.error("Could not fetch portfolio data:", error);
    // Display error in carousel area
    const contentDiv = document.querySelector(
      "#projects-carousel .carousel-content"
    );
    if (contentDiv) contentDiv.innerHTML = "<p>Error loading projects.</p>";
  }
}

// --- Rendering Functions ---

function setLogoLink(info) {
  const logoLink = document.getElementById("logo-link");
  if (logoLink && info.gitlab) {
    logoLink.href = info.gitlab;
  }
}

function renderHeroLinks(info) {
  const heroLinksContainer = document.querySelector("#hero .hero-links");
  if (!heroLinksContainer) return;
  const gitlabLabel = "GitLab"; // Or "Code Repository"?

  heroLinksContainer.innerHTML = `
    <a href="${info.resumeUrl}" target="_blank" rel="noopener noreferrer" class="btn">Resume</a> 
    <a href="${info.gitlab}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="${gitlabLabel}"> 
      <svg class="icon-svg" aria-hidden="true">
        <use href="/assets/sprite.svg#icon-code"></use>
      </svg>
    </a> 
    <a href="${info.linkedin}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="LinkedIn">
      <svg class="icon-svg" aria-hidden="true">
        <use href="/assets/sprite.svg#icon-linkedin"></use>
      </svg>
    </a> 
  `;
}

function renderCurrentProject() {
  if (!projectsData || projectsData.length === 0) return;

  const project = projectsData[currentProjectIndex];
  const contentDiv = document.querySelector(
    "#projects-carousel .carousel-content"
  );
  if (!contentDiv) return;

  const techList = project.techStack
    .map((tech) => `<span>${tech}</span>`)
    .join("");

  // Use the simple, fill-based SVG directly for the external link
  const externalLinkSvg = `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor">
<path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
  </svg>`;

  contentDiv.innerHTML = `
    <h3>${project.title}</h3> 
    <div class="project-top">
      <div class="project-image">
        ${
          project.imageUrl
            ? `<img src="${project.imageUrl}" alt="${project.title} screenshot">`
            : '<div class="no-image">No Image Available</div>'
        } 
      </div>
      <div class="project-stack">
        <h4>Tech Stack:</h4>
        <div class="tech-stack">${techList}</div>
      </div>
    </div>
    <div class="project-description">
      <p>${project.description}</p>
    </div>
    <div class="project-links">
      <a href="${
        project.codeUrl
      }" target="_blank" rel="noopener noreferrer" aria-label="View Code">
        <svg class="icon-svg" aria-hidden="true"><use href="/assets/sprite.svg#icon-code"></use></svg>
      </a>
      <a href="${
        project.liveUrl
      }" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
        ${externalLinkSvg}
      </a>
    </div>
  `;
}

function setupCarouselNav() {
  const prevBtn = document.getElementById("prev-project");
  const nextBtn = document.getElementById("next-project");

  if (!prevBtn || !nextBtn) {
    // Check if buttons exist
    console.warn("Carousel navigation buttons not found.");
    return;
  }

  // Hide buttons if only one project
  if (projectsData.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    return;
  } else {
    prevBtn.style.display = "flex"; // Ensure visible if more than one project
    nextBtn.style.display = "flex";
  }

  prevBtn.addEventListener("click", () => {
    currentProjectIndex =
      (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    renderCurrentProject();
  });

  nextBtn.addEventListener("click", () => {
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    renderCurrentProject();
  });
}

function renderWorkExperience(experience) {
  const container = document.querySelector(".experience-container");
  if (!container) return;
  container.innerHTML = ""; // Clear existing

  // Simple list for now, timeline styling will be CSS-driven
  experience.forEach((job) => {
    const jobElement = document.createElement("div");
    jobElement.className = "job-entry";

    const descriptionPoints = job.description
      .map((point) => `<li>${point}</li>`)
      .join("");

    jobElement.innerHTML = `
      <h3>${job.jobTitle}</h3>
      <h4>${job.company} | ${job.location}</h4>
      <p class="dates">${job.startDate} - ${job.endDate}</p>
      <ul>${descriptionPoints}</ul>
    `;
    container.appendChild(jobElement);
  });
}

function renderSkills(skills) {
  const container = document.querySelector(".skills-container");
  if (!container) return;
  container.innerHTML = ""; // Clear existing

  skills.forEach((skill) => {
    const skillTag = document.createElement("span");
    skillTag.className = "skill-tag";
    skillTag.textContent = skill;
    container.appendChild(skillTag);
  });
}

function renderContactButton(info) {
  const container = document.querySelector(
    "#contact .contact-button-container"
  );
  if (!container) return;
  container.innerHTML = `
    <a href="mailto:${info.email}" class="btn">Email Me</a>
  `;
}

function renderCopyrightYear() {
  const yearSpan = document.getElementById("copyright-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// --- Theme Toggle Logic ---

const sunIconHTML = `<svg class="icon-svg" aria-hidden="true"><use href="/assets/sprite.svg#icon-sun"></use></svg>`;
const moonIconHTML = `<svg class="icon-svg" aria-hidden="true"><use href="/assets/sprite.svg#icon-moon"></use></svg>`;

function setupThemeToggle() {
  const themeToggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleButton) themeToggleButton.innerHTML = moonIconHTML;
  } else {
    // Default dark theme
    if (themeToggleButton) themeToggleButton.innerHTML = sunIconHTML;
  }

  // Add listener now that button is guaranteed to be in HTML
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const themeToggleButton = document.getElementById("theme-toggle");
  let newTheme;
  if (document.body.classList.contains("light-theme")) {
    newTheme = "light";
    if (themeToggleButton) themeToggleButton.innerHTML = moonIconHTML;
  } else {
    newTheme = "dark";
    if (themeToggleButton) themeToggleButton.innerHTML = sunIconHTML;
  }
  localStorage.setItem("theme", newTheme);
}

// --- Scroll-to-Top Logic ---

function setupScrollToTopButton() {
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  const scrollThreshold = 300; // Pixels to scroll before showing button

  if (!scrollToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  });
}
