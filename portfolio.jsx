/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

const D = window.PORTFOLIO;

/* ---------- Hidden Gems ---------- */
const GEMS = [
  { id: "konami", title: "Friendly Greeting", hint: "Just say hi to the page (with the keyboard)." },
  { id: "avatar", title: "Wake the Sprite", hint: "Pixel people respond to attention. How much?" },
  { id: "sudo", title: "Privileged Access", hint: "A four-letter command unlocks the prompt." },
  { id: "console", title: "Inspector Gadget", hint: "Curious devs read between the elements." },
  { id: "live", title: "Off the Record", hint: "The little green light isn't just decoration." }
];

function useGems() {
  const KEY = "vinay-portfolio-gems-v1";
  const [found, setFound] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  });
  const [toast, setToast] = useState(null);

  const unlock = (id) => {
    setFound(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { }
      const gem = GEMS.find(g => g.id === id);
      setToast({ ...gem, n: next.length });
      setTimeout(() => setToast(null), 3200);
      return next;
    });
  };
  const reset = () => {
    try { localStorage.removeItem(KEY); } catch { }
    setFound([]);
  };

  return { found, unlock, toast, reset };
}

function GemToast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`gem-toast show`}>
      <div className="badge">★</div>
      <div>
        <span className="label">Hidden gem · {toast.n} / {GEMS.length}</span>
        <span className="name">{toast.title}</span>
      </div>
    </div>
  );
}

function GemRain() {
  const chars = ["♥", "✦", "★", "◆", "▲"];
  const drops = Array.from({ length: 28 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 2 + Math.random() * 2,
    char: chars[Math.floor(Math.random() * chars.length)]
  }));
  return (
    <div className="gem-rain">
      {drops.map((d, i) => (
        <span key={i} className="pix" style={{
          left: `${d.left}%`,
          animationDuration: `${d.dur}s`,
          animationDelay: `${d.delay}s`
        }}>{d.char}</span>
      ))}
    </div>
  );
}

function GemTerminal({ open, onClose, lines }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!open) { setShown(""); return; }
    let i = 0;
    const text = lines.join("\n");
    setShown("");
    const t = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [open, lines]);
  return (
    <div className={`gem-term ${open ? "show" : ""}`}>
      <div className="bar">
        <div className="lights"><span /><span /><span /></div>
        <span>vinay@portfolio: ~</span>
        <span className="close" onClick={onClose}>×</span>
      </div>
      <div className="body">
        <span dangerouslySetInnerHTML={{
          __html: shown
            .replace(/\$/g, '<span class="prompt">$</span>')
            .replace(/\[(.*?)\]/g, '<span class="accent">[$1]</span>')
        }} />
        <span className="cursor" />
      </div>
    </div>
  );
}

function GemsModal({ open, onClose, found }) {
  return (
    <div className={`gems-modal ${open ? "show" : ""}`} onClick={onClose}>
      <div className="panel" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <h3>Hidden gems</h3>
        <div className="sub">{found.length} / {GEMS.length} found · they live in localStorage</div>
        {GEMS.map(g => {
          const f = found.includes(g.id);
          return (
            <div key={g.id} className={`gem ${f ? "found" : ""}`}>
              <div className="icon">{f ? "★" : "?"}</div>
              <div>
                <div className="title">{f ? g.title : "??? ??? ???"}</div>
                <div className="hint">{g.hint}</div>
              </div>
              <div className="stat">{f ? "Found" : "Locked"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav({ active, onContact, theme, onToggleTheme }) {
  const [animating, setAnimating] = useState(false);
  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    onToggleTheme();
  };
  const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "featured", label: "Featured" },
    { id: "projects", label: "Projects" },
    { id: "courses", label: "Community" },
    { id: "contact", label: "Contact" }
  ];
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand">
          <span className="dot" />
          <span>Vinay Yalamarthi</span>
        </a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button
            className={`theme-toggle ${animating ? "toggling" : ""}`}
            onClick={handleToggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span className={`icon sun ${theme === "dark" ? "" : "is-out"}`} aria-hidden="true">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3" /><path d="M8 1.5v1.6M8 12.9v1.6M14.5 8h-1.6M3.1 8H1.5M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1M12.6 12.6l-1.1-1.1M4.5 4.5 3.4 3.4" /></svg>
            </span>
            <span className={`icon moon ${theme === "dark" ? "is-out" : ""}`} aria-hidden="true">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 9.5A5 5 0 0 1 6.5 3a.5.5 0 0 0-.7-.6 6.2 6.2 0 1 0 7.8 7.8.5.5 0 0 0-.6-.7Z" /></svg>
            </span>
          </button>
          <a className="nav-cta" href="#contact" onClick={onContact}>Get in touch ↗</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ onAvatarClick, onLiveClick, avatarFx, theme }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-eyebrow">
          <span className="eyebrow"><span className="num">01</span> / Portfolio · 2026</span>
        </div>
        <h1>
          Vinay<br />Sanyasi<em>.</em>
        </h1>
        <div className="avatar-card">
          <div className={`avatar-frame ${avatarFx}`} onClick={onAvatarClick}>
            <img
              src={theme === "dark" ? "assets/avatar-dark.jpg" : "assets/avatar.jpg"}
              alt="Vinay Sanyasi Setty — pixel avatar"
              className="avatar-img shown"
            />
          </div>
          <div className="caption">
            <span>pixel-art</span>
            <span className="live">● online</span>
          </div>
        </div>
        <div className="hero-tail">
          <p className="tagline">{D.tagline}. CS graduate focused on multi-agent systems and scalable real-time backend infrastructure.</p>
          <div className="hero-meta">
            <div>
              <span className="label">Status</span>
              <span className="value" style={{ cursor: "pointer" }} onClick={onLiveClick}>
                <span className="dot" />Open to collaboration
              </span>
            </div>
            <div>
              <span className="label">Role</span>
              <span className="value">{D.role}</span>
            </div>
            <div>
              <span className="label">Based in</span>
              <span className="value">{D.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">02</span> / About</span>
            <h2>Engineer, tinkerer, curious by default.</h2>
          </div>
          <span className="meta">{`// about.md`}</span>
        </div>
        <div className="about-grid reveal">
          <div className="about-side">
            <div className="row"><span className="k">Focus</span><span className="v">AI · Blockchain · Full-Stack</span></div>
            <div className="row"><span className="k">Stack</span><span className="v">Python · Next.js · Solidity</span></div>
            <div className="row"><span className="k">Studied</span><span className="v">Computer Science (B.Tech)</span></div>
            <div className="row"><span className="k">Lives in</span><span className="v">Visakhapatnam, Andhra Pradesh</span></div>
            <div className="row"><span className="k">Available</span><span className="v">Prototypes & roles</span></div>
          </div>
          <div className="body">
            {D.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  const [expanded, setExpanded] = useState({ 0: true }); // Default expanded for interns
  const [activeItem, setActiveItem] = useState(null);
  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  const openCert = (e, ev) => {
    ev.stopPropagation();
    if (!e.certUrl) return;
    setActiveItem({ name: e.company, subtitle: e.role + " · " + e.start + " – " + e.end, pdfUrl: e.certUrl });
  };
  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">03</span> / Experience</span>
            <h2>Where I've worked.</h2>
          </div>
          <span className="meta">1 role · 1 company</span>
        </div>
        <div className="timeline">
          {D.experience.map((e, i) => (
            <div key={i} className={`tl-row current ${expanded[i] ? "open" : ""}`}
              onClick={() => toggle(i)}>
              <div className="tl-when">
                <div>{e.start} → {e.end}</div>
                <span className="now">Internship</span>
              </div>
              <div className="tl-body">
                <div className="tl-header">
                  <div>
                    <h3
                      className={e.certUrl ? "tl-company-link" : ""}
                      onClick={e.certUrl ? (ev) => openCert(e, ev) : undefined}
                    >{e.company}</h3>
                    <div className="role">{e.role}</div>
                  </div>
                  <span className="tl-toggle" aria-hidden="true">{expanded[i] ? "−" : "+"}</span>
                </div>
                <div className="tl-details">
                  {e.bullets
                    ? <ul className="exp-bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                    : <p>{e.note}</p>}
                  {e.stack && e.stack.length > 0 && (
                    <div className="chips">
                      {e.stack.map(s => <span key={s} className="chip">{s}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PdfModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}

/* ---------- PDF Preview Modal (shared) ---------- */
function PdfModal({ item, onClose }) {
  const open = !!item;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!item) return null;

  const embedUrl = item.pdfUrl
    ? item.pdfUrl.replace(/\/view.*$/, "/preview").replace(/\/edit.*$/, "/preview")
    : null;

  return (
    <div className={`cert-modal ${open ? "show" : ""}`} onClick={onClose}>
      <div className="cert-modal-panel" onClick={e => e.stopPropagation()}>
        <div className="cert-modal-bar">
          <div>
            <div className="cert-modal-name">{item.name}</div>
            {item.subtitle && <div className="cert-modal-meta">{item.subtitle}</div>}
          </div>
          <button className="cert-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="cert-modal-body">
          {embedUrl
            ? <div className="cert-modal-iframe-wrap"><iframe src={embedUrl} title={item.name} allowFullScreen /></div>
            : <div className="cert-modal-empty">No PDF uploaded yet.</div>
          }
        </div>
      </div>
    </div>
  );
}

/* ---------- Education + Certifications ---------- */
function EduCerts() {
  const [activeItem, setActiveItem] = useState(null);
  const openEdu = (e) => e.pdfUrl && setActiveItem({ name: e.degree, subtitle: e.school.trim() + " · " + e.years, pdfUrl: e.pdfUrl });
  const openCert = (c) => c.pdfUrl && setActiveItem({ name: c.name, subtitle: c.issuer + " · " + c.year, pdfUrl: c.pdfUrl });
  return (
    <section id="education">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">04</span> / Education &amp; Certs</span>
            <h2>Credentials.</h2>
          </div>
          <span className="meta">{`// education + Certification`}</span>
        </div>
        <div className="split">
          <div className="card reveal">
            <h3>Education</h3>
            {D.education.map((e, i) => (
              <div
                key={i}
                className={`edu-item${e.pdfUrl ? " edu-clickable" : ""}`}
                onClick={() => openEdu(e)}
                title={e.pdfUrl ? "Click to preview" : undefined}
              >
                <div className="school">{e.school}</div>
                <div className="deg">{e.degree}</div>
                <div className="when">{e.years} · {e.detail}</div>
                {e.pdfUrl && <div className="cert-preview-hint">View ↗</div>}
              </div>
            ))}
          </div>
          <div className="card reveal">
            <h3>Certifications</h3>
            {D.certifications.map((c, i) => (
              <div
                key={i}
                className={`cert-item${c.pdfUrl ? " cert-clickable" : ""}`}
                onClick={() => openCert(c)}
                title={c.pdfUrl ? "Click to preview certificate" : undefined}
              >
                <div>
                  <div className="name">{c.name}</div>
                  <div className="meta">{c.issuer}</div>
                </div>
                <div className="right">
                  <div className="when">{c.year}</div>
                  {c.pdfUrl && <div className="cert-preview-hint">View ↗</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PdfModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}

/* ---------- Featured Projects ---------- */
function Featured() {
  const [expanded, setExpanded] = useState({ "TARA": true }); // default expand TARA
  const toggle = (title) => setExpanded(prev => ({ ...prev, [title]: !prev[title] }));
  return (
    <section id="featured">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">05</span> / Featured</span>
            <h2>Things I'm proud of.</h2>
          </div>
          <span className="meta">{D.featured.length} selected systems</span>
        </div>
        <div className="feature-grid">
          {D.featured.map((p, i) => (
            <div key={p.title} className="reveal">
              <article
                className={`feature${expanded[p.title] ? " open" : ""}`}
                onClick={() => toggle(p.title)}
              >
                <div className="top">
                  <span className="num">F/{String(i + 1).padStart(2, "0")}</span>
                  <span className="feature-top-right">
                    <span className="year">{p.year}</span>
                    <span className="feature-toggle" aria-hidden="true">{expanded[p.title] ? "−" : "+"}</span>
                  </span>
                </div>
                <div>
                  <div className="sponsor">{p.sponsor}</div>
                  <h3>{p.title}</h3>
                </div>
                <div className="feature-details">
                  <p className="blurb">{p.blurb}</p>
                  <ul>{p.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                  <div className="chips">
                    {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Other Projects ---------- */
function Projects() {
  const [expanded, setExpanded] = useState({});
  const toggle = (title) => setExpanded(prev => ({ ...prev, [title]: !prev[title] }));
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">06</span> / Projects</span>
            <h2>More Projects.</h2>
          </div>
          <span className="meta">{D.projects.length} hackathons & pipelines</span>
        </div>
        <div className="proj-grid reveal">
          {D.projects.map((p) => (
            <div key={p.title} className={`proj${expanded[p.title] ? " open" : ""}`}>
              <h3 onClick={() => toggle(p.title)}>
                <span>{p.title}</span>
                <span className="proj-right">
                  <span className="yr">{p.year}</span>
                  <span className="proj-toggle" aria-hidden="true">{expanded[p.title] ? "−" : "+"}</span>
                </span>
              </h3>
              <div className="proj-details">
                <p>{p.blurb}</p>
                <div className="chips">
                  {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Courses / memberships ---------- */
function Courses() {
  const [activeItem, setActiveItem] = useState(null);
  const openCourse = (c) => c.pdfUrl && setActiveItem({ name: c.name, subtitle: c.by + (c.year ? " · " + c.year : ""), pdfUrl: c.pdfUrl });
  return (
    <section id="courses">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">07</span> / Community &amp; Honors</span>
            <h2>Always learning.</h2>
          </div>
          <span className="meta">{D.courses.length} listings</span>
        </div>
        <div className="courses-grid reveal">
          {D.courses.map((c, i) => (
            <div
              key={i}
              className={`course${c.pdfUrl ? " course-clickable" : ""}`}
              onClick={() => openCourse(c)}
              title={c.pdfUrl ? "Click to preview certificate" : undefined}
            >
              <div className="tag">{c.tag}</div>
              <div className="name">{c.name}</div>
              <div className="by">{c.by}</div>
              {c.pdfUrl && <div className="cert-preview-hint">View ↗</div>}
            </div>
          ))}
        </div>
      </div>
      <PdfModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const c = D.contact;
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow"><span className="num">08</span> / Contact</span>
          </div>
          <span className="meta">{``}</span>
        </div>
        <h2 className="lead reveal">
          Have an idea, a role, or a hard problem? <em>Let's talk.</em>
        </h2>
        <a className="email-link reveal" href={`mailto:${c.email}`}>
          {c.email}
          <span className="arrow">↗</span>
        </a>
        <div className="socials reveal">
          <a className="social" href={c.linkedinUrl} target="_blank" rel="noreferrer">
            <span>LinkedIn</span><span>↗</span>
          </a>
          <a className="social" href={c.githubUrl} target="_blank" rel="noreferrer">
            <span>GitHub</span><span>↗</span>
          </a>
          <a className="social" href={`mailto:${c.email}`}>
            <span>Email</span><span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="foot wrap">
      <span>© 2026 Yalamarthi Vinay Sanyasi Setty</span>
      <span>Built with care · Last updated May 2026</span>
    </footer>
  );
}

/* ---------- Tweaks ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "terracotta",
  "pixel": true
}/*EDITMODE-END*/;

function PortfolioTweaks({ t, setTweak }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle } = window;

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Theme">
        <TweakRadio
          label="Mode"
          value={t.theme}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
          onChange={v => setTweak("theme", v)}
        />
      </TweakSection>
      <TweakSection title="Accent">
        <TweakRadio
          label="Color"
          value={t.accent}
          options={[
            { value: "terracotta", label: "Terra" },
            { value: "indigo", label: "Indigo" },
            { value: "forest", label: "Forest" },
            { value: "mono", label: "Mono" }
          ]}
          onChange={v => setTweak("accent", v)}
        />
      </TweakSection>
      <TweakSection title="Aesthetic">
        <TweakToggle
          label="Pixel/terminal mode"
          value={t.pixel}
          onChange={v => setTweak("pixel", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ---------- App ---------- */
function App() {
  const { useTweaks } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState("top");
  const { found, unlock, toast } = useGems();
  const [konamiRain, setKonamiRain] = useState(false);

  // sync theme/accent/pixel attributes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.setAttribute("data-accent", t.accent);
    document.documentElement.setAttribute("data-pixel", t.pixel ? "on" : "off");
  }, [t.theme, t.accent, t.pixel]);

  const toggleTheme = () => setTweak("theme", t.theme === "light" ? "dark" : "light");

  // user-side persistence layer (localStorage)
  const PREFS_KEY = "vinay-portfolio-prefs-v1";
  const hydrated = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const prefs = JSON.parse(raw);
        if (prefs && typeof prefs === "object") {
          if ("theme" in prefs) setTweak("theme", prefs.theme);
          if ("accent" in prefs) setTweak("accent", prefs.accent);
          if ("pixel" in prefs) setTweak("pixel", prefs.pixel);
        }
      }
    } catch { }
    hydrated.current = true;
  }, []);
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({
        theme: t.theme, accent: t.accent, pixel: t.pixel
      }));
    } catch { }
  }, [t.theme, t.accent, t.pixel]);
  const [termOpen, setTermOpen] = useState(false);
  const [termLines, setTermLines] = useState([]);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [avatarFx, setAvatarFx] = useState("");

  // active section tracking
  useEffect(() => {
    const ids = ["about", "experience", "education", "featured", "projects", "courses", "contact"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // GEM 1: type "hi"
  useEffect(() => {
    let buf = "";
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf.endsWith("hi")) {
        unlock("konami");
        setKonamiRain(true);
        setTimeout(() => setKonamiRain(false), 4500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // GEM 3: typing "sudo" anywhere
  useEffect(() => {
    let buf = "";
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-8);
      if (buf.endsWith("sudo")) {
        unlock("sudo");
        setTermLines([
          "$ sudo --whoami",
          "[ok] elevated privileges granted",
          "",
          "user      : vinay.yalamarthi",
          "role      : AI, Blockchain & Full-Stack Engineer",
          "stack     : Python · LangGraph · Solidity · React · Next.js",
          "specialty : RAG workflows · GenAI agents · Smart Contracts · scalable systems",
          "fun_fact  : 100% SSC aggregate school score",
          "",
          "$ tip:  you found one. there are [5] gems total."
        ]);
        setTermOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // GEM 4: console message
  useEffect(() => {
    const css = "color:#d97757;font-family:monospace;font-size:13px;line-height:1.5";
    const cssDim = "color:#888;font-family:monospace;font-size:12px";
    /* eslint-disable no-console */
    console.log("%c👋 Hey, dev.", "color:#d97757;font-family:monospace;font-size:18px;font-weight:bold");
    console.log(
      "%c                                        \n" +
      "   █░█ █ █▄░█ ▄▀█ █▄█   \n" +
      "   ▀▄▀ █ █░▀█ █▀█ ░█░   \n" +
      "                                        ",
      css
    );
    console.log("%cIf you're poking around — there are %c5 hidden gems%c on this page.\nKeyboards, clicks, even the URL hash. Have fun.", cssDim, css, cssDim);
    console.log("%c Tip: try ?gem=hello in the URL.", cssDim);

    // unlock console gem
    window.unlock = () => { unlock("console"); console.log("%c★ Inspector Gadget unlocked.", css); return "★"; };

    // hash/search unlock
    if (location.hash === "#gem" || new URLSearchParams(location.search).get("gem") === "hello") {
      unlock("console");
    }

    // property getter
    Object.defineProperty(window, "gems", {
      get() { unlock("console"); return GEMS; },
      configurable: true
    });
    /* eslint-enable no-console */
  }, []);

  // GEM 2: avatar clicks
  const onAvatarClick = () => {
    setAvatarClicks(c => {
      const n = c + 1;
      setAvatarFx("wiggle");
      setTimeout(() => setAvatarFx(""), 600);
      if (n === 5) {
        unlock("avatar");
        setAvatarFx("glitch");
        setTimeout(() => setAvatarFx(""), 1200);
      }
      return n;
    });
  };

  // GEM 5: live dot
  const onLiveClick = () => {
    unlock("live");
    setTermLines([
      "$ status --whisper",
      "[off-record] hello there! thanks for clicking.",
      "",
      "I'm always interested in:",
      "  · conversational security copilots (LangGraph)",
      "  · LLM pipeline evaluations (RAG vs fine-tuning)",
      "  · decentralized applications (Web3 / Solidity / Smart Contracts)",
      "  · full-stack dashboard optimizations",
      "  · rapid prototyping and hackathons",
      "",
      "$ if any of those resonate — [contact]."
    ]);
    setTermOpen(true);
  };

  return (
    <>
      <Nav
        active={active}
        theme={t.theme}
        onToggleTheme={toggleTheme}
      />
      <main>
        <Hero
          onAvatarClick={onAvatarClick}
          onLiveClick={onLiveClick}
          avatarFx={avatarFx}
          theme={t.theme}
        />
        <About />
        <Experience />
        <EduCerts />
        <Featured />
        <Projects />
        <Courses />
        <Contact />
      </main>
      <Footer />
      <PortfolioTweaks t={t} setTweak={setTweak} />

      <GemToast toast={toast} />
      {konamiRain && <GemRain />}
      <GemTerminal open={termOpen} onClose={() => setTermOpen(false)} lines={termLines} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
