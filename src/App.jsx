import { useCallback, useEffect, useRef, useState } from "react";
import BootScreen from "./components/BootScreen";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const THEME_KEY = "portfolio-theme";
const SIDEBAR_KEY = "portfolio-sidebar";
const SECTION_IDS = [
  "top",
  "about",
  "experience",
  "projects",
  "skills",
  "credentials",
  "contact",
];
const DESKTOP_BREAKPOINT = 1024;

function getInitialTheme() {
  if (typeof document !== "undefined") {
    const existing = document.documentElement.dataset.theme;
    if (existing === "light" || existing === "dark") return existing;
  }
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // ignore storage errors
  }
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return "dark";
}

function getInitialSidebar() {
  try {
    const saved = window.localStorage.getItem(SIDEBAR_KEY);
    if (saved === "open") return true;
    if (saved === "closed") return false;
  } catch {
    // ignore storage errors
  }
  if (typeof window !== "undefined") {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }
  return true;
}

function shouldShowBoot() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function App() {
  const [booting, setBooting] = useState(shouldShowBoot);
  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebar);
  const [motionPaused, setMotionPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [activeSection, setActiveSection] = useState("top");
  const searchInputRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_KEY, sidebarOpen ? "open" : "closed");
    } catch {
      // ignore storage errors
    }
  }, [sidebarOpen]);

  // Global keyboard shortcuts: "/" opens sidebar & focuses search, "[" toggles sidebar
  useEffect(() => {
    if (booting) return;
    function handleKeyDown(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = document.activeElement?.tagName;
      const inInput =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        document.activeElement?.isContentEditable;

      if (e.key === "/" && !inInput) {
        e.preventDefault();
        setSidebarOpen(true);
        window.requestAnimationFrame(() => {
          searchInputRef.current?.focus();
        });
      } else if (e.key === "[" && !inInput) {
        e.preventDefault();
        setSidebarOpen((prev) => !prev);
      } else if (
        e.key === "Escape" &&
        document.activeElement === searchInputRef.current
      ) {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [booting]);

  // Track active section reliably across tall and bottom-most sections
  useEffect(() => {
    let rafId = 0;

    function updateActiveSection() {
      rafId = 0;
      const elements = SECTION_IDS.map((id) => ({
        id,
        el: document.getElementById(id),
      })).filter((item) => item.el);

      if (elements.length === 0) return;

      const atBottom =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActiveSection(elements[elements.length - 1].id);
        return;
      }

      const triggerY = Math.min(window.innerHeight * 0.32, 260);
      let current = elements[0].id;
      for (const { id, el } of elements) {
        if (el.getBoundingClientRect().top <= triggerY) {
          current = id;
        }
      }
      setActiveSection(current);
    }

    function scheduleUpdate() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleToggleMotion = useCallback(() => {
    setMotionPaused((prev) => !prev);
  }, []);

  const handleSelectProject = useCallback((projectId) => {
    setCategory("all");
    setSearchQuery("");
    if (typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT) {
      setSidebarOpen(false);
    }
    window.requestAnimationFrame(() => {
      document
        .getElementById(`project-${projectId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const handleNavigateSection = useCallback((sectionId) => {
    if (typeof sectionId === "string" && SECTION_IDS.includes(sectionId)) {
      setActiveSection(sectionId);
    }
    if (typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT) {
      setSidebarOpen(false);
    }
  }, []);

  const handleClearFilters = useCallback(() => {
    setCategory("all");
    setSearchQuery("");
  }, []);

  return (
    <>
      {booting && <BootScreen onComplete={handleBootComplete} />}

      <div
        className={`frame ${sidebarOpen ? "" : "is-collapsed"}`}
        aria-hidden={booting || undefined}
      >
        {sidebarOpen && (
          <Sidebar
            activeSection={activeSection}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectProject={handleSelectProject}
            onNavigateSection={handleNavigateSection}
            onClose={handleCloseSidebar}
            searchInputRef={searchInputRef}
          />
        )}

        <main className="page">
          <Hero
            theme={theme}
            onToggleTheme={handleToggleTheme}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={handleToggleSidebar}
          />
          <About />
          <Experience />
          <Projects
            searchQuery={searchQuery}
            category={category}
            onCategoryChange={setCategory}
            onClearFilters={handleClearFilters}
            motionPaused={motionPaused || booting}
            onToggleMotion={handleToggleMotion}
          />
          <Skills />
          <Credentials />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
