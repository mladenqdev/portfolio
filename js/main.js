document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  renderCopyrightYear();
  setupScrollToTopButton();
  setupMobileMenu();
  fetchData();
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

    projectsData = data.projects || [];

    // call rendering functions for dynamic content
    setLogoLink(data.personalInfo);
    renderHeroLinks(data.personalInfo);
    if (projectsData.length > 0) {
      renderCurrentProject(); // initial render
      setupCarouselNav(); // setup nav after data is ready
      // add project counter if more than one project
      if (projectsData.length > 1) {
        const carouselContainer = document.getElementById("projects-carousel");
        if (carouselContainer) {
          const counterElement = document.createElement("div");
          counterElement.id = "project-counter";
          carouselContainer.appendChild(counterElement);
          if (getComputedStyle(carouselContainer).position === "static") {
            carouselContainer.style.position = "relative";
          }
          updateProjectCounter();
        }
      }
    } else {
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
  const gitlabLabel = "GitLab";

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

  // generate categorized tech stack HTML
  const techListHtml = project.techStack
    .map(
      (tech) =>
        `<span class="tech-bubble">
      <strong>${tech.category}:</strong> ${tech.name}
    </span>`
    )
    .join("");

  // Use the simple, fill-based SVG directly for the external link
  const externalLinkSvg = `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="currentColor">
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
  </svg>`;

  contentDiv.innerHTML = `
    <article>
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
          <div class="tech-stack-bubbles">${techListHtml}</div>
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
    </article>
  `;
}

function updateProjectCounter() {
  const counterElement = document.getElementById("project-counter");
  if (counterElement && projectsData.length > 1) {
    counterElement.textContent = `${currentProjectIndex + 1} / ${
      projectsData.length
    }`;
  }
}

function setupCarouselNav() {
  const prevBtn = document.getElementById("prev-project");
  const nextBtn = document.getElementById("next-project");
  const contentDiv = document.querySelector(
    "#projects-carousel .carousel-content"
  );

  if (!prevBtn || !nextBtn || !contentDiv) {
    console.warn("Carousel navigation buttons or content area not found.");
    return;
  }

  if (projectsData.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    return;
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
  }

  const transitionDuration = 300;

  function changeSlide(direction) {
    contentDiv.classList.add("fading-out");

    setTimeout(() => {
      if (direction === "prev") {
        currentProjectIndex =
          (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
      } else {
        currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
      }
      renderCurrentProject();
      updateProjectCounter();
      contentDiv.classList.remove("fading-out");
    }, transitionDuration);
  }

  prevBtn.addEventListener("click", () => {
    changeSlide("prev");
  });

  nextBtn.addEventListener("click", () => {
    changeSlide("next");
  });
}

function renderWorkExperience(experience) {
  const container = document.querySelector(".experience-container");
  if (!container) return;
  container.innerHTML = "";

  const reversedExperience = [...experience].reverse();

  reversedExperience.forEach((job) => {
    const jobElement = document.createElement("article");
    jobElement.className = "job-entry";

    const descriptionPoints = job.description
      .map((point) => {
        const pointLower = point.toLowerCase();
        if (pointLower.startsWith("key project:")) {
          const colonIndex = point.indexOf(":");
          if (colonIndex !== -1) {
            const label = point.substring(0, colonIndex + 1);
            const content = point.substring(colonIndex + 1);
            return `<li><strong>${label}</strong> ${content.trim()}</li>`;
          } else {
            return `<li><strong>${point}</strong></li>`;
          }
        } else if (pointLower.startsWith("technologies used:")) {
          const colonIndex = point.indexOf(":");
          if (colonIndex !== -1) {
            const label = point.substring(0, colonIndex + 1);
            const content = point.substring(colonIndex + 1);
            return `<li><strong>${label}</strong> ${content.trim()}</li>`;
          } else {
            return `<li><strong>${point}</strong></li>`;
          }
        } else {
          return `<li>${point}</li>`;
        }
      })
      .join("");

    jobElement.innerHTML = `
      <h3>${job.jobTitle}</h3>
      <h4>${job.company}${job.location ? ` | ${job.location}` : ""}</h4>
      <p class="dates">${job.startDate} - ${job.endDate}</p>
      <ul>${descriptionPoints}</ul>
    `;
    container.appendChild(jobElement);
  });
}

function renderSkills(skills) {
  const container = document.querySelector(".skills-container");
  if (!container) return;
  container.innerHTML = "";

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
    // default dark theme
    if (themeToggleButton) themeToggleButton.innerHTML = sunIconHTML;
  }

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
  const scrollThreshold = 300; // pixels to scroll before showing button

  if (!scrollToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Define SVGs for icons
const hamburgerIconSVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`;
const closeIconSVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>`;

// Add this new function
function setupMobileMenu() {
  const navContainer = document.querySelector(".nav-container");
  const headerNav = document.querySelector("header nav");
  const desktopNavUl = document.querySelector("header ul");
  const themeBtn = document.getElementById("theme-toggle"); // Get existing theme button

  if (!navContainer || !headerNav || !desktopNavUl || !themeBtn) {
    // Added themeBtn check
    console.error("Header elements for mobile menu setup not found.");
    return;
  }

  // 1. Create Header Controls Wrapper
  const headerControls = document.createElement("div");
  headerControls.className = "header-controls";

  // 2. Create Hamburger Button
  const menuToggleBtn = document.createElement("button");
  menuToggleBtn.id = "menu-toggle";
  menuToggleBtn.className = "mobile-nav-toggle";
  menuToggleBtn.setAttribute("aria-label", "Toggle navigation");
  menuToggleBtn.setAttribute("aria-expanded", "false");
  menuToggleBtn.innerHTML = hamburgerIconSVG; // Initial icon

  // 3. Append Theme Button and Hamburger to Wrapper
  headerControls.appendChild(themeBtn); // Move existing theme button
  headerControls.appendChild(menuToggleBtn);

  // 4. Append Wrapper to Nav Container
  navContainer.appendChild(headerControls);

  // 5. Create Mobile Menu Container (as before)
  const mobileMenuContainer = document.createElement("div");
  mobileMenuContainer.id = "mobile-menu";
  mobileMenuContainer.className = "mobile-nav";
  const mobileNavUl = desktopNavUl.cloneNode(true);
  mobileMenuContainer.appendChild(mobileNavUl);
  headerNav.appendChild(mobileMenuContainer);

  // 6. Add Toggle Logic (with icon change)
  menuToggleBtn.addEventListener("click", () => {
    const isExpanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
    mobileMenuContainer.classList.toggle("open");
    menuToggleBtn.setAttribute("aria-expanded", !isExpanded);
    // Change icon based on new state
    menuToggleBtn.innerHTML = !isExpanded ? closeIconSVG : hamburgerIconSVG;
  });
}
