
import React, { useState } from 'react';
import './css/portfolio.css';
import ResumePDF from './assets/vivek.chauhan.resume.pdf'; 
import profilePhoto from './assets/profile-photo.png';

const Portfolio = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const projects = [
    {
      id: 1,
      title: "E-Commerce App",
      description: "A full-featured React e-commerce app using Redux and Firebase.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio built with React and Bootstrap.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
    {
      id: 3,
      title: "Weather App",
      description: "Weather forecasting app using React and OpenWeather API.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    },
    {
      id: 4,
      title: "Task Manager",
      description: "Task management app with drag-and-drop functionality using React DnD.",
      image: "https://via.placeholder.com/300x200",
      link: "#"
    }
  ];

  const skills = [
    { name: 'Reactjs', level: 75 },
    { name: 'Redux', level: 70 },
    { name: 'JavaScript', level: 85 },
    { name: 'Context API', level:75 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 90 },
    { name: 'Git', level: 70 },
    { name: 'Firebase', level: 60 },
    { name: 'MUI', level: 80 },
    { name: 'Bootstrap', level: 85 }
  ];

  const experiences = [
    {
      year: "July 2024 - Present",
      position: "Associate Software Engineer",
      company: "Ethics Infotech LLP",
      description: "As an Associate Software Engineer at Ethics Infotech, I developed responsive and high-performing web applications using React.js, HTML5, CSS3, JavaScript (ES6), and Bootstrap, ensuring seamless user experiences and optimized performance",
      technologies: ["React.js", "Javascript", "Redux Toolkit", "Html5", "Css3","context API", "git","bootstrap", "Material-UI" ],
      icon: "bi-briefcase-fill"
    },
    {
      year: "Jan 2024 - July 2024",
      position: "Trainee Software Engineer",
      company: "Ethics Infotech LLP",
      description: "Developed and maintained multiple client-facing applications. Improved performance by 40% through code splitting and lazy loading.",
      technologies: ["React.js", "javascript", "css", "html","git"],
      icon: "bi-code-slash"
    },
    {
      year: "Dec 2023 - Jan 2024",
      position: "Intern",
      company: "Ethics Infotech LLP",
      description: "Built responsive web applications from Figma designs. Collaborated with backend team to integrate RESTful APIs.",
      technologies: ["JavaScript", "React.js", "Bootstrap", "Html","Css"],
      icon: "bi-laptop"
    },
  ];

const getBadgeColor = (skillName) => {
  const colors = {
    Reactjs: 'bg-info text-dark',          
    Redux: 'bg-secondary text-light',     
    JavaScript: 'bg-warning text-dark',    
    'Context API': 'bg-primary text-light',
    HTML5: 'bg-danger text-light',         
    CSS3: 'bg-success text-light',         
    Git: 'bg-dark text-light',             
    Firebase: 'bg-warning text-dark',      
    MUI: 'bg-info text-dark',              
    Bootstrap: 'bg-purple text-light',     
    Default: 'bg-dark text-light'          
  };

  return colors[skillName] || colors.Default;
};




  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="portfolio-wrapper">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 fw-bold mb-3 animate-fade-in">Vivek Chauhan</h1>
              <h3 className="mb-4">Frontend Developer | React Specialist</h3>
              <p className="lead mb-4">Building modern, responsive web applications with React & Redux</p>
              <div className="hero-buttons">
                <a href={ResumePDF} download className="btn btn-light btn-lg me-3 hover-lift">
                  <i class="bi bi-download" style={{color:"#000"}}></i>Download Resume
                </a>
                <a href="#contact" className="btn btn-outline-light btn-lg hover-lift">
                  <i className="bi bi-envelope me-2"></i>Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">About Me</h2>
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img 
                src={profilePhoto} 
                alt="Profile" 
                className="rounded-circle img-fluid profile-img shadow"
              />
            </div>
            <div className="col-md-8">
              <h3 className="mb-3">Hello! I'm Vivek Chauhan</h3>
              <p className="lead">
                I'm a passionate Frontend Developer with 2+ years of experience specializing in React and modern JavaScript frameworks.
              </p>
              <p>
                I love creating intuitive, dynamic user experiences that solve real-world problems. My expertise includes building scalable web applications, 
                implementing state management with Redux, and ensuring responsive design across all devices. I'm constantly learning and staying 
                up-to-date with the latest web technologies and best practices.
              </p>
              <p>
                When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, or exploring new technologies 
                that push the boundaries of web development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">Technical Skills</h2>
          <div className="row">
            {/* {skills.map((skill, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="skill-item">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold badge bg-primary">{skill.name}</span>
                    <span className="text-muted">{skill.level}%</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar progress-bar-animated"
                      role="progressbar"
                      style={{ width: `${skill.level}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            ))} */}
            {skills.map((skill, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="skill-item">
                  <div className="d-flex justify-content-between mb-2">
                    <span className={`fw-bold badge ${getBadgeColor(skill.name)}`}>
                      {skill.name}
                    </span>
                    <span className="text-muted">{skill.level}%</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar progress-bar-animated"
                      role="progressbar"
                      style={{ width: `${skill.level}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="experience-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">Professional Experience</h2>
          <div className="row">
            <div className="col-lg-12">
              <div className="timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                    <div className="timeline-badge">
                      <i className={`bi ${exp.icon}`}></i>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h4 className="timeline-title">{exp.position}</h4>
                        <h5 className="company-name text-primary">{exp.company}</h5>
                        <p className="text-muted">
                          <i className="bi bi-calendar3 me-2"></i>
                          <small>{exp.year}</small>
                        </p>
                      </div>
                      <div className="timeline-body">
                        <p>{exp.description}</p>
                        <div className="tech-stack mt-3">
                          {exp.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="badge bg-primary me-2 mb-2">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Alternative Card Layout for Mobile */}
          <div className="row d-lg-none">
            {experiences.map((exp, index) => (
              <div key={index} className="col-12 mb-4">
                <div className="card experience-card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="experience-icon-wrapper me-3">
                        <i className={`bi ${exp.icon} fs-3 text-primary`}></i>
                      </div>
                      <div>
                        <h5 className="card-title mb-1">{exp.position}</h5>
                        <h6 className="text-primary mb-0">{exp.company}</h6>
                      </div>
                    </div>
                    <p className="text-muted mb-2">
                      <i className="bi bi-calendar3 me-2"></i>{exp.year}
                    </p>
                    <p className="card-text">{exp.description}</p>
                    <div className="tech-stack">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="badge bg-primary me-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">Featured Projects</h2>
          <div className="row">
            {projects.map(project => (
              <div key={project.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 project-card shadow-sm">
                  <img 
                    src={project.image} 
                    className="card-img-top project-img" 
                    alt={project.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text flex-grow-1">{project.description}</p>
                    <div className="mt-auto">
                      <a href={project.link} target="_blank" className="btn btn-primary btn-sm me-2 hover-lift">
                        <i className="bi bi-eye me-1"></i>Live Demo
                      </a>
                      <a href={project.link} target="_blank" className="btn btn-outline-primary btn-sm hover-lift">
                        <i className="bi bi-github me-1"></i>Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 section-title">Get In Touch</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="contact-info">
                <h4 className="mb-4">Contact Information</h4>
                <div className="mb-3">
                  <i className="bi bi-envelope-fill text-primary me-3"></i>
                  <span>vivuchauhan333@gmail.com</span>
                </div>
                <div className="mb-3">
                  <i className="bi bi-telephone-fill text-primary me-3"></i>
                  <span>+91-9410709044</span>
                </div>
                <div className="mb-3">
                  <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                  <span>Dehradun, Uttarakhand, India</span>
                </div>
                <div className="social-links mt-4">
                  <a href="https://www.linkedin.com/in/mrvivekchauhan/" target="_blank" className="btn btn-outline-primary btn-sm me-2 hover-lift">
                    <i className="bi bi-linkedin"></i> LinkedIn
                  </a>
                  <a href="https://github.com/vivuchauhan" target="_blank" className="btn btn-outline-dark btn-sm me-2 hover-lift">
                    <i className="bi bi-github"></i> GitHub
                  </a>
                  {/* <a href="#" className="btn btn-outline-info btn-sm hover-lift">
                    <i className="bi bi-twitter"></i> Twitter
                  </a> */}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 hover-lift">
                  <i className="bi bi-send me-2"></i>Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;