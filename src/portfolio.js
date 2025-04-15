const header = {
  homepage: "https://gitlab.com/mladenqdev",
  title: "MS.",
};

const about = {
  name: "Mladen Savic",
  role: "Front End Developer",
  description:
    "Cinephile, book lover, chess enthusiast, and always chasing for those green arrows in Fantasy Premier League! Continue scrolling, if you want to find out how a couple of mini projects, that were created for the sole purpose of self-promotion, have totally changed the world!",
  social: {
    linkedin: "https://www.linkedin.com/in/savicmladen/",
    gitlab: "https://gitlab.com/mladenqdev",
  },
};

const projects = [
  {
    name: "dobrokRatingz",
    description:
      "A small web app that helps me keep track of how I rate the meals I order from the company's kitchen.",
    stack: [
      "React.js",
      "Context",
      "Framer Motion",
      "Firestore Database",
      "Firebase Auth",
    ],
    sourceCode: "https://github.com/mladenqdev/dobrok-ratingz",
    livePreview: "https://dobrok-ratingz.vercel.app/",
  },
  {
    name: "moviez",
    description:
      "A place to share your favorite or your least favorite movie lists, regardless of how controversial they might be!",
    stack: ["Vue.js", "RESTful API", "Firestore Database", "Firebase Auth"],
    sourceCode: "https://github.com/mladenqdev/moviez",
    livePreview: "https://moviez-5be36.firebaseapp.com/",
  },
  {
    name: "movie memory game",
    description:
      "A simple memory game for cinephiles, to practice memory, concentration and perhaps find a hidden gem to watch!",
    stack: ["React.js"],
    sourceCode: "https://github.com/mladenqdev/movie-memory",
    livePreview: "https://movie-memory.vercel.app//",
  },
  {
    name: "recipez",
    description:
      "Write down your favorite recipes, or maybe a recipe someone else shared will catch your eye!",
    stack: ["React.js", "React Context", "Firestore Database"],
    sourceCode: "https://github.com/mladenqdev/recipez",
    livePreview: "https://recipez-two.vercel.app/",
  },
];

const skills = [
  "HTML",
  "CSS",
  "Sass",
  "JavaScript",
  "Handlebars.js",
  "React.js",
  "React Context",
  "Vue.js",
  "Git",
  "Adobe Photoshop",
];

const contact = {
  email: "mladjoqs@gmail.com",
};

export { header, about, projects, skills, contact };
