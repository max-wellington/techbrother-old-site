"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LOGO_WHITE_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-white-1766092584771.png?width=8000&height=8000&resize=contain";
const LOGO_BLACK_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-black-1766089816039.png?width=8000&height=8000&resize=contain";

const services = [
  { name: "Managed IT Services", href: "/services/managed-it", description: "Seamless business operations" },
  { name: "One-Off Projects", href: "/services/one-off-projects", description: "Expert initiative execution" },
  { name: "IT Consulting", href: "/services/it-consulting", description: "Strategic technology alignment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // We want the same transparent-to-solid behavior on all pages
  const activeScrolled = scrolled;
  const showWhiteLogo = activeScrolled || !isHome;
  const buttonVariant = (activeScrolled || !isHome) ? "secondary" : "default";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      activeScrolled 
        ? "bg-[#041324]/95 backdrop-blur-md border-white/10 shadow-lg" 
        : "bg-transparent border-transparent"
    } py-5`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-56 h-14">
            <Image 
              src={showWhiteLogo ? LOGO_WHITE_URL : LOGO_BLACK_URL}
              alt="TechBrother Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" ref={dropdownRef} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button 
              className={`transition-colors font-semibold flex items-center gap-1 py-2 ${
                (activeScrolled || !isHome) ? "text-white/90 hover:text-white" : "text-[#041324] hover:text-primary"
              }`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute top-full left-0 w-64 border rounded-xl shadow-2xl py-3 overflow-hidden ${
                    (activeScrolled || !isHome) ? "bg-[#041324] border-white/10" : "bg-white border-border"
                  }`}
                >
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`block px-5 py-3 transition-colors group ${
                        (activeScrolled || !isHome) ? "hover:bg-white/5" : "hover:bg-[#041324]/5"
                      }`}
                    >
                      <div className={`font-semibold transition-colors ${
                        (activeScrolled || !isHome) ? "text-white group-hover:text-primary" : "text-[#041324] group-hover:text-primary"
                      }`}>{service.name}</div>
                      <div className={`text-xs ${
                        (activeScrolled || !isHome) ? "text-white/50 group-hover:text-white/70" : "text-[#041324]/50 group-hover:text-[#041324]/70"
                      }`}>{service.description}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/#about" className={`transition-colors font-semibold ${
            (activeScrolled || !isHome) ? "text-white/90 hover:text-white" : "text-[#041324] hover:text-primary"
          }`}>About</Link>
          <Link href="/#contact" className={`transition-colors font-semibold ${
            (activeScrolled || !isHome) ? "text-white/90 hover:text-white" : "text-[#041324] hover:text-primary"
          }`}>Contact</Link>
        </nav>
        <Button 
          variant={buttonVariant} 
          asChild 
          className={`transition-all duration-300 font-bold px-6 h-11 ${
            (activeScrolled || !isHome)
              ? "bg-white text-[#041324] hover:bg-white/90" 
              : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
          }`}
        >
          <Link href="/#contact">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
