# Mladen Savic - Frontend Developer Portfolio

This repository contains the source code for my personal portfolio website, designed to showcase my skills, projects, and professional experience. It is built entirely using fundamental web technologies: HTML, CSS, and JavaScript.

## Technology Deep Dive

This project emphasizes a solid understanding and application of core web development principles:

### HTML: Semantic Structure

- The site structure relies heavily on semantic HTML5 elements like `<header>`, `<nav>`, `<section>`, `<article>`, and `<footer>`. This ensures a logical document outline, improving accessibility for screen readers and providing SEO benefits.
- Content sections like individual job entries (`<article>`) and project details are semantically marked up.
- Accessibility is enhanced through the use of `aria-*` attributes (e.g., `aria-expanded` for the mobile menu toggle, `aria-label` for icon buttons) and descriptive `alt` text for images.

### CSS: Styling, Layout & Responsiveness

- **Theming:** A switchable light/dark theme is implemented efficiently using CSS Custom Properties (variables). Toggling a class on the `<body>` element changes the variable values, instantly restyling the entire site.
- **Layout:** Modern CSS layout techniques are employed:
  - Flexbox is used extensively for arranging components like navigation items, hero section links, the project display area (carousel + buttons), the work experience timeline alignment, and skill tags.
  - The work experience timeline utilizes pseudo-elements (`::before`) for the connecting line and timeline dots, positioned relative to the job entry containers.
- **Responsiveness:** Media queries (`@media (max-width: 767px)`) adapt the layout for smaller screens, including:
  - Collapsing the header navigation into a toggleable mobile menu.
  - Adjusting grid/flex layouts (e.g., project image/stack becomes vertical).
  - Optimizing font sizes and spacing for readability.
  - Repositioning elements like the carousel navigation buttons.
- **Visual Feedback:** Transitions are applied to various elements (buttons, links, skill tags, job entries) to provide smooth visual feedback on hover and focus states.

### JavaScript: Interactivity & Dynamic Content

- **Dynamic Rendering:** Portfolio content (projects, work experience, skills) is not hardcoded in HTML. Instead, JavaScript fetches data from a central `data/portfolio.json` file using the `fetch` API.
- **DOM Manipulation:** Upon fetching the data, JS dynamically creates and injects the necessary HTML elements into the DOM to display the content (e.g., rendering project slides, job entries, skill tags).
- **Event Handling:** Interactivity is driven by numerous event listeners:
  - **Theme Toggle:** Switches the theme class on the body and updates local storage.
  - **Mobile Menu:** Handles toggling visibility, icon changes, closing on link clicks, and closing on clicks outside the menu area.
  - **Project Carousel:** Manages slide changes via button clicks and implements manual drag/swipe functionality by tracking mouse/touch events (`mousedown`/`touchstart`, `mousemove`/`touchmove`, `mouseup`/`touchend`/`mouseleave`).
  - **Scroll-to-Top:** Controls the visibility of the button based on scroll position and handles the smooth scroll animation on click.

## Data Source

The content for the projects, work experience, skills, and personal info is managed in `data/portfolio.json`. This separation makes it easy to update portfolio details without needing to modify the HTML or JavaScript files directly.

## Running Locally

No build process is required. Simply open the `index.html` file in your web browser to view the portfolio.

## Project Structure

```
/
├── css/
│   └── style.css         # Main stylesheet
├── data/
│   └── portfolio.json    # Portfolio content
├── js/
│   └── main.js           # Main JavaScript file
├── assets/
│   └── sprite.svg        # SVG icons
│   └── ...               # Project images etc.
├── index.html            # Main HTML file
└── README.md             # This file
```
