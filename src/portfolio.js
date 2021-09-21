const header = {
    homepage: 'https://github.com/mladenqdev?tab=repositories',
    title: 'MS.',
};

const about = {
    name: 'Mladen Savic',
    role: 'Front End Developer',
    description:
        'Professor of English Language and Literature turned Front-end Developer. Quick learner. Highly driven and motivated. Continue scrolling, if you want to find out how a couple of mini projects, that were created for the sole purpose of self-promotion, have totally changed the world!',
    social: {
        linkedin: 'https://www.linkedin.com/in/savicmladen/',
        github: 'https://github.com/mladenqdev?tab=repositories',
    },
};

const projects = [
    {
        name: 'dobrokRatingz',
        description:
            "A small web app that helps me keep track of how I rate the meals I order from the company's kitchen.",
        stack: [
            'React.js',
            'Context',
            'Framer Motion',
            'Firestore Database',
            'Firebase Auth',
        ],
        sourceCode: 'https://github.com/mladenqdev/dobrok-ratingz',
        livePreview: 'https://dobrok-ratingz.vercel.app/',
    },
    {
        name: 'moviez',
        description:
            'A place to share your favorite or your least favorite movie lists, regardless of how controversial they might be!',
        stack: ['Vue.js', 'RESTful API', 'Firestore Database', 'Firebase Auth'],
        sourceCode: 'https://github.com/mladenqdev/moviez',
        livePreview: 'https://moviez-5be36.firebaseapp.com/',
    },
    {
        name: 'work-timer',
        description:
            'A simple time management web app, based on the popular pomodoro technique.',
        stack: ['React.js', 'Context', 'React'],
        sourceCode: 'https://github.com/mladenqdev/work-timer',
        livePreview: 'https://work-timer-lime.vercel.app/',
    },
];

const skills = [
    'HTML',
    'CSS',
    'Sass',
    'JavaScript',
    'Handlebars.js',
    'React.js',
    'Redux',
    'Context',
    'Vue.js',
    'Material UI',
    'Git',
    'Adobe Photoshop',
];

const contact = {
    email: 'mladjos@msn.com',
};

export { header, about, projects, skills, contact };
