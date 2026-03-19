import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValue, animate } from 'motion/react';
import { 
  Heart, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Award,
  HandHeart,
  Target,
  Info,
  CheckCircle2,
  TrendingUp,
  Zap,
  BookOpen,
  Scale,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  Menu,
  X,
  ArrowUpRight,
  ChevronUp,
  Quote,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Star
} from 'lucide-react';

const NGO_DETAILS = {
  name: "Obafemi Abati Foundation",
  motto: "One for all, all for one",
  registration: "RC. 8384709",
  address: "Plot 9, Agoro Court, Odunifa Street by Kano Street, Ebute Metta, Lagos",
  nairaAccount: {
    number: "1029681768",
    bank: "United Bank for Africa (UBA)",
    name: "Obafemi Abati Foundation"
  },
  dollarAccount: {
    number: "1700001897",
    bank: "Eco Bank"
  },
  pillars: [
    {
      title: "Community Development",
      desc: "Fostering grassroots infrastructure and social cohesion programs through localized leadership and sustainable planning.",
      icon: <Globe size={24} />,
      color: "bg-[#002147]",
      textColor: "text-white",
      delay: 0.1
    },
    {
      title: "Less Privileged Support",
      desc: "Direct intervention for food security, health, and primary education essentials for underserved families in urban and rural clusters.",
      icon: <HandHeart size={24} />,
      isLarge: true,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
      delay: 0.2
    },
    {
      title: "Policy Sensitization",
      desc: "Advocating for inclusive social policies and civic awareness among local populations to ensure fair representation.",
      icon: <Lightbulb size={24} />,
      color: "bg-white",
      textColor: "text-stone-900",
      delay: 0.3
    },
    {
      title: "Peace Promotion",
      desc: "Conflict resolution training and peacebuilding initiatives in diverse communities to foster long-term stability.",
      icon: <ShieldCheck size={24} />,
      color: "bg-stone-200",
      textColor: "text-stone-900",
      delay: 0.4
    },
    {
      title: "Vulnerable Empowerment",
      desc: "Skill acquisition and micro-grants for widows and unemployed youth to build economic resilience.",
      icon: <Users size={24} />,
      color: "bg-[#F27D26]",
      textColor: "text-white",
      delay: 0.5
    }
  ],
  roadmap: [
    { year: "2024—2025", title: "Digital Literacy Hubs", desc: "Establishing 10 solar-powered computer labs in rural communities to provide basic coding and data management training." },
    { year: "2026", title: "Sustainable Agri-Orchards", desc: "Launching community-managed farms that fund local scholarship programs through sustainable cash-crop harvesting." },
    { year: "2027 & Beyond", title: "Abati Leadership Institute", desc: "Construction of a premier residential academy for high-potential, low-income students focusing on ethics and governance.", isDark: true }
  ],
  faqs: [
    { q: "How are the funds utilized?", a: "85% of all donations go directly to program implementation, with 15% reserved for administrative transparency and operational audits." },
    { q: "Is the foundation registered?", a: "Yes, we are a fully registered Non-Governmental Organization with the Corporate Affairs Commission (CAC) under registration number RC. 8384709." },
    { q: "Can I volunteer as a mentor?", a: "Absolutely. We are always looking for professionals to join our Mentorship Circles. Please reach out via our contact form." }
  ],
  impactStats: [
    { value: 12500, label: "People Impacted", suffix: "+" },
    { value: 48, label: "Projects Completed", suffix: "" },
    { value: 15, label: "Communities Reached", suffix: "" },
    { value: 92, label: "Scholarships Awarded", suffix: "%" }
  ],
  successStories: [
    {
      name: "Tunde Bakare",
      role: "Scholarship Recipient",
      story: "The foundation didn't just pay my fees; they gave me a mentor who guided me through my engineering degree. Today, I'm working at a top firm in Lagos."
    },
    {
      name: "Mrs. Adeyemi",
      role: "Widow Empowerment Program",
      story: "After losing my husband, I had no means of income. The micro-grant and tailoring training from the foundation helped me start a business that now supports my four children."
    },
    {
      name: "Ikorodu Community",
      role: "Resource Hub Project",
      story: "The solar-powered computer lab has transformed our local school. Our children now have access to the same digital tools as those in the city."
    }
  ]
};

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-32 px-6 md:px-12 lg:px-24 ${className}`}>
    {children}
  </section>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left hover:text-[#F27D26] transition-colors group"
      >
        <span className="font-bold text-xl md:text-2xl font-serif group-hover:translate-x-1 transition-transform">{question}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#F27D26] text-white rotate-180' : 'bg-stone-50 text-stone-400'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-stone-600 leading-relaxed text-lg max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = "" , delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest as number));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration: 2, delay, ease: "easeOut" });
      return animation.stop;
    }
  }, [isInView, value, delay, count]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center md:text-left"
    >
      <p className="text-5xl md:text-7xl font-serif font-bold text-[#F27D26] mb-2 tracking-tighter">
        {displayValue.toLocaleString()}{suffix}
      </p>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{label}</p>
    </motion.div>
  );
};

export default function App() {
  const [copied, setCopied] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xzdjodry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('idle');
      // Using a simple alert for now as per user request for functionality
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Support the Obafemi Abati Foundation - ${NGO_DETAILS.motto}`);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const navLinks = [
    { name: "Who We Are", href: "#about" },
    { name: "Objectives", href: "#aims" },
    { name: "Academic Orchard", href: "#orchard" },
    { name: "Planning", href: "#roadmap" },
    { name: "Donation", href: "#donate" },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-[#F27D26]/20 selection:text-[#F27D26] overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#F27D26] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-stone-100 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="font-serif font-bold text-2xl tracking-tighter text-[#002147] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F27D26] rounded-full flex items-center justify-center text-white text-xs">OA</div>
              <span className="hidden sm:inline">{NGO_DETAILS.name}</span>
            </span>
          </motion.div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name} 
                href={link.href} 
                className="hover:text-[#F27D26] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F27D26] transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              href="#donate" 
              className="px-8 py-3 bg-[#002147] text-white rounded-full hover:bg-[#003366] transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              Donate Now
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-3 bg-stone-50 rounded-full text-stone-900 hover:bg-stone-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white border-b border-stone-100 lg:hidden shadow-2xl overflow-hidden"
            >
              <div className="p-8 flex flex-col gap-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-serif font-bold text-[#002147] hover:text-[#F27D26] transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
                <a 
                  href="#donate" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-5 bg-[#002147] text-white text-center rounded-xl font-bold uppercase tracking-widest shadow-lg"
                >
                  Donate Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <Section className="pt-64 pb-48 bg-[#F8F9FA] relative overflow-hidden min-h-screen flex items-center">
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute top-20 right-[-10%] w-[60%] h-[80%] bg-white skew-x-[-12deg] transform -z-0 shadow-2xl rounded-[4rem]" 
        />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-[#F27D26]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F27D26]">
                ESTABLISHED {NGO_DETAILS.registration}
              </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter mb-10 leading-[0.85] text-[#002147]">
              Legacy <br />
              <span className="italic font-normal text-[#F27D26] relative inline-block">
                Defined
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute -bottom-4 left-0 w-full h-4 text-[#F27D26]/30" viewBox="0 0 100 10" preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="6" />
                </motion.svg>
              </span> <br />
              by Action.
            </h1>
            <p className="text-xl text-stone-500 mb-12 max-w-lg leading-relaxed font-light">
              Upholding the legacy of excellence through community empowerment and scholarly advancement. Dedicated to the principle of <span className="font-bold text-stone-800">"One for all, all for one"</span>.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <a href="#about" className="group px-10 py-5 bg-[#002147] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#003366] transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Our Mission
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href="#donate" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#002147] hover:text-[#F27D26] transition-colors">
                <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-[#F27D26] transition-colors">
                  <Heart size={16} className="group-hover:fill-[#F27D26] transition-all" />
                </div>
                Support Us
              </a>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[16px] border-white relative group"
            >
              <img 
                src="https://thumbs.dreamstime.com/b/business-people-walking-up-staircase-team-teamwork-success-concept-isolated-vector-illustration-323378686.jpg" 
                alt="Community Support" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 border border-stone-50"
            >
              <div className="text-center">
                <Sparkles size={24} className="text-[#F27D26] mx-auto mb-1" />
                <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Impact Driven</p>
              </div>
            </motion.div>
            
            {/* Quote Box */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-12 -left-12 bg-[#F27D26] text-white p-10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(242,125,38,0.5)] max-w-[340px]"
            >
              <Quote size={32} className="text-white/20 mb-4" />
              <p className="font-serif italic text-2xl leading-tight mb-6">
                "Education is the most powerful weapon which you can use to change the world."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/30" />
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 whitespace-nowrap">Nelson Mandela</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Impact Statistics Section */}
      <Section className="bg-white py-24 border-y border-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
            {NGO_DETAILS.impactStats.map((stat, index) => (
              <StatItem 
                key={index} 
                value={stat.value} 
                label={stat.label} 
                suffix={stat.suffix} 
                delay={index * 0.1} 
              />
            ))}
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-[#F27D26]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F27D26]">
                  OUR STORY
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif font-bold text-[#002147] mb-10 leading-[0.9] tracking-tighter">
                Rooted in <br />Academic <br />Integrity.
              </h2>
              <div className="relative mt-20 hidden lg:block">
                <div className="w-80 h-80 rounded-full border border-stone-50 absolute -top-20 -left-20 animate-[spin_20s_linear_infinite]" />
                <div className="w-64 h-64 rounded-[3rem] bg-[#F8F9FA] relative z-10 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-inner">
                  <Award size={64} className="text-[#F27D26]" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              <p className="text-2xl md:text-3xl text-stone-700 leading-snug font-serif italic border-l-4 border-[#F27D26] pl-8">
                "The Obafemi Abati Foundation is more than a philanthropic organization; it is a repository of shared human values."
              </p>
              <div className="space-y-8 text-stone-500 text-lg leading-relaxed font-light">
                <p>
                  Born from a desire to bridge the gap between potential and opportunity, we foster an environment where intellectual curiosity meets communal responsibility. Our narrative is one of resilience and transformation.
                </p>
                <p>
                  For years, we have worked silently at the intersection of education and social welfare, ensuring that the legacy of Obafemi Abati — a legacy of service, discipline, and scholarly rigor — continues to inspire future generations of Nigerian leaders.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-12">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-10 bg-[#F8F9FA] rounded-[2rem] border border-transparent hover:border-stone-200 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#F27D26] group-hover:text-white transition-all">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-[#002147] mb-3 tracking-tight">Our Mission</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">To empower vulnerable populations through structured educational mentorship and community development frameworks.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-10 bg-[#F8F9FA] rounded-[2rem] border border-transparent hover:border-stone-200 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#F27D26] group-hover:text-white transition-all">
                    <Target size={24} />
                  </div>
                  <h4 className="font-bold text-xl text-[#002147] mb-3 tracking-tight">Our Vision</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">A society where every individual, regardless of socioeconomic standing, has access to the tools of intellectual and economic liberation.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Five Pillars of Impact */}
      <Section id="aims" className="bg-[#F8F9FA] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-12 h-px bg-[#F27D26]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F27D26]">STRATEGIC FOCUS</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl font-serif font-bold text-[#002147] tracking-tighter"
              >
                Five Pillars of Impact
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-stone-500 text-lg font-light max-w-xs leading-relaxed"
            >
              Strategic objectives designed to create systemic change across Nigerian communities.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8">
            {NGO_DETAILS.pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pillar.delay, duration: 0.8 }}
                whileHover={{ y: -12 }}
                className={`${pillar.isLarge ? 'md:col-span-8' : 'md:col-span-4'} h-full group`}
              >
                <div className={`${pillar.color || 'bg-white'} ${pillar.textColor || 'text-stone-900'} rounded-[2.5rem] p-12 h-full shadow-sm flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-2xl`}>
                  {pillar.image && (
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-30 transition-all duration-700 group-hover:scale-110">
                      <img src={pillar.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${pillar.textColor === 'text-white' ? 'bg-white/10' : 'bg-stone-50'}`}>
                    {React.cloneElement(pillar.icon as React.ReactElement, { size: 32, className: pillar.textColor === 'text-white' ? 'text-white' : 'text-[#F27D26]' })}
                  </div>
                  <h4 className="text-3xl font-serif font-bold mb-6 tracking-tight">{pillar.title}</h4>
                  <p className={`text-lg leading-relaxed font-light ${pillar.textColor === 'text-white' ? 'text-white/70' : 'text-stone-500'}`}>
                    {pillar.desc}
                  </p>
                  <div className="mt-auto pt-12">
                    <div className={`h-1.5 w-16 rounded-full transition-all duration-700 group-hover:w-full ${pillar.textColor === 'text-white' ? 'bg-white/20' : 'bg-[#F27D26]/20'}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* The Academic Orchard */}
      <Section id="orchard" className="bg-[#002147] text-white relative overflow-hidden py-48">
        {/* Immersive Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#F27D26_0%,transparent_50%)] blur-[120px] -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-[#F27D26]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F27D26]">FLAGSHIP INITIATIVE</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif font-bold mb-10 leading-[0.9] tracking-tighter">The Academic <br />Orchard.</h2>
              <p className="text-blue-100/70 text-xl mb-16 leading-relaxed font-light max-w-lg">
                A flagship initiative designed to cultivate intellectual growth through "Mentorship Circles" and "Resource Hubs." We provide the fertile ground where knowledge meets practical application.
              </p>
              
              <div className="grid grid-cols-2 gap-16">
                <div className="group cursor-default">
                  <StatItem value={2500} label="Lives Transformed" suffix="+" />
                </div>
                <div className="group cursor-default">
                  <StatItem value={15} label="Communities Served" suffix="+" />
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-8">
              <motion.div 
                whileHover={{ x: 15, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 transition-all duration-500 group"
              >
                <div className="flex gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#F27D26]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F27D26] group-hover:rotate-6 transition-all duration-500">
                    <Users size={32} className="text-[#F27D26] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-4 tracking-tight">Mentorship Circles</h4>
                    <p className="text-base text-blue-100/60 leading-relaxed font-light">Connecting veterans of industry with emerging scholars for one-on-one career and academic guidance.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 15, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 transition-all duration-500 group"
              >
                <div className="flex gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#F27D26]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F27D26] group-hover:rotate-6 transition-all duration-500">
                    <BookOpen size={32} className="text-[#F27D26] group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-4 tracking-tight">Resource Hubs</h4>
                    <p className="text-base text-blue-100/60 leading-relaxed font-light">Digital and physical libraries stocked with curriculum-essential textbooks and research materials.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Strategic Roadmap */}
      <Section id="roadmap" className="bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-32">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-[#F27D26]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F27D26]">FUTURE PLANNING</span>
              <span className="w-8 h-px bg-[#F27D26]" />
            </motion.div>
            <h2 className="text-6xl font-serif font-bold text-[#002147] mb-6 tracking-tighter">Strategic Roadmap.</h2>
            <p className="text-stone-500 text-lg font-light uppercase tracking-[0.2em]">Our projected milestones for the next decade.</p>
          </div>
          
          <div className="relative space-y-24">
            {/* Vertical Line with Progress */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-100 -translate-x-1/2 hidden md:block">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-[#F27D26] origin-top"
                style={{ 
                  height: '100%',
                  scaleY: useSpring(useTransform(scrollYProgress, [0.6, 0.8], [0, 1]), { stiffness: 100, damping: 30 })
                }}
              />
            </div>
            
            {NGO_DETAILS.roadmap.map((item, index) => (
              <div key={index} className={`relative flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 50,
                    damping: 20,
                    delay: index * 0.1 
                  }}
                  className={`relative z-10 p-12 rounded-[3rem] border w-full md:w-[45%] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ${item.isDark ? 'bg-[#002147] text-white border-[#002147]' : 'bg-[#F8F9FA] border-stone-50 hover:bg-white'}`}
                >
                  <div className={`text-5xl font-serif font-bold mb-6 tracking-tighter ${item.isDark ? 'text-[#F27D26]' : 'text-stone-300'}`}>
                    {item.year}
                  </div>
                  <div>
                    <h4 className={`text-3xl font-bold mb-4 tracking-tight ${item.isDark ? 'text-white' : 'text-[#002147]'}`}>{item.title}</h4>
                    <p className={`text-lg leading-relaxed font-light ${item.isDark ? 'text-white/60' : 'text-stone-500'}`}>{item.desc}</p>
                  </div>
                </motion.div>
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`hidden md:flex w-12 h-12 rounded-full items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white border-8 shadow-sm z-20 ${item.isDark ? 'border-[#F27D26]' : 'border-stone-50'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${item.isDark ? 'bg-[#F27D26]' : 'bg-stone-300'}`} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Success Stories Section */}
      <Section id="stories" className="bg-[#F8F9FA] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-px bg-[#F27D26]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F27D26]">REAL IMPACT</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif font-bold text-[#002147] tracking-tighter leading-[0.9]">Success <br />Stories.</h2>
            </div>
            <p className="text-stone-500 text-lg font-light max-w-sm leading-relaxed">
              Voices from the communities we serve, sharing the transformative power of collective action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {NGO_DETAILS.successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group bg-white p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-stone-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
                  <Quote size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} className="fill-[#F27D26] text-[#F27D26]" />
                    ))}
                  </div>
                  <p className="text-stone-600 leading-relaxed italic font-light text-xl mb-10">
                    "{story.story}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#002147]/5 flex items-center justify-center text-[#002147] font-bold">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[#002147] font-bold text-lg leading-tight">{story.name}</p>
                      <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">{story.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Donation Section */}
      <Section id="donate" className="bg-[#F8F9FA] relative overflow-hidden py-48">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-px bg-[#F27D26]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F27D26]">SUPPORT OUR CAUSE</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif font-bold text-[#002147] mb-10 leading-[0.9] tracking-tighter">The Power of <br />Generosity.</h2>
              <p className="text-xl text-stone-500 mb-16 leading-relaxed font-light max-w-lg">
                Every naira and dollar contributed fuels a child's dream, sustains a family, and builds a legacy of hope. We invite you to be part of our story of impact.
              </p>
              
              <div className="space-y-8">
                {[
                  { label: "Naira Account (Local)", details: NGO_DETAILS.nairaAccount, id: 'naira' },
                  { label: "USD Account (International)", details: NGO_DETAILS.dollarAccount, id: 'dollar' }
                ].map((acc) => (
                  <motion.div 
                    key={acc.id}
                    whileHover={{ scale: 1.03, x: 10 }}
                    className="p-10 bg-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-stone-100 relative group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
                      <Globe size={160} />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">{acc.label}</span>
                      <button 
                        onClick={() => copyToClipboard(acc.details.number, acc.id)}
                        className={`p-3 rounded-full transition-all duration-300 ${copied === acc.id ? 'bg-green-50 text-green-600' : 'bg-stone-50 text-stone-400 hover:text-[#F27D26] hover:bg-[#F27D26]/10'}`}
                        title="Copy Account Number"
                      >
                        {copied === acc.id ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                    <p className="text-5xl font-serif font-bold text-[#002147] mb-3 tracking-tighter group-hover:text-[#F27D26] transition-colors">{acc.details.number}</p>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-[0.2em]">{acc.details.bank}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-stone-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-8">Spread the word</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => shareOnSocial('facebook')}
                    className="flex items-center gap-3 px-6 py-3 bg-[#1877F2] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <Facebook size={16} fill="currentColor" />
                    Facebook
                  </button>
                  <button 
                    onClick={() => shareOnSocial('twitter')}
                    className="flex items-center gap-3 px-6 py-3 bg-[#000000] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <Twitter size={16} fill="currentColor" />
                    Twitter
                  </button>
                  <button 
                    onClick={() => shareOnSocial('linkedin')}
                    className="flex items-center gap-3 px-6 py-3 bg-[#0077B5] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <Linkedin size={16} fill="currentColor" />
                    LinkedIn
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="bg-white p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-stone-50 relative"
            >
              <h3 className="text-4xl font-serif font-bold text-[#002147] mb-10 tracking-tight">Gift Notification.</h3>
              
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-24 text-center"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Check size={48} />
                  </div>
                  <h4 className="text-3xl font-bold text-[#002147] mb-4 tracking-tight">Thank You!</h4>
                  <p className="text-stone-500 text-lg font-light">Your notification has been received. We appreciate your kindness.</p>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 ml-1">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        className="w-full px-6 py-5 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#F27D26]/10 focus:border-[#F27D26] outline-none transition-all text-lg" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 ml-1">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        className="w-full px-6 py-5 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#F27D26]/10 focus:border-[#F27D26] outline-none transition-all text-lg" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 ml-1">Comments / Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={5}
                      className="w-full px-6 py-5 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#F27D26]/10 focus:border-[#F27D26] outline-none transition-all resize-none text-lg" 
                      placeholder="Tell us about your donation or leave a message of support..."
                    />
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit" 
                    className="w-full py-6 bg-[#002147] text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#003366] transition-all hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    {formStatus === 'submitting' ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Notification
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-3 text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
                    <ShieldCheck size={14} className="text-green-500" />
                    Secured by verified bank protocols
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Common Enquiries */}
      <Section className="bg-white py-48">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-[#F27D26]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F27D26]">QUESTIONS</span>
              <span className="w-8 h-px bg-[#F27D26]" />
            </motion.div>
            <h2 className="text-6xl font-serif font-bold text-[#002147] tracking-tighter">Common Enquiries.</h2>
          </div>
          <div className="space-y-4">
            {NGO_DETAILS.faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem question={faq.q} answer={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white py-32 px-6 border-t border-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-2">
              <h4 className="font-serif font-bold text-3xl text-[#002147] mb-8 tracking-tighter">{NGO_DETAILS.name}</h4>
              <p className="text-lg text-stone-500 max-w-sm leading-relaxed mb-10 font-light">
                {NGO_DETAILS.address} <br />
                Registration: <span className="font-bold text-[#002147]">{NGO_DETAILS.registration}</span>
              </p>
              <div className="flex gap-6">
                {[Globe, Mail, Phone].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 rounded-2xl border border-stone-100 flex items-center justify-center text-stone-400 hover:text-[#F27D26] hover:border-[#F27D26] hover:bg-[#F27D26]/5 transition-all shadow-sm hover:shadow-md">
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-10">FOUNDATION</h5>
              <ul className="space-y-6 text-base text-stone-500 font-light">
                {[
                  { name: 'Objectives', href: '#aims' },
                  { name: 'Planning', href: '#roadmap' },
                  { name: 'Gift Notification', href: '#donate' },
                  { name: 'Donations', href: '#donate' }
                ].map((item) => (
                  <li key={item.name}><a href={item.href} className="hover:text-[#F27D26] transition-colors flex items-center gap-3 group">
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-10">CONNECT</h5>
              <ul className="space-y-6 text-base text-stone-500 font-light">
                <li><a href="#" className="hover:text-[#F27D26] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#F27D26] transition-colors">FAQs</a></li>
                <li className="pt-6">
                  <p className="italic font-serif text-[#F27D26] text-2xl leading-tight">"One for all, <br />all for one"</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-16 border-t border-stone-50 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-[10px] text-stone-400 uppercase tracking-[0.3em] font-bold">
              © {new Date().getFullYear()} {NGO_DETAILS.name}. All rights reserved.
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-[#F27D26] transition-colors"
            >
              BACK TO TOP
              <div className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center group-hover:border-[#F27D26] group-hover:bg-[#F27D26]/5 transition-all">
                <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
