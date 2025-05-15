
import { useState, useEffect } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const sectionElements = sections.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 dark:bg-navy/70 glass py-2 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">
          <a href="#home" className="flex items-center gap-2 font-heading">
            <span className="text-teal">&lt;</span>
            Krishna
            <span className="text-teal">/&gt;</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`relative font-medium hover:text-teal transition-colors
                    ${activeSection === link.href.substring(1) 
                      ? "text-teal" 
                      : "text-foreground"}
                    after:content-[''] after:absolute after:w-full after:scale-x-0 
                    after:h-0.5 after:bottom-0 after:left-0 after:bg-teal 
                    after:origin-bottom-right after:transition-transform after:duration-300
                    hover:after:scale-x-100 hover:after:origin-bottom-left
                    ${activeSection === link.href.substring(1) && "after:scale-x-100"}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <ThemeSwitcher />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden gap-4">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 dark:bg-navy/95 backdrop-blur-sm transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } pt-20`}
      >
        <nav className="h-full flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-xl font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "text-teal"
                      : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
