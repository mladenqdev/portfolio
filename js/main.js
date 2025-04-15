document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  setupThemeToggle(); // Setup toggle before fetching data
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
    // Call rendering functions
    renderHeader(data.personalInfo); // Assuming some info might go in header
    renderHero(data.personalInfo);
    renderProjects(data.projects);
    renderWorkExperience(data.workExperience);
    renderSkills(data.skills);
    renderContact(data.personalInfo);
    renderFooter(); // Assuming footer is static or uses general info
  } catch (error) {
    console.error("Could not fetch portfolio data:", error);
    // Optionally display an error message to the user on the page
  }
}

// --- Rendering Functions ---

function renderHeader(info) {
  const header = document.querySelector("header");
  if (!header) return;
  // Example: Simple header with name/initials and nav
  header.innerHTML = `
    <nav>
      <div class="logo">MS.</div> 
      <ul>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#work-experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><button id="theme-toggle" class="theme-btn" aria-label="Toggle theme">☀️</button></li> 
      </ul>
    </nav>
  `;
  // Add listener after button is rendered
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }
}

function renderHero(info) {
  const heroSection = document.getElementById("hero");
  if (!heroSection) return;
  // Wrap name in span.highlight
  const nameParts = info.name.split(" "); // Simple split assuming first/last name
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts.slice(-1)[0];
  const highlightedName = `${firstName} <span class="highlight">${lastName}</span>`; // Highlight last name, adjust if needed
  // Or simply highlight the whole name: const highlightedName = `<span class="highlight">${info.name}</span>`; Let's highlight the whole name for simplicity

  heroSection.innerHTML = `
    <h1>Hi, I am <span class="highlight">${info.name}</span>.</h1>
    <h2>${info.title}.</h2>
    <p>${info.bio}</p>
    <div class="hero-links">
      <a href="${info.resumeUrl}" target="_blank" rel="noopener noreferrer" class="btn">Resume</a> 
      <a href="${info.github}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub"> 
        <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
        </svg>
      </a> 
      <a href="${info.linkedin}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="LinkedIn">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24" fill="currentColor" aria-hidden="true">
           <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
         </svg>
      </a> 
    </div>
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

function renderContact(info) {
  const contactSection = document.getElementById("contact");
  if (!contactSection) return;
  // Simple contact section - replace H2 if needed
  contactSection.innerHTML = `
    <h2>Contact</h2>
    <p>Feel free to reach out!</p>
    <a href="mailto:${info.email}" class="btn">Email Me</a>
  `;
}

function renderFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} Mladen Savic. All rights reserved.</p>
    <!-- Add scroll-to-top later -->
  `;
}

// --- Theme Toggle Logic ---

const sunIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor"><path d="M6.05 4.14l-.39-.39c-.39-.39-1.02-.38-1.4 0l-.01.01c-.39.39-.39 1.02 0 1.4l.39.39c.39.39 1.01.39 1.4 0l.01-.01c.39-.38.39-1.02 0-1.4zM3.01 10.5H1.99c-.55 0-.99.44-.99.99v.01c0 .55.44.99.99.99H3c.56.01 1-.43 1-.98v-.01c0-.56-.44-1-.99-1zm9-9.95H12c-.56 0-1 .44-1 .99v.96c0 .55.44.99.99.99H12c.56.01 1-.43 1-.98v-.97c0-.55-.44-.99-.99-.99zm7.74 3.21c-.39-.39-1.02-.39-1.41-.01l-.39.39c-.39.39-.39 1.02 0 1.4l.01.01c.39.39 1.02.39 1.4 0l.39-.39c.39-.39.39-1.01 0-1.4zm-1.81 15.1l.39.39c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-.39-.39c-.39-.39-1.02-.38-1.4 0-.4.4-.4 1.02-.01 1.41zM20 11.49v.01c0 .55.44.99.99.99H22c.55 0 .99-.44.99-.99v-.01c0-.55-.44-.99-.99-.99h-1.01c-.55 0-.99.44-.99.99zM12 5.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-.01 16.95H12c.55 0 .99-.44.99-.99v-.96c0-.55-.44-.99-.99-.99h-.01c-.55 0-.99.44-.99.99v.96c0 .55.44.99.99.99zm-7.74-3.21c.39.39 1.02.39 1.41 0l.39-.39c.39-.39.38-1.02 0-1.4l-.01-.01a.9959.9959 0 00-1.41 0l-.39.39c-.38.4-.38 1.02.01 1.41z"></path></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor"><path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"></path></svg>`;

function setupThemeToggle() {
  const themeToggleButton = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    if (themeToggleButton) themeToggleButton.innerHTML = moonIcon;
  } else {
    if (themeToggleButton) themeToggleButton.innerHTML = sunIcon;
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  } else {
    setTimeout(() => {
      const btnDelayed = document.getElementById("theme-toggle");
      if (btnDelayed) {
        btnDelayed.addEventListener("click", toggleTheme);
        // Also set initial icon state if button wasn't ready initially
        btnDelayed.innerHTML = document.body.classList.contains("light-theme")
          ? moonIcon
          : sunIcon;
      }
    }, 100);
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const themeToggleButton = document.getElementById("theme-toggle");
  let newTheme;
  if (document.body.classList.contains("light-theme")) {
    newTheme = "light";
    if (themeToggleButton) themeToggleButton.innerHTML = moonIcon;
  } else {
    newTheme = "dark";
    if (themeToggleButton) themeToggleButton.innerHTML = sunIcon;
  }
  localStorage.setItem("theme", newTheme);
}
