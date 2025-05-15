
import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Basic canvas animation setup
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 8000));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.2})`,
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(100, 255, 218, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="container mx-auto px-4 z-10">
        {/* <div className="max-w-3xl"> */}
        <div className="flex flex-row md:flex-row items-center gap-8">
          {/* Left Side: Text Content */}
          <div className="flex-1 max-w-3xl ">
            <p className="text-teal mb-4 font-mono opacity-0 animate-fade-in">
              Hi, my name is
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-fade-in animation-delay-100">
              Krishna Bahadur Gurung.
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate mb-6 opacity-0 animate-fade-in animation-delay-200">
              I build things for the web.
            </h2>
            <p className="text-slate text-lg md:text-xl mb-8 max-w-xl opacity-0 animate-fade-in animation-delay-300">
              I'm a full-stack developer specializing in building exceptional
              digital experiences. Currently, I'm focused on building accessible,
              human-centered products.
            </p>
            <div className="flex flex-wrap gap-4 mb-12 opacity-0 animate-fade-in animation-delay-400">
              <Button size="lg" className="bg-teal text-navy hover:bg-teal-dark">
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal text-teal hover:bg-teal/10"
              >
                <a href="/krishna-cv.pdf" download>
                  Download CV
                </a>
              </Button>
            </div>

            <div className="flex gap-6 opacity-0 animate-fade-in animation-delay-500">
              <a href="https://github.com/KrishnaGrg1" className="hover:text-teal text-muted-foreground transition-colors">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/krishna-bahadur-gurung-60933a2a6" className="hover:text-teal text-muted-foreground transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://x.com/krishna_ba63631" aria-label="Twitter" className="text-muted-foreground hover:text-teal transition-all hover:scale-110 transform">
                <Twitter size={20} />
              </a>
              <a href="mailto:gkrishnabahadur618@gmail.com" className="hover:text-teal text-muted-foreground transition-colors">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 w-full max-w-md opacity-0 animate-fade-in animation-delay-600">
            <video
              src="/dashboard.mp4" // correct video file
              autoPlay
              loop
              muted
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float opacity-75 hover:opacity-100 transition-opacity"
      >
        <ArrowDown className="text-teal" size={32} />
        <span className="sr-only">Scroll Down</span>
      </a>
    </section>
  );
}
