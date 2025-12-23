"use client";

import { motion } from "framer-motion";
import { Monitor, Shield, CheckCircle2, ChevronRight, Network, HardDrive, Headphones, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const managedServices = [
  {
    icon: Network,
    title: "24/7 Network Monitoring",
    description: "Round-the-clock monitoring of your network infrastructure to detect and resolve issues before they impact your business."
  },
  {
    icon: RefreshCw,
    title: "Proactive Maintenance",
    description: "Regular updates, patches, and system optimization to keep your IT environment running at peak performance."
  },
  {
    icon: Headphones,
    title: "Help Desk Support",
    description: "Dedicated support team available to assist your employees with any technical issues they encounter."
  },
  {
    icon: Shield,
    title: "Security Management",
    description: "Comprehensive cybersecurity solutions including antivirus, firewall management, and threat detection."
  },
  {
    icon: HardDrive,
    title: "Backup & Recovery",
    description: "Automated backup solutions and disaster recovery planning to protect your critical business data."
  },
  {
    icon: Clock,
    title: "Vendor Management",
    description: "We handle all communications and coordination with your technology vendors, saving you time and hassle."
  }
];

const benefits = [
  {
    title: "Predictable Costs",
    description: "Fixed monthly fees make IT budgeting simple and eliminate surprise expenses."
  },
  {
    title: "Reduced Downtime",
    description: "Proactive monitoring and maintenance minimize system outages and productivity losses."
  },
  {
    title: "Enhanced Security",
    description: "Enterprise-grade security measures protect your business from evolving cyber threats."
  },
  {
    title: "Expert Access",
    description: "Gain access to a team of IT professionals with diverse skills and experience."
  }
];

export default function ManagedITPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
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
              <Monitor className="w-4 h-4" />
              Core Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Managed IT Services
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Comprehensive IT management that keeps your business running smoothly. From 24/7 monitoring to proactive maintenance, we handle your technology so you can focus on growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Link href="/#contact" className="flex items-center gap-2">
                  Get a Quote
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

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose Managed IT?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Outsourcing your IT management to TechBrother means gaining a dedicated team of experts without the overhead of hiring full-time staff. We become an extension of your business.
              </p>
              <ul className="space-y-4">
                {[
                  "Eliminate the cost and complexity of managing IT in-house",
                  "Access enterprise-grade tools and expertise",
                  "Scale your IT resources as your business grows",
                  "Focus on your core business while we handle technology",
                  "Reduce risk with proactive security measures",
                  "Get predictable monthly costs for easy budgeting"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className={`bg-primary/10 rounded-2xl p-6 ${index % 2 === 1 ? 'mt-8' : ''}`}>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What&apos;s Included</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to keep your IT infrastructure secure, optimized, and running 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managedServices.map((service, index) => (
              <div key={index}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started with managed IT services is simple and straightforward.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  title: "Assessment",
                  description: "We start with a comprehensive evaluation of your current IT infrastructure, identifying strengths, weaknesses, and opportunities for improvement."
                },
                {
                  title: "Customized Plan",
                  description: "Based on your assessment, we create a tailored managed services plan that addresses your specific needs and budget."
                },
                {
                  title: "Onboarding",
                  description: "Our team seamlessly integrates with your operations, setting up monitoring tools and establishing support procedures."
                },
                {
                  title: "Ongoing Management",
                  description: "We continuously monitor, maintain, and optimize your IT environment while providing responsive support for any issues."
                }
              ].map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#041324] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your IT?</h2>
            <p className="text-xl text-white/80 mb-8">
              Let us handle your technology so you can focus on what matters most - growing your business. Contact us today for a free consultation.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
              <Link href="/#contact" className="flex items-center gap-2">
                Schedule Consultation
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
