import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Code2, Github, Linkedin, Mail, Menu, X,
  Terminal as TerminalIcon, Sparkles, Cpu, Database, Braces, ExternalLink,
  GraduationCap, Layers3, ChevronRight, Briefcase
} from "lucide-react";
import { profile, skills, projects, otherProjects , internships } from "./data";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

function SocialLink({ href, label, icon: Icon }) {
  if (!href) return null;
  return <a className="icon-link" href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18} /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["About", "#about"], ["Skills", "#skills"], ["Experience", "#experience"], ["Projects", "#projects"], ["Contact", "#contact"]];
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="Nitin Bhoria home"><span className="brand-mark">N.</span><span>NITIN<span className="brand-muted">.DEV</span></span></a>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
      {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let's connect <ArrowUpRight size={14} /></a>
    </nav>
  </header>;
}

function SectionHeading({ eyebrow, title, text }) {
  return <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
    <span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}
  </motion.div>;
}

const commandHelp = [
  ["help", "Show all available commands"],
  ["about", "A quick introduction"],
  ["skills", "List the technologies I work with"],
  ["projects", "Explore my projects"],
  ["superpower", "My developer mindset"],
  ["contact", "Show available contact links"],
  ["clear", "Clear the terminal"]
];

function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { kind: "system", text: "Welcome to Nitin's Developer Command Center." },
    { kind: "system", text: 'Type "help" to explore available commands.' }
  ]);
  const commands = useMemo(() => ({
    help: () => commandHelp.map(([cmd, desc]) => `${cmd.padEnd(12)} ${desc}`),
    about: () => [`${profile.name} — ${profile.role}.`, profile.intro],
    skills: () => [skills.join("  ·  ")],
    projects: () => [...projects, ...otherProjects].map((p, i) => `${i + 1}. ${p.name} — ${p.type}`),
    superpower: () => ["Turning a problem into small, understandable steps — then building and improving the solution."],
    contact: () => {
      const available = [["GitHub", profile.github], ["LinkedIn", profile.linkedin], ["Email", profile.email]].filter(([, value]) => value);
      return available.length ? available.map(([label, value]) => `${label}: ${value}`) : ["Contact links have not been configured yet."];
    }
  }), []);
  function runCommand(event) {
    event.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    if (cmd === "clear") { setHistory([]); setInput(""); return; }
    const output = commands[cmd] ? commands[cmd]() : [`Command not found: ${raw}. Type "help" to see available commands.`];
    setHistory(prev => [...prev, { kind: "input", text: raw }, ...output.map(text => ({ kind: "output", text }))]);
    setInput("");
  }
  return <div className="terminal-shell">
    <div className="terminal-top"><div className="window-dots"><i /><i /><i /></div><div className="terminal-title"><TerminalIcon size={14} /> developer-console</div><span className="terminal-live">● interactive</span></div>
    <div className="terminal-body" aria-label="Interactive developer terminal">
      <div className="terminal-output" aria-live="polite">
        {history.map((item, i) => <div className={`terminal-line ${item.kind}`} key={`${i}-${item.text}`}>
          {item.kind === "input" && <span className="prompt">visitor@nitin:~$ </span>}{item.text}
        </div>)}
      </div>
      <form className="terminal-input-row" onSubmit={runCommand}>
        <label className="prompt" htmlFor="terminal-input">visitor@nitin:~$</label>
        <input id="terminal-input" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" spellCheck="false" aria-label="Enter a terminal command" placeholder="type a command..." />
        <button type="submit" aria-label="Run command"><ChevronRight size={18} /></button>
      </form>
    </div>
    <div className="terminal-footer"><span>LOCAL SESSION</span><span>Try <kbd>help</kbd> to get started</span></div>
  </div>;
}

function App() {
  const allProjects = [...projects, ...otherProjects];
  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <Header />
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="availability"><span className="availability-dot" /> OPEN TO BUILDING WHAT'S NEXT</div>
            <p className="hero-kicker">HELLO, WORLD. I'M</p>
            {/* <h1>Nitin <span>Bhoria</span><b className="hero-period">.</b></h1> */}
<h1 className="hero-name">
  <img
    src="/images/nitin.png"
    alt=""
    aria-hidden="true"
    className="hero-background-image"
  />
  Nitin <span>Bhoria</span>
  <b className="hero-period">.</b>
</h1>    
  <h2 className="hero-role">MERN Stack <span>Developer</span></h2>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore projects <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <ArrowDown size={16} /></a>
            </div>
            <div className="hero-socials">
              <SocialLink href={profile.github} label="GitHub" icon={Github} />
              <SocialLink href={profile.linkedin} label="LinkedIn" icon={Linkedin} />
              <SocialLink href={profile.email ? `mailto:${profile.email}` : ""} label="Email" icon={Mail} />
              <span className="social-caption">Find me around the web</span>
            </div>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .15 }}>
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="code-card">
            <div className="code-card-head"><span>developer.js</span><span className="code-dots">•••</span></div>
            <div className="code-content">
              <p><span className="code-purple">const</span> developer = {'{'}</p>
              <p className="indent"><span className="code-cyan">name</span>: <span className="code-green">'Nitin Bhoria'</span>,</p>
              <p className="indent"><span className="code-cyan">role</span>: <span className="code-green">'MERN Developer'</span>,</p>
              <p className="indent"><span className="code-cyan">curious</span>: <span className="code-orange">true</span>,</p>
              <p className="indent"><span className="code-cyan">building</span>: [</p>
              <p className="indent2"><span className="code-green">'web experiences'</span>,</p>
              <p className="indent2"><span className="code-green">'full-stack apps'</span></p>
              <p className="indent">]</p><p>{'}'};</p>
              <p className="code-comment">// always learning, always building</p>
            </div>
            <div className="code-card-bottom"><span><span className="mini-dot" /> JavaScript</span><span>UTF-8</span></div>
          </div>
          <div className="float-chip chip-react"><Code2 size={15} /> React</div>
          <div className="float-chip chip-node"><Braces size={15} /> Node.js</div>
          <div className="hero-index">01 <span>/ 05</span></div>
        </motion.div>
        <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="section-wrap about-section" id="about">
        <SectionHeading eyebrow="01 — THE PERSON BEHIND THE CODE" title={<>A little about <span>me.</span></>} />
        <div className="about-grid">
          <motion.div className="about-lead" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="about-icon"><GraduationCap size={25} /></div>
            <h3>Learning, building, and getting better every day.</h3>
            <p>I'm on a B.Tech Computer Science journey, with an interest in building useful web experiences and understanding how products work from frontend to backend.</p>
          </motion.div>
          <motion.div className="about-details" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="detail-row"><span className="detail-number">01</span><div><h4>Full-stack curiosity</h4><p>Exploring the connection between clean interfaces, APIs, and data.</p></div><Layers3 /></div>
            <div className="detail-row"><span className="detail-number">02</span><div><h4>Practical learning</h4><p>Learning by building projects and improving them through iteration.</p></div><Code2 /></div>
           
            <div className="detail-row"><span className="detail-number">03</span><div><h4>Internship experience</h4><p>Hands-on industry experience through internships and real projects.</p></div><Sparkles /></div>
          </motion.div>
        </div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <SectionHeading eyebrow="02 — MY TOOLKIT" title={<>Tools of the <span>trade.</span></>} text="Technologies I use and continue to learn." />
        <div className="skills-grid">
          {skills.map((skill, i) => <motion.div className="skill-card" key={skill} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .035 }}><span className="skill-index">{String(i + 1).padStart(2, "0")}</span><span>{skill}</span><ArrowUpRight size={15} /></motion.div>)}
        </div>
        <div className="stack-note"><Cpu size={17} /><span>Frontend</span><i /> <span>Backend</span><i /> <span>Database</span><i /> <span>Programming</span></div>
      </section>
      {internships.length > 0 && (
  <section className="section-wrap experience-section" id="experience">
    <SectionHeading eyebrow="03 — EXPERIENCE" title={<>Where I've <span>worked.</span></>} text="Internships and hands-on industry experience." />
    <div className="timeline">
      {internships.map((item, i) => (
        <motion.article className="timeline-item" key={`${item.company}-${i}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
          <div className="timeline-icon"><Briefcase size={18} /></div>
          <div className="timeline-card">
            <div className="timeline-meta"><span>{item.duration}</span>{item.location && <span>{item.location}</span>}</div>
            <h3>{item.role}</h3>
            <p className="timeline-company">{item.company}</p>
            <ul className="timeline-points">
              {item.points.map((point, j) => <li key={j}>{point}</li>)}
            </ul>
            {item.stack?.length > 0 && (
              <div className="timeline-stack">{item.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  </section>
)}

      <section className="section-wrap projects-section" id="projects">
  <SectionHeading eyebrow="03 — SELECTED WORK" title={<>Things I've <span>built.</span></>} text="A selection of personal projects and hands-on practice." />
  <div className="projects-grid">
    {allProjects.map((project, i) => (
      <motion.article className="project-card" key={project.name} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
        <div className={`project-art project-art-${i % 2}`}>
          <div className="project-art-grid" />
          <div className="project-art-icon">{i === 0 ? <Database size={38} /> : <Sparkles size={38} />}</div>
          <span className="project-number">0{i + 1}</span>
        </div>
        <div className="project-info">
          <div className="project-meta"><span>{project.type}</span><span>PERSONAL PROJECT</span></div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-bottom">
            <span className="project-stack">MERN STACK</span>
            <div className="hero-socials" style={{ margin: 0, gap: "8px" }}>
              {project.githubLink && (
                <a className="icon-link" href={project.githubLink} target="_blank" rel="noreferrer" aria-label="View source code">
                  <Github size={16} />
                </a>
              )}
              {project.deployedLink && (
                <a className="icon-link" href={project.deployedLink} target="_blank" rel="noreferrer" aria-label="View live project">
                  <ExternalLink size={16} />
                </a>
              )}
              {!project.githubLink && !project.deployedLink && (
                <span className="project-no-link">Internal project</span>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    ))}
  </div>
</section>

      <section className="section-wrap command-section" id="command">
        <div className="command-intro"><span className="eyebrow">04 — A LITTLE SOMETHING EXTRA</span><h2>Enter the <span>command center.</span></h2><p>A small interactive terminal. Ask it about me, my skills, and the projects I've built.</p><div className="terminal-hint"><span className="hint-pulse" /> <TerminalIcon size={17} /> <span>Curious? Type <kbd>help</kbd> in the terminal to discover commands.</span></div></div>
        <Terminal />
      </section>

      <section className="section-wrap contact-section" id="contact">
        <SectionHeading eyebrow="05 — YOUR TURN" title={<>Let's make something <span>useful.</span></>} text="Have an idea, a project, or a reason to connect? Reach out through a profile link." />
        <div className="contact-panel">
          <div><span className="contact-label">NEXT STEP</span><h3>Good things start<br />with a conversation.</h3></div>
          <div className="contact-links">
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub <ArrowUpRight /></a>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a>}
            {profile.email && <a href={`mailto:${profile.email}`}><Mail /> Email <ArrowUpRight /></a>}
            {!profile.github && !profile.linkedin && !profile.email && <p className="contact-missing">Public contact links are not configured yet.</p>}
            {profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer"><ExternalLink /> Resume <ArrowUpRight /></a>}
          </div>
        </div>
      </section>
    </main>
    <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">N.</span><span>NITIN<span className="brand-muted">.DEV</span></span></a><span>Designed & built with curiosity.</span><a href="#home" className="back-top">BACK TO TOP ↑</a></footer>
  </div>;
}

export default App;