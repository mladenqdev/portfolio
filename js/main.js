document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  setupThemeToggle(); // Setup toggle now that button exists in HTML
  renderCopyrightYear(); // Render copyright year immediately
  setupScrollToTopButton(); // Add setup for scroll button
  fetchData(); // Fetch dynamic data
});

async function fetchData() {
  try {
    const response = await fetch("data/portfolio.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);
    // Call rendering functions for DYNAMIC content
    setLogoLink(data.personalInfo);
    renderHeroLinks(data.personalInfo);
    renderProjects(data.projects);
    renderWorkExperience(data.workExperience);
    renderSkills(data.skills);
    renderContactButton(data.personalInfo);
  } catch (error) {
    console.error("Could not fetch portfolio data:", error);
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
        <use xlink:href="assets/sprite.svg#icon-code"></use>
      </svg>
    </a> 
    <a href="${info.linkedin}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="LinkedIn">
      <svg class="icon-svg" aria-hidden="true">
        <use xlink:href="assets/sprite.svg#icon-linkedin"></use>
      </svg>
    </a> 
  `;
}

function renderProjects(projects) {
  const container = document.querySelector(".projects-container");
  if (!container) return;
  container.innerHTML = ""; // Clear existing content

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card"; // Add a class for styling

    const techList = project.techStack
      .map((tech) => `<span>${tech}</span>`)
      .join("");

    card.innerHTML = `
      ${
        project.imageUrl
          ? `<img src="${project.imageUrl}" alt="${project.title} screenshot">`
          : ""
      } 
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tech-stack">${techList}</div>
      <div class="project-links">
        <a href="${
          project.codeUrl
        }" target="_blank" rel="noopener noreferrer">Code</a>
        <a href="${
          project.liveUrl
        }" target="_blank" rel="noopener noreferrer">Live Demo</a>
      </div>
    `;
    container.appendChild(card);
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

const sunIconHTML = `<svg class="icon-svg" aria-hidden="true"><use xlink:href="assets/sprite.svg#icon-sun"></use></svg>`;
const moonIconHTML = `<svg class="icon-svg" aria-hidden="true"><use xlink:href="assets/sprite.svg#icon-moon"></use></svg>`;

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
