"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Shield, CheckCircle2, ChevronRight, ChevronDown, Cloud, Server, Building2, Laptop, Settings, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const LOGO_WHITE_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-white-1766159620785.png?width=8000&height=8000&resize=contain";

const services = [
  { name: "Managed IT Services", href: "/services/managed-it", description: "Seamless business operations" },
  { name: "One-Off Projects", href: "/services/one-off-projects", description: "Expert initiative execution" },
  { name: "IT Consulting", href: "/services/it-consulting", description: "Strategic technology alignment" },
];

const projects = [
  {
    icon: Server,
    title: "Infrastructure Upgrades",
    description: "Modernize your IT infrastructure with hardware and software upgrades, network improvements, and system optimizations."
  },
  {
    icon: Cloud,
    title: "Cloud Migrations",
    description: "Seamlessly transition your on-premise systems to cloud platforms like AWS, Azure, or Google Cloud with minimal disruption."
  },
  {
    icon: Building2,
    title: "Office Relocations",
    description: "Complete IT relocation services including network setup, equipment moves, and system configuration at your new location."
  },
  {
    icon: Laptop,
    title: "System Deployments",
    description: "Roll out new hardware, software, or systems across your organization with proper configuration and user training."
  },
  {
    icon: Shield,
    title: "Security Audits",
    description: "Comprehensive security assessments to identify vulnerabilities and strengthen your organization's cybersecurity posture."
  },
  {
    icon: FileSearch,
    title: "IT Assessments",
    description: "Thorough evaluation of your current IT environment with detailed recommendations for improvements and cost savings."
  }
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We start by understanding your business needs, current infrastructure, and project goals through detailed consultation."
  },
  {
    step: "02",
    title: "Planning",
    description: "Our team develops a comprehensive project plan with timelines, milestones, and resource allocation."
  },
  {
    step: "03",
    title: "Execution",
    description: "We implement the project with minimal disruption to your operations, keeping you informed every step of the way."
  },
  {
    step: "04",
    title: "Delivery",
    description: "Final testing, documentation, and handover ensure you're set up for success with your new IT solutions."
  }
];

export default function OneOffProjectsPage() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#041324] backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-56 h-14">
                <Image 
                  src={LOGO_WHITE_URL}
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
                className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-1 py-2"
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
                    className="absolute top-full left-0 w-64 bg-[#041324] border border-white/10 rounded-xl shadow-2xl py-3 overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-5 py-3 hover:bg-white/5 transition-colors group"
                      >
                        <div className="text-white font-medium group-hover:text-primary transition-colors">{service.name}</div>
                        <div className="text-xs text-white/50 group-hover:text-white/70">{service.description}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/#about" className="text-white/90 hover:text-white transition-colors font-medium">About</Link>
            <Link href="/#contact" className="text-white/90 hover:text-white transition-colors font-medium">Contact</Link>
          </nav>
          <Button variant="secondary" asChild className="bg-white text-[#041324] hover:bg-white/90">
            <Link href="/#contact">Get Started</Link>
          </Button>
        </div>
      </header>

      <section className="relative pt-32 pb-20 bg-[#041324] text-white overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wrench className="w-4 h-4" />
              Core Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              One-Off IT Projects
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Expert execution for your specific IT initiatives. From cloud migrations to office relocations, we deliver projects on time and within budget.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Link href="/#contact" className="flex items-center gap-2">
                  Discuss Your Project
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 !bg-transparent">
                  <Link href="/#services">View All Services</Link>
                </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Project Types We Handle</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need a complete infrastructure overhaul or a specific IT implementation, we have the expertise to deliver.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <project.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Project Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose TechBrother for Your Project?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We bring years of experience and a commitment to excellence to every project we undertake.
              </p>
              <ul className="space-y-4">
                {[
                  "Experienced project managers and technical experts",
                  "Clear communication and regular progress updates",
                  "Fixed-price quotes with no hidden surprises",
                  "Thorough testing and quality assurance",
                  "Post-project support and documentation",
                  "Flexible scheduling to minimize business disruption"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary/5 rounded-2xl p-8"
            >
              <div className="text-center">
                <Settings className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Have a Project in Mind?</h3>
                <p className="text-muted-foreground mb-6">
                  Tell us about your project requirements and we&apos;ll provide a detailed proposal with timeline and pricing.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  <Link href="/#contact" className="flex items-center gap-2">
                    Get a Free Quote
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#041324] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/80 mb-8">
              From planning to execution, we&apos;ll guide you through every step. Let&apos;s discuss how we can bring your IT project to life.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
              <Link href="/#contact" className="flex items-center gap-2">
                Schedule Consultation
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#041324] text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-72 h-24">
                  <Image 
                    src={LOGO_WHITE_URL}
                    alt="TechBrother Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-white/70 max-w-sm">
                Your trusted partner for managed IT services, projects, and consulting.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/services/managed-it" className="hover:text-primary transition-colors">Managed IT</Link></li>
                <li><Link href="/services/one-off-projects" className="hover:text-primary transition-colors">One-Off Projects</Link></li>
                <li><Link href="/services/it-consulting" className="hover:text-primary transition-colors">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} TechBrother. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
