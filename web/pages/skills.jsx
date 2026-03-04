import Head from "next/head";
import Link from "next/link";

const skillGroups = [
  {
    title: "Full Stack Engineering",
    items: [
      "Next.js / React architecture",
      "API design and integration",
      "Database modeling and data flow design",
      "Frontend performance and accessibility",
      "CI/CD and deployment workflows",
    ],
  },
  {
    title: "Cyber Security",
    items: [
      "Threat modeling and attack-surface review",
      "Secure authentication and secrets handling",
      "Network hardening and endpoint controls",
      "Security headers, CSP, and policy enforcement",
      "Incident response playbooks and mitigation",
    ],
  },
  {
    title: "Digital Engineering",
    items: [
      "Automation pipelines (Python + Bash + FFmpeg)",
      "Motion systems for technical storytelling",
      "Linux-first build and runtime environments",
      "System-level debugging and optimization",
      "End-to-end product delivery as a solo builder",
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>somengineer | Skills</title>
        <meta
          name="description"
          content="Skills and capabilities of somengineer across Full Stack Development, Cyber Security, and Digital Engineering."
        />
      </Head>

      <main className="site-shell">
        <section className="section-dark">
          <div className="layout">
            <header className="top-nav">
              <p className="mono">somengineer / skills</p>
              <div className="top-nav-links">
                <Link className="inline-link" href="/">
                  portfolio
                </Link>
                <a className="inline-link" href="mailto:hello@somengineer.dev">
                  contact
                </a>
              </div>
            </header>

            <div className="section-heading">
              <p className="mono muted">SKILLS PAGE</p>
              <h1 className="skills-headline">What I Build, Secure, and Scale.</h1>
              <p className="skills-intro">
                This page summarizes practical capabilities used to design, ship, and protect
                production systems.
              </p>
            </div>
          </div>
        </section>

        <section className="section-light">
          <div className="layout">
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article key={group.title} className="skills-card">
                  <h2>{group.title}</h2>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
