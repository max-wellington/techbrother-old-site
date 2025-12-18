"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Wrench, Users, Shield, Clock, Headphones, ChevronRight, Server, Cloud, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import Typed from "typed.js";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LOGO_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/FullLogo_Transparent_NoBuffer-1766035975850.png?width=8000&height=8000&resize=contain";

const healthCheckQuestions = [
  {
    question: "How would you rate your current IT infrastructure?",
    options: [
      { text: "Excellent - Modern and well-maintained", score: 5 },
      { text: "Good - Adequate for current needs", score: 4 },
      { text: "Fair - Some areas need improvement", score: 3 },
      { text: "Poor - Frequent issues and downtime", score: 2 },
      { text: "Very Poor - Constant problems", score: 1 }
    ]
  },
  {
    question: "How often do you experience IT-related downtime?",
    options: [
      { text: "Rarely - Less than once per month", score: 5 },
      { text: "Occasionally - 1-2 times per month", score: 4 },
      { text: "Regularly - 3-4 times per month", score: 3 },
      { text: "Frequently - Weekly issues", score: 2 },
      { text: "Constantly - Daily problems", score: 1 }
    ]
  },
  {
    question: "Do you have a dedicated IT support team?",
    options: [
      { text: "Yes - Full-time IT staff", score: 5 },
      { text: "Yes - Part-time IT support", score: 4 },
      { text: "No - Handle IT ourselves", score: 3 },
      { text: "No - Rely on break-fix services", score: 2 },
      { text: "No IT support at all", score: 1 }
    ]
  },
  {
    question: "How secure is your current IT environment?",
    options: [
      { text: "Very secure - Multiple layers of protection", score: 5 },
      { text: "Secure - Basic security measures in place", score: 4 },
      { text: "Somewhat secure - Room for improvement", score: 3 },
      { text: "Insecure - Minimal security measures", score: 2 },
      { text: "Very insecure - No security measures", score: 1 }
    ]
  },
  {
    question: "How well does your IT support your business goals?",
    options: [
      { text: "Perfectly - IT drives business growth", score: 5 },
      { text: "Well - IT supports most operations", score: 4 },
      { text: "Adequately - IT meets basic needs", score: 3 },
      { text: "Poorly - IT hinders productivity", score: 2 },
      { text: "Very poorly - IT is a major obstacle", score: 1 }
    ]
  },
  {
    question: "What's your biggest IT challenge?",
    options: [
      { text: "Keeping up with technology trends", score: 3 },
      { text: "Managing cybersecurity threats", score: 3 },
      { text: "Controlling IT costs", score: 3 },
      { text: "Ensuring system reliability", score: 3 },
      { text: "Lack of IT expertise", score: 3 }
    ]
  }
];

export default function Home() {
  const el = useRef<HTMLSpanElement>(null);
  const [healthCheckStep, setHealthCheckStep] = useState<"start" | "questions" | "results">("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, {
      strings: [
        'Transform Your Business',
        'Optimize Your IT',
        'Drive Innovation',
        'Secure Your Future'
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const startHealthCheck = () => {
    setHealthCheckStep("questions");
    setCurrentQuestionIndex(0);
    setTotalScore(0);
    setAnswers([]);
  };

  const selectAnswer = (score: number, text: string) => {
    setTotalScore(prev => prev + score);
    setAnswers(prev => [...prev, text]);

    setTimeout(() => {
      if (currentQuestionIndex < healthCheckQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setHealthCheckStep("results");
      }
    }, 400);
  };

  const getScoreInfo = (score: number) => {
    const maxScore = healthCheckQuestions.length * 5;
    const finalScore = Math.round((score / maxScore) * 100);
    
    let description = "";
    let recommendations: string[] = [];

    if (finalScore >= 80) {
      description = "Excellent! Your IT infrastructure is well-managed and secure.";
      recommendations = [
        "Optimize existing systems for better performance",
        "Explore advanced cybersecurity solutions",
        "Consider strategic IT consulting for growth planning"
      ];
    } else if (finalScore >= 60) {
      description = "Good foundation with opportunities for optimization.";
      recommendations = [
        "Upgrade security measures and backup systems",
        "Implement proactive maintenance schedules",
        "Consider managed IT services for better support"
      ];
    } else if (finalScore >= 40) {
      description = "Your IT setup needs attention to improve reliability and security.";
      recommendations = [
        "Consider comprehensive IT infrastructure assessment",
        "Implement 24/7 monitoring and support",
        "Develop cybersecurity strategy and protocols"
      ];
    } else {
      description = "Critical IT issues that are likely impacting your business operations.";
      recommendations = [
        "Immediate security audit required",
        "Urgent infrastructure modernization needed",
        "Establish business continuity plan"
      ];
    }

    if (answers.includes("Lack of IT expertise")) {
      recommendations.push("Partner with managed IT services provider");
    }
    if (answers.includes("Frequent downtime")) {
      recommendations.push("Implement redundancy and failover systems");
    }

    return { finalScore, description, recommendations };
  };

  const scoreInfo = getScoreInfo(totalScore);

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-16 h-12">
              <Image 
                src={LOGO_URL}
                alt="MT IT Services Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-primary-foreground/80 hover:text-white transition-colors font-medium">Services</Link>
            <Link href="#about" className="text-primary-foreground/80 hover:text-white transition-colors font-medium">About</Link>
            <Link href="#contact" className="text-primary-foreground/80 hover:text-white transition-colors font-medium">Contact</Link>
          </nav>
          <Button variant="secondary" asChild>
            <Link href="#contact">Get Started</Link>
          </Button>
        </div>
      </header>

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trusted IT Partner
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight mb-6 min-h-[150px] md:min-h-[120px]">
              <span ref={el} />
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              We deliver comprehensive managed IT services, expert consulting, and seamless project execution to help your business thrive in the digital age.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" variant="default" asChild className="gap-2">
                <Link href="#contact">
                  Schedule Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">Explore Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2", label: "Active Clients" },
              { value: "99.9%", label: "Uptime Guaranteed" },
              { value: "24/7", label: "Support Available" },
              { value: "10+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three pillars of IT excellence designed to meet your unique business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Monitor className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Managed IT Services</CardTitle>
                  <CardDescription className="text-base">
                    Comprehensive IT management for seamless business operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      24/7 Network Monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Proactive Maintenance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Help Desk Support
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Security Management
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Backup & Recovery
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Wrench className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">One-Off Projects</CardTitle>
                  <CardDescription className="text-base">
                    Expert execution for your specific IT initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Infrastructure Upgrades
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Cloud Migrations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Office Relocations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      System Deployments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Security Audits
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">IT Consulting</CardTitle>
                  <CardDescription className="text-base">
                    Strategic guidance to align technology with your goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Technology Roadmapping
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Vendor Selection
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Budget Planning
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Compliance Guidance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Digital Transformation
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 shadow-2xl">
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {healthCheckStep === "start" && (
                    <motion.div
                      key="start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">Free IT Health Check</h3>
                      <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                        Discover how your current IT setup compares to industry standards and get personalized recommendations in 60 seconds.
                      </p>
                      <Button onClick={startHealthCheck} size="lg" variant="secondary" className="font-bold px-12 h-14 text-lg">
                        Start Assessment
                      </Button>
                    </motion.div>
                  )}

                  {healthCheckStep === "questions" && (
                    <motion.div
                      key="questions"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-white/80">Question {currentQuestionIndex + 1} of {healthCheckQuestions.length}</span>
                          <span className="text-sm font-medium text-white/80">{Math.round(((currentQuestionIndex + 1) / healthCheckQuestions.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="bg-white h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestionIndex + 1) / healthCheckQuestions.length) * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-8">{healthCheckQuestions[currentQuestionIndex].question}</h3>
                      <div className="grid gap-3">
                        {healthCheckQuestions[currentQuestionIndex].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectAnswer(option.score, option.text)}
                            className="w-full text-left p-4 rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all text-white font-medium"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {healthCheckStep === "results" && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">Your IT Health Score</h3>
                      <div className="text-7xl font-bold text-white mb-4">{scoreInfo.finalScore}</div>
                      <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                        {scoreInfo.description}
                      </p>
                      
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 text-left max-w-2xl mx-auto">
                        <h4 className="font-bold text-white text-lg mb-4">Recommended Next Steps:</h4>
                        <ul className="space-y-3">
                          {scoreInfo.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/90">
                              <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild className="font-bold">
                          <Link href="#contact">Schedule Consultation</Link>
                        </Button>
                        <Button size="lg" variant="outline" onClick={startHealthCheck} className="text-white border-white hover:bg-white/10 bg-transparent">
                          Retake Assessment
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Background abstract shapes */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Why Choose MT IT Services?</h2>
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                With over 10 years of experience, we&apos;ve built a solid foundation for delivering reliable, innovative IT solutions. We focus on quality and dedicated partnership, currently serving a select group of active clients to ensure personalized attention and excellence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Clock, label: "Rapid Response" },
                  { icon: Shield, label: "Enterprise Security" },
                  { icon: Headphones, label: "Dedicated Support" },
                  { icon: Cloud, label: "Cloud Expertise" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Server className="w-8 h-8 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Infrastructure</h3>
                <p className="text-sm opacity-80">Modern, scalable IT infrastructure solutions</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm mt-8">
                <Cloud className="w-8 h-8 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Cloud Services</h3>
                <p className="text-sm opacity-80">Seamless migration and management</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Lock className="w-8 h-8 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Cybersecurity</h3>
                <p className="text-sm opacity-80">Comprehensive protection strategies</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm mt-8">
                <Headphones className="w-8 h-8 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Support</h3>
                <p className="text-sm opacity-80">Round-the-clock technical assistance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Let&apos;s Talk Technology</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to transform your IT operations? Get in touch with our team to discuss your needs.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Headphones className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Expert Support</h3>
                    <p className="text-muted-foreground">Our experienced team is always available to help you resolve issues quickly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Fast Response</h3>
                    <p className="text-muted-foreground">We respond to all inquiries within 1 business hour.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Free Assessment</h3>
                    <p className="text-muted-foreground">Get a complimentary IT infrastructure evaluation.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Request a Consultation</CardTitle>
                  <CardDescription>Fill out the form below and we&apos;ll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                      <Input type="email" placeholder="john@company.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                      <Input placeholder="Company Name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                      <Textarea placeholder="Tell us about your IT needs..." rows={4} />
                    </div>
                    <Button type="submit" variant="default" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-20 h-16 brightness-0 invert">
                  <Image 
                    src={LOGO_URL}
                    alt="MT IT Services Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-background/70 max-w-sm">
                Your trusted partner for managed IT services, projects, and consulting. Currently serving 2 active clients with 10+ years of expertise.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2 text-background/70">
                <li><Link href="#services" className="hover:text-background transition-colors">Managed IT</Link></li>
                <li><Link href="#services" className="hover:text-background transition-colors">One-Off Projects</Link></li>
                <li><Link href="#services" className="hover:text-background transition-colors">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-background/70">
                <li><Link href="#about" className="hover:text-background transition-colors">About Us</Link></li>
                <li><Link href="#contact" className="hover:text-background transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/60">
            <p>&copy; {new Date().getFullYear()} MT IT Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
