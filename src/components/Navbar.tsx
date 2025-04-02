
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-foreground flex items-center">
            <span className="data-gradient">DataDream</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            Services
          </a>
          <a href="#process" className="text-foreground hover:text-primary transition-colors">
            Process
          </a>
          <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
            Testimonials
          </a>
          <Button asChild>
            <a href="#contact" className="bg-primary text-white">Contact Us</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-30 flex flex-col p-6">
          <nav className="flex flex-col space-y-4">
            <a href="#about" onClick={toggleMenu} className="text-foreground hover:text-primary py-2 text-lg">
              About
            </a>
            <a href="#services" onClick={toggleMenu} className="text-foreground hover:text-primary py-2 text-lg">
              Services
            </a>
            <a href="#process" onClick={toggleMenu} className="text-foreground hover:text-primary py-2 text-lg">
              Process
            </a>
            <a href="#testimonials" onClick={toggleMenu} className="text-foreground hover:text-primary py-2 text-lg">
              Testimonials
            </a>
            <Button asChild className="mt-4">
              <a href="#contact" onClick={toggleMenu}>Contact Us</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
