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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

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
          className={`hidden md:inline-flex transition-all duration-300 font-bold px-6 h-11 ${
            (activeScrolled || !isHome)
              ? "bg-white text-[#041324] hover:bg-white/90" 
              : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
          }`}
        >
          <Link href="/#contact">Get Started</Link>
        </Button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            (activeScrolled || !isHome) ? "text-white hover:bg-white/10" : "text-[#041324] hover:bg-[#041324]/10"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[88px] bg-[#041324] z-40">
          <nav className="flex flex-col p-6 space-y-2">
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-4 text-white font-semibold text-lg border-b border-white/10"
              >
                Services
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="py-2 pl-4 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-3 text-white/80 hover:text-white transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-white/50">{service.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/#about"
              className="py-4 text-white font-semibold text-lg border-b border-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="py-4 text-white font-semibold text-lg border-b border-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-6">
              <Button 
                asChild 
                className="w-full bg-white text-[#041324] hover:bg-white/90 font-bold h-12 text-base"
              >
                <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
