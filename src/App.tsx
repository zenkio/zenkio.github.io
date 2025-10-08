
import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Moon,
  Sun,
  ExternalLink,
  ArrowRight,
  Code2,
  Briefcase,
  Rocket,
  BookOpen,
  MapPin,
} from "lucide-react";
import { GitHub, LinkedIn } from './component/icon';
import { useTheme, ThemeProvider } from "./component/theme";
import { useEffect, useRef, useState } from "react";
import Email from "./component/email";
import ContactForm from "./component/contactForm";
import { Toaster } from "sonner";
import { TypeWriter } from "./component/typeWritter";

type ChildrenProps = PropsWithChildren<{}>;

const Container = ({ children }: ChildrenProps) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-10 text-center">
    {eyebrow && (
      <p className="mb-2 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 dark:text-zinc-300">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
        {subtitle}
      </p>
    )}
  </div>
);

const Badge = ({ children }: ChildrenProps) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-zinc-700 dark:text-zinc-200">
    {children}
  </span>
);

const Card = ({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 ${className}`}
  >
    {children}
  </div>
);

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/70 text-zinc-800 shadow-sm backdrop-blur transition hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

const profile = {
  name: "Zenkio Fung",
  title: "Senior Software Engineer",
  location: "Manchester, UK",
  summary:
    "I build reliable, scalable web apps with a product mindset. Specialized in React, TypeScript, and cloud-native architectures.",
  email: "zenkio.it@gmail.com",
  social: {
    github: "https://github.com/zenkio",
    linkedin: "https://www.linkedin.com/in/zenkio-fung-064850176",
  },
  ctaCV: undefined, //"/Man_Ho_Fung_CV.pdf",
};

const stats = [
  { label: "Years Experience on IT", value: "7+" },
  { label: "Years Experience on Electonics", value: "8+" },
  { label: "Tech Stack", value: "React / Java / AWS" },
];

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Remix.js",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Docker",
  "CI/CD",
  "Testing Library",
  "Playwright",
  "Tailwind CSS",
];



type Project = {
  title: string;
  description: string;
  stack: string[];
  link: string;
};

const projects: Project[] = [
  // {
  //   title: "Realtime Analytics Dashboard",
  //   description:
  //     "High-throughput data viz platform ingesting millions of events/day with sub-second charts.",
  //   stack: ["Next.js", "WebSockets", "ClickHouse"],
  //   link: "#",
  // },
  // {
  //   title: "Headless Commerce Kit",
  //   description:
  //     "Composable storefront framework with server components and edge caching.",
  //   stack: ["React Server Components", "Vercel Edge", "Stripe"],
  //   link: "#",
  // },
  // {
  //   title: "ML-Powered Code Review Bot",
  //   description:
  //     "Static analysis + LLM suggestions integrated into GitHub PR workflows.",
  //   stack: ["Node.js", "OpenAI", "GitHub Apps"],
  //   link: "#",
  // },
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Safeguard Global",
    period: "2021 — Present",
    bullets: [
      "Built a scalable payroll platform, optimizing data models and system performance.",
      "Designed event-driven pipelines for seamless backend integration.",
      "Drove UX improvements and streamlined global payroll operations.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Welab Bank",
    period: "2020 — 2021",
    bullets: [
      "Delivered new digital banking features, boosting customer engagement.",
      "Modernized Java services to enhance reliability and maintainability.",
      "Resolved critical production issues, improving system uptime.",
    ],
  },
  {
    role: "Analyst Programmer II",
    company: "Cityline (Hong Kong) Limited",
    period: "2018 — 2020",
    bullets: [
      "Engineered coupon and ticketing systems for high-traffic projects.",
      "Enabled flexible promotions and supported large-scale transactions.",
    ],
  },
];

type Writing = {
  title: string;
  date: string;
  link: string;
};

const writing: Writing[] = [
  // { title: "Optimizing React for Perceived Performance", date: "Aug 2025", link: "#" },
  // { title: "Edge Rendering with RSC: A Practical Guide", date: "Jun 2025", link: "#" },
  // { title: "Testing Beyond the UI: Contract Tests", date: "Mar 2025", link: "#" },
];

const FadeIn = ({ delay = 0, children, y = 12 }: { delay?: number; children: React.ReactNode; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const GradientBlob = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
    <div className="absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/40 via-fuchsia-400/30 to-cyan-300/40 blur-3xl dark:from-indigo-600/30 dark:via-fuchsia-600/20 dark:to-cyan-500/30" />
  </div>
);

const PlaceholderImage = () => (
  <div className="flex h-40 w-full items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400 dark:from-zinc-800 dark:to-zinc-700">
    <Code2 className="h-6 w-6" />
  </div>
);

// Theme gradient options and component moved to top-level scope
const themeGradients = [
  // Light blue/purple/cyan
  "from-indigo-400/30 via-fuchsia-400/20 to-cyan-300/30 dark:from-indigo-600/30 dark:via-fuchsia-600/20 dark:to-cyan-500/30",
  // Orange/pink/yellow
  "from-orange-300/30 via-pink-300/20 to-yellow-200/30 dark:from-orange-500/30 dark:via-pink-500/20 dark:to-yellow-400/30",
  // Green/teal/blue
  "from-green-300/30 via-teal-300/20 to-blue-300/30 dark:from-green-500/30 dark:via-teal-500/20 dark:to-blue-500/30",
];

function getRandomGradient() {
  // You can use a random or deterministic approach
  return themeGradients[2]; // Or Math.floor(Math.random() * themeGradients.length)
}

const slogans = [
  "Turn Coffee into Code, Ideas into Reality.",
  "Building performant, reliable interfaces.",
  "Specialized in React, TypeScript, and AWS.",
  "Delivering scalable web apps with a product mindset.",
];

const ThemeGradientBlob = () => {
  const gradient = getRandomGradient();
  return (
    <div
      className={`absolute -right-10 -top-20 h-60 w-60 rounded-full bg-gradient-to-tr blur-2xl ${gradient}`}
      aria-hidden
    />
  );
};

function AppContent() {
  return (
    <main className="min-h-screen scroll-smooth bg-zinc-50 text-zinc-800 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="group inline-flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 text-white ring-4 ring-zinc-900/10 dark:bg-white dark:text-zinc-900 dark:ring-white/10">MF</div>
              <div className="leading-tight">
                <span className="block text-sm font-semibold">{profile.name}</span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">{profile.title}</span>
              </div>
            </a>
            <nav className="hidden items-center gap-7 md:flex">
              {projects.length > 0 && <a href="#projects" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Projects</a>}
              <a href="#skills" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Skills</a>
              <a href="#experience" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Experience</a>
              {writing.length > 0 && <a href="#writing" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Writing</a>}  
              <a href="#contact" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Contact</a>
              {profile.ctaCV? <a href={profile.ctaCV} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-medium shadow-sm transition hover:scale-[1.02] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <Download className="h-4 w-4" /> CV
              </a> : null}
              <ThemeToggle />
            </nav>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </header>

      <section id="top" className="relative">
        <GradientBlob />
        <Container>
          <div className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
            <FadeIn>
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                  <MapPin className="h-3.5 w-3.5" /> {profile.location}
                </p>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                      <TypeWriter contents={slogans} />
                </h1>
                <p className="mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
                  {profile.summary}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl dark:bg-white dark:text-zinc-900"
                  >
                    Let's talk <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                  {profile.ctaCV ? <a
                    href={profile.ctaCV}
                    className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-zinc-800 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <Download className="h-4 w-4" /> Download CV
                  </a>: null}
                  <a
                    href={profile.social.github}
                    aria-label="GitHub"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/80 shadow-sm transition hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <GitHub className="h-5 w-5" />
                  </a>
                  <a
                    href={profile.social.linkedin}
                    aria-label="LinkedIn"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/80 shadow-sm transition hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <LinkedIn className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="relative overflow-hidden">
                {/* Theme gradient blob */}
                <ThemeGradientBlob />
                <div className="relative">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                    <Rocket className="h-3.5 w-3.5" /> Growing with impact
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {stats.map((s, i) => (
                      <Card key={i} className="bg-white/60 p-4 text-center dark:bg-zinc-900/40">
                        <div className="text-2xl font-semibold">{s.value}</div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">{s.label}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </section>
      {projects.length > 0 && (
        <section id="projects" className="py-14 sm:py-20">
          <Container>
            <SectionTitle eyebrow="Selected Work" title="Projects" subtitle="A few things I've shipped recently." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, idx) => (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <Card className="flex h-full flex-col">
                    <PlaceholderImage />
                    <div className="mt-4 flex flex-1 flex-col">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-300">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.stack.map((s, i) => (
                          <Badge key={i}>{s}</Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <a
                          href={p.link}
                          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
                        >
                          View project <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="skills" className="border-y py-14 dark:border-zinc-800 sm:py-20">
        <Container>
          <SectionTitle eyebrow="Toolbox" title="Skills & Technologies" subtitle="Focused on modern web platforms and DX." />
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((s, i) => (
              <Badge key={i}>{s}</Badge>
            ))}
          </div>
        </Container>
      </section>

      <section id="experience" className="py-14 sm:py-20">
        <Container>
          <SectionTitle eyebrow="Career" title="Experience" subtitle="Impact across startups and platforms." />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800 sm:left-1/2" />
            <div className="space-y-8">
              {experience.map((e, idx) => (
                <div key={idx} className={`grid grid-cols-1 items-start gap-6 sm:grid-cols-2 ${idx % 2 ? "sm:text-left" : "sm:text-right"}`}>
                  <div className={`${idx % 2 ? "sm:order-2" : ""}`}>
                    <Card>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                          {idx === 0 ? <Briefcase className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{e.role}</h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {e.company} • {e.period}
                          </p>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                            {e.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className={`hidden sm:block ${idx % 2 ? "sm:order-1" : ""}`}></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      {writing.length > 0 && (
        <section id="writing" className="border-y py-14 dark:border-zinc-800 sm:py-20">
          <Container>
        <SectionTitle eyebrow="Notes" title="Writing" subtitle="Occasional deep dives on frontend, DX, and systems." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {writing.map((w, idx) => (
            <Card key={idx}>
          <div className="flex items-start justify-between">
            <div>
              <a href={w.link} className="text-lg font-semibold underline-offset-4 hover:underline">
            {w.title}
              </a>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{w.date}</p>
            </div>
            <BookOpen className="h-5 w-5 text-zinc-400" />
          </div>
            </Card>
          ))}
        </div>
          </Container>
        </section>
      )}

      <section id="contact" className="py-14 sm:py-20">
        <Container>
          <SectionTitle eyebrow="Get in touch" title="Contact" subtitle="Have a project or role in mind? Let's connect." />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Prefer email? I'm quick to respond during business hours.
              </p>
              <Email email={profile.email} />
              <Toaster richColors />
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">Quick message</h3>
              <ContactForm />
            </Card>
          </div>
        </Container>
      </section>

      <footer className="border-t py-10 text-center text-sm text-zinc-500 dark:border-zinc-800">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <a href={profile.social.github} aria-label="GitHub" className="inline-flex h-9 w-9 items-center justify-center rounded-full border dark:border-zinc-800">
                <GitHub className="h-4 w-4" />
              </a>
              <a href={profile.social.linkedin} aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full border dark:border-zinc-800">
                <LinkedIn className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}