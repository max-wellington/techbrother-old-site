"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shield, CheckCircle2, ChevronRight, ChevronDown, TrendingUp, FileText, Scale, Lightbulb, Target, Handshake } from "lucide-react";
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

const consultingServices = [
  {
    icon: Target,
    title: "Technology Roadmapping",
    description: "Strategic planning to align your IT investments with business goals and create a clear path forward for technology adoption."
  },
  {
    icon: Handshake,
    title: "Vendor Selection",
    description: "Expert guidance in evaluating and selecting the right technology vendors and solutions for your specific needs."
  },
  {
    icon: TrendingUp,
    title: "Budget Planning",
    description: "Comprehensive IT budgeting and cost optimization strategies to maximize your technology investments."
  },
  {
    icon: Scale,
    title: "Compliance Guidance",
    description: "Navigate complex regulatory requirements with expert guidance on HIPAA, PCI-DSS, SOC 2, and other compliance standards."
  },
  {
    icon: Lightbulb,
    title: "Digital Transformation",
    description: "Modernize your business processes and leverage emerging technologies to drive innovation and competitive advantage."
  },
  {
    icon: FileText,
    title: "IT Strategy Development",
    description: "Develop comprehensive IT strategies that support your business objectives and position you for future growth."
  }
];

const benefits = [
  {
    title: "Strategic Alignment",
    description: "Ensure your technology investments directly support and advance your business objectives."
  },
  {
    title: "Cost Optimization",
    description: "Identify opportunities to reduce IT spending while improving capabilities and performance."
  },
  {
    title: "Risk Mitigation",
    description: "Proactively address security, compliance, and operational risks before they impact your business."
  },
  {
    title: "Competitive Advantage",
    description: "Leverage technology to differentiate your business and stay ahead of industry trends."
  }
];

export default function ITConsultingPage() {
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
              <Users className="w-4 h-4" />
              Core Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              IT Consulting
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Strategic guidance to align your technology with business goals. We help you make informed decisions that drive growth and efficiency.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Link href="/#contact" className="flex items-center gap-2">
                  Book a Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Consulting Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert guidance across all aspects of IT strategy, planning, and implementation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => (
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
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Transform Your Business Through Technology</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our consulting services help you leverage technology as a strategic asset, not just a cost center. We work with you to understand your business challenges and develop solutions that deliver real results.
              </p>
              <ul className="space-y-4">
                {[
                  "10+ years of industry experience",
                  "Vendor-neutral recommendations",
                  "Actionable insights and clear roadmaps",
                  "Ongoing support and guidance",
                  "Focus on ROI and business value",
                  "Customized solutions for your needs"
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
              className="grid grid-cols-2 gap-4"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className={`bg-primary/10 rounded-2xl p-6 ${index % 2 === 1 ? 'mt-8' : ''}`}>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Consulting Approach</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collaborative process designed to deliver meaningful outcomes for your business.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  title: "Assess",
                  description: "We begin with a thorough assessment of your current IT environment, business processes, and strategic goals to identify opportunities and challenges."
                },
                {
                  title: "Advise",
                  description: "Based on our assessment, we provide clear, actionable recommendations tailored to your specific situation and objectives."
                },
                {
                  title: "Plan",
                  description: "We work with you to develop a detailed implementation roadmap with priorities, timelines, and resource requirements."
                },
                {
                  title: "Support",
                  description: "We remain engaged throughout implementation, providing guidance and support to ensure successful outcomes."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Shape Your IT Strategy</h2>
            <p className="text-xl text-white/80 mb-8">
              Partner with TechBrother to develop an IT strategy that drives your business forward. Schedule a consultation to discuss your goals.
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
                <div className="relative w-40 h-16 brightness-0 invert">
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
