import CodeIcon from "@material-ui/icons/Code";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { about } from "../../portfolio";
import resume from "../../assets/mladen-savic-cv.pdf";
import "./About.css";

const About = () => {
  const { name, role, description, social } = about;

  return (
    <div className="about center">
      {name && (
        <h1>
          Hi, I am <span className="about__name">{name}.</span>
        </h1>
      )}

      {role && <h2 className="about__role">{role}.</h2>}
      <p className="about__desc">{description && description}</p>

      <div className="about__contact center">
        {resume && (
          <a href={resume} target="_blank" rel="noreferrer">
            <span type="button" className="btn btn--outline">
              Resume
            </span>
          </a>
        )}

        {social && (
          <>
            {social.gitlab && (
              <a
                target="_blank"
                rel="noreferrer"
                href={social.gitlab}
                aria-label="gitlab"
                className="link link--icon"
              >
                <CodeIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                target="_blank"
                rel="noreferrer"
                href={social.linkedin}
                aria-label="linkedin"
                className="link link--icon"
              >
                <LinkedInIcon />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default About;
