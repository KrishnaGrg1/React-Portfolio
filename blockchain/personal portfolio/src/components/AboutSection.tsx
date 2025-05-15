
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentRef.current?.classList.add("animate-fade-in-up");
            imageRef.current?.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 md:py-32 bg-secondary/50 dark:bg-navy-light/30"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4">
          <span className="text-teal font-mono">01.</span> About Me
          <div className="h-px bg-border flex-grow ml-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={contentRef}
            className="opacity-0"
          >
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <p>
                Hello! My name is Krishna Bahadur Gurung, and I enjoy creating things that live on the 
                internet. My interest in web development started back in 2012 when I decided 
                to try editing custom Tumblr themes — turns out hacking together a custom 
                reblog button taught me a lot about HTML & CSS!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working at an advertising 
                agency, a start-up, a huge corporation, and a student-led design studio. My 
                main focus these days is building accessible, inclusive products and digital 
                experiences at a top tech company for a variety of clients.
              </p>
              <p>
                Here are a few technologies I've been working with recently:
              </p>
            </div>
            
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm font-mono">
              {[
                "JavaScript (ES6+)", 
                "TypeScript", 
                "React", 
                "Next.js", 
                "Node.js",
                "Tailwind CSS"
              ].map((tech, index) => (
                <li 
                  key={tech} 
                  className="flex items-center gap-2"
                >
                  <span className="text-teal">▹</span> {tech}
                </li>
              ))}
            </ul>
          </div>
          
          <div 
            ref={imageRef}
            className="opacity-0 animation-delay-200"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="relative z-10 overflow-hidden rounded-md">
                <div className="aspect-square bg-slate-light/20 rounded-md flex items-center justify-center">
                  <span className="text-5xl font-bold text-slate-light/40">
                   <img src="portfolio.jpg" alt="" />
                  </span>
                </div>
                <div className="absolute inset-0 bg-teal/20 hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-teal rounded-md z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
