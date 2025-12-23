"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, MapPin, Mail, Phone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LOGO_WHITE_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-white-1766092584771.png?width=8000&height=8000&resize=contain";
const LOGO_BLACK_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-black-1766089816039.png?width=8000&height=8000&resize=contain";

const services = [
  { name: "Managed IT Services", href: "/services/managed-it", description: "Seamless business operations" },
  { name: "IT Projects", href: "/services/one-off-projects", description: "Expert initiative execution" },
  { name: "IT Consulting", href: "/services/it-consulting", description: "Strategic technology alignment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const serviceNames = ["Managed IT Services", "IT Projects", "IT Consulting"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % serviceNames.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [serviceNames.length]);

  // We want the same transparent-to-solid behavior on all pages
  const activeScrolled = scrolled;
  const isServicePage = pathname.startsWith("/services");
  
  // On mobile, when menu is open and at top, apply blur but keep transparent
  const isMobileMenuOpenAtTop = mobileMenuOpen && !activeScrolled && isHome;
  // Use white logo on service pages when at top (dark hero), otherwise use black
  const showWhiteLogo = (isServicePage && !activeScrolled);
  const buttonVariant = (activeScrolled || !isHome) ? "secondary" : "default";
  // Use dark text when scrolled, or on home page. Use white text on service pages at top only
  const useDarkText = activeScrolled || !isServicePage;
  
  const headerBgClass = isMobileMenuOpenAtTop
    ? "bg-transparent backdrop-blur-md border-transparent"
    : activeScrolled
    ? "bg-white/90 backdrop-blur-md border-border shadow-lg"
    : "bg-transparent border-transparent";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+18139566394" className={`flex items-center gap-2 transition-colors ${isServicePage && !activeScrolled ? "text-white/80 hover:text-white" : "text-[#1B1B1A]/80 hover:text-[#1B1B1A]"}`}>
              <Phone className="w-4 h-4 text-primary" />
              <span>(813) 956-6394</span>
            </a>
            <a href="mailto:max@techbrother.io" className={`flex items-center gap-2 transition-colors ${isServicePage && !activeScrolled ? "text-white/80 hover:text-white" : "text-[#1B1B1A]/80 hover:text-[#1B1B1A]"}`}>
              <Mail className="w-4 h-4 text-primary" />
              <span>max@techbrother.io</span>
            </a>
          </div>
          <Link href="#" className={`flex items-center gap-2 transition-colors font-medium ${isServicePage && !activeScrolled ? "text-white/80 hover:text-white" : "text-[#1B1B1A]/80 hover:text-[#1B1B1A]"}`}>
            <Monitor className="w-4 h-4 text-primary" />
            <span>Client Portal</span>
          </Link>
        </div>
      </div>
      <motion.header 
        animate={{ top: scrolled ? 0 : 42 }}
        transition={{ duration: 0 }}
        className={`fixed left-0 right-0 z-[70] transition-all duration-300 border-b ${headerBgClass} py-3`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-[70]">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-56 h-12">
              <Image 
                src={showWhiteLogo ? LOGO_WHITE_URL : LOGO_BLACK_URL}
                alt="TechBrother Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-2xl font-light flex items-center justify-center leading-none -mt-1 ${useDarkText ? "text-[#1B1B1A]/60" : "text-white/60"}`}>|</span>
            <div className="relative h-12 flex items-center overflow-hidden min-w-[200px]">
              <AnimatePresence>
                <motion.div
                  key={currentServiceIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3
                  }}
                  className={`absolute left-0 font-semibold whitespace-nowrap ${useDarkText ? "text-[#1B1B1A]" : "text-white"}`}
                >
                  {serviceNames[currentServiceIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative" ref={dropdownRef} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button 
                className={`transition-colors font-semibold flex items-center gap-1 py-2 ${
                  useDarkText ? "text-[#1B1B1A] hover:text-primary" : "text-white/90 hover:text-white"
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
                    className={`absolute top-full left-0 w-64 border rounded-xl shadow-2xl py-3 overflow-hidden z-[80] ${
                      useDarkText ? "bg-white border-border" : "bg-white border-border"
                    }`}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={`block px-5 py-3 transition-colors group ${
                          useDarkText ? "hover:bg-[#041324]/5" : "hover:bg-[#041324]/5"
                        }`}
                      >
                        <div className={`font-semibold transition-colors ${
                          useDarkText ? "text-[#1B1B1A] group-hover:text-primary" : "text-[#1B1B1A] group-hover:text-primary"
                        }`}>{service.name}</div>
                        <div className={`text-xs ${
                          useDarkText ? "text-[#1B1B1A]/50 group-hover:text-[#1B1B1A]/70" : "text-[#1B1B1A]/50 group-hover:text-[#1B1B1A]/70"
                        }`}>{service.description}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/#about" className={`transition-colors font-semibold ${
              useDarkText ? "text-[#1B1B1A] hover:text-primary" : "text-white/90 hover:text-white"
            }`}>About</Link>
            <Link href="/#contact" className={`transition-colors font-semibold ${
              useDarkText ? "text-[#1B1B1A] hover:text-primary" : "text-white/90 hover:text-white"
            }`}>Contact</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <div className={`flex items-center gap-2 text-sm font-medium ${useDarkText ? "text-[#1B1B1A]/80" : "text-white/80"}`}>
              <MapPin className="w-4 h-4" />
              <span>Based in Tampa</span>
            </div>
            <Button 
              variant={buttonVariant} 
              asChild 
              className={`transition-all duration-300 font-bold px-6 h-11 ${
                useDarkText
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
              }`}
            >
              <Link href="/#contact">Get Started</Link>
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors relative z-[70] ${
              mobileMenuOpen && !isMobileMenuOpenAtTop
                ? "text-white hover:bg-white/10" 
                : (activeScrolled || !isHome) 
                  ? "text-white hover:bg-white/10" 
                  : "text-[#1B1B1A] hover:bg-[#041324]/10"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed inset-0 z-[50] pt-24 overflow-y-auto ${
              isMobileMenuOpenAtTop
                ? "bg-transparent backdrop-blur-md"
                : "bg-[#041324]"
            }`}
          >
            <nav className="flex flex-col p-6 space-y-2">
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between py-4 font-semibold text-lg border-b ${
                    isMobileMenuOpenAtTop
                      ? "text-[#1B1B1A] border-[#041324]/10"
                      : "text-white border-white/10"
                  }`}
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""} ${
                    isMobileMenuOpenAtTop ? "text-[#1B1B1A]" : "text-white"
                  }`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="py-2 pl-4 space-y-1">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`block py-3 transition-colors ${
                              isMobileMenuOpenAtTop
                                ? "text-[#1B1B1A]/90 hover:text-[#1B1B1A]"
                                : "text-white/90 hover:text-white"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="font-medium">{service.name}</div>
                            <div className={`text-sm ${
                              isMobileMenuOpenAtTop
                                ? "text-[#1B1B1A]/70"
                                : "text-white/70"
                            }`}>{service.description}</div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="/#about"
                className={`py-4 font-semibold text-lg border-b transition-colors ${
                  isMobileMenuOpenAtTop
                    ? "text-[#1B1B1A] border-[#041324]/10 hover:text-[#1B1B1A]/90"
                    : "text-white border-white/10 hover:text-white/90"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className={`py-4 font-semibold text-lg border-b transition-colors ${
                  isMobileMenuOpenAtTop
                    ? "text-[#1B1B1A] border-[#041324]/10 hover:text-[#1B1B1A]/90"
                    : "text-white border-white/10 hover:text-white/90"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-6">
                <Button 
                  asChild 
                  className={`w-full font-bold h-12 text-base ${
                    isMobileMenuOpenAtTop
                      ? "bg-[#041324] text-white hover:bg-[#041324]/90"
                      : "bg-white text-[#1B1B1A] hover:bg-white/90"
                  }`}
                >
                  <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
