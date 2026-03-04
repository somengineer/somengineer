import Head from "next/head";
import { useEffect, useRef } from "react";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://somengineer.dev";

const capabilityRows = [
  "Full Stack Developer",
  "Cyber Security Engineer",
  "Digital Engineer",
  "AI Systems Builder",
  "Network Security",
  "Automation & CI/CD",
  "Threat Modeling",
  "Motion & UX Engineering",
];

const startupCards = [
  {
    name: "Adaptive Learning SaaS",
    status: "In Production",
    body:
      "Personalized learning infrastructure designed for measurable outcomes with secure-by-default architecture.",
    stack: "Next.js · Python · Postgres · Analytics",
  },
  {
    name: "Cyber-Cognitive Platform",
    status: "In Production",
    body:
      "Agentic security workflows that combine autonomous reasoning, networking controls, and continuous hardening.",
    stack: "Python · LLM Agents · Security Tooling · Linux",
  },
];

const highlights = [
  { label: "Experience Arc", value: "2019 → Present" },
  { label: "Primary Focus", value: "Security + Product Engineering" },
  { label: "Operating Model", value: "Solo Founder / Systems Builder" },
];

export default function HomePage() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const moveCursor = (event) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll("[data-reveal]");
    if (!revealNodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(max-width: 960px)").matches) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let animationFrame = 0;
    const pointer = { x: -9999, y: -9999 };
    const particles = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = Math.min(window.innerHeight, 980);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 74; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * Math.min(window.innerHeight, 980),
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: Math.random() * 1.4 + 0.8,
        });
      }
    };

    const step = () => {
      const width = window.innerWidth;
      const height = Math.min(window.innerHeight, 980);
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const pointerDistance = Math.sqrt(dx * dx + dy * dy);
        if (pointerDistance < 120) {
          p.x += dx / 18;
          p.y += dy / 18;
        }

        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 215, 147, 0.7)";
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const nx = p.x - q.x;
          const ny = p.y - q.y;
          const dist = Math.sqrt(nx * nx + ny * ny);
          if (dist < 120) {
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.strokeStyle = `rgba(131, 218, 255, ${0.22 - dist / 700})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(step);
    };

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    resize();
    seedParticles();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <Head>
        <title>somengineer | Full Stack · Cyber Security · Digital Engineering</title>
        <meta
          name="description"
          content="Animation-rich personal portfolio for somengineer. Full Stack Developer, Cyber Security, and Digital Engineer."
        />
        <meta property="og:title" content="somengineer" />
        <meta
          property="og:description"
          content="Cinematic personal portfolio focused on full stack systems, cybersecurity, and digital engineering."
        />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="cursor-orb" ref={cursorRef} aria-hidden="true" />
      <main className="site-shell">
        <section className="hero" id="top">
          <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
          <div className="layout">
            <header className="top-nav reveal" data-reveal>
              <p className="mono">somengineer / portfolio</p>
              <div className="top-nav-links">
                <Link href="/skills" className="inline-link">
                  skills
                </Link>
                <a href="#contact" className="inline-link">
                  contact
                </a>
              </div>
            </header>

            <div className="hero-grid">
              <article className="hero-copy reveal" data-reveal>
                <p className="mono muted">ENGINEER · FOUNDER · BUILDER</p>
                <h1>
                  FULL STACK
                  <span>CYBER SECURITY</span>
                  <span>DIGITAL ENGINEER</span>
                </h1>
                <p className="lead">
                  I design and ship production-grade systems where resilient architecture, security,
                  and product experience work as one.
                </p>
                <div className="hero-actions">
                  <a href="#projects" className="btn btn-solid">
                    View Projects
                  </a>
                  <a href="#capabilities" className="btn btn-ghost">
                    Capability Matrix
                  </a>
                </div>
              </article>

              <aside className="hero-panel reveal" data-reveal>
                <p className="mono panel-title">Identity</p>
                <p className="panel-role">BEng ECE · MSc Cybersecurity & Networking</p>
                <ul className="stat-list">
                  {highlights.map((item) => (
                    <li key={item.label}>
                      <span className="mono muted">{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="ticker-wrap">
          <div className="ticker-track">
            {capabilityRows.concat(capabilityRows).map((text, index) => (
              <span key={`${text}-${index}`}>{text}</span>
            ))}
          </div>
        </section>

        <section className="section-light" id="about">
          <div className="layout section-grid">
            <article className="reveal" data-reveal>
              <p className="mono muted-dark">ABOUT</p>
              <h2>Cinematic Engineering, Practical Delivery.</h2>
              <p>
                This portfolio is intentionally motion-led: editorial typography, dark/light contrast,
                and layered transitions that keep technical information visually engaging while staying
                clear and performant.
              </p>
              <p>
                Core focus areas are modern full stack product delivery, cybersecurity architecture, and
                digital systems engineering for startup execution.
              </p>
            </article>

            <article className="scene-block reveal" data-reveal>
              <p className="mono muted-dark">SCENE NODE</p>
              <div className="scene-placeholder">
                <p className="mono">Interactive 3D slot</p>
                <p>
                  Drop Spline scene URL here when ready. The layout is already optimized for an embedded
                  3D interaction panel.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section-dark" id="capabilities">
          <div className="layout">
            <div className="section-heading reveal" data-reveal>
              <p className="mono muted">CAPABILITY MATRIX</p>
              <h2>Built for product velocity and system integrity.</h2>
            </div>
            <div className="chips reveal" data-reveal>
              {capabilityRows.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-light" id="projects">
          <div className="layout">
            <div className="section-heading reveal" data-reveal>
              <p className="mono muted-dark">CURRENT BUILDS</p>
              <h2>Production startups with security-first engineering.</h2>
            </div>
            <div className="project-grid">
              {startupCards.map((card) => (
                <article key={card.name} className="project-card reveal" data-reveal>
                  <p className="mono project-status">{card.status}</p>
                  <h3>{card.name}</h3>
                  <p>{card.body}</p>
                  <p className="mono muted-dark">{card.stack}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark contact" id="contact">
          <div className="layout contact-wrap reveal" data-reveal>
            <p className="mono muted">OPEN FOR COLLABORATION</p>
            <h2>Need a builder who ships and secures systems end-to-end?</h2>
            <a className="btn btn-solid" href="mailto:hello@somengineer.dev">
              hello@somengineer.dev
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <div className="layout footer-wrap">
            <p className="mono">somengineer</p>
            <p>© {new Date().getFullYear()} somengineer · MIT License</p>
          </div>
        </footer>
      </main>
    </>
  );
}
