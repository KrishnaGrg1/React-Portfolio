
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "rounded-full transition-all duration-300",
        "border-teal hover:border-teal/70",
        "hover:bg-teal/10"
      )}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-slate transition-all" />
      ) : (
        <Sun className="h-5 w-5 text-teal transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
