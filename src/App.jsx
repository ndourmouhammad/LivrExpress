import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MousePointer2, 
  ArrowRight, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  Menu, 
  X, 
  User, 
  Phone, 
  MapPin, 
  Package, 
  Zap 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 1. NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-link', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [mobileMenuOpen]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-6xl px-6 py-3 rounded-[2rem] flex items-center justify-between transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/75 backdrop-blur-xl border border-foreground/5 shadow-md py-3' 
          : 'bg-transparent border-transparent py-4'
      }`} ref={navRef}>
        <div className={`font-sans font-bold text-lg tracking-tight flex items-center gap-2 transition-colors duration-300 ${
          isScrolled ? 'text-foreground' : 'text-white'
        }`}>
          <span className="inline-block w-3 h-3 rounded-full bg-accent animate-pulse"></span>
          LivrExpress
        </div>
        <div className={`hidden md:flex gap-8 text-sm font-semibold tracking-wide transition-colors duration-300 ${
          isScrolled ? 'text-foreground/80' : 'text-white/95'
        }`}>
          <a href="#features" className="link-lift hover:text-accent transition-colors">Fonctionnalités</a>
          <a href="#manifesto" className="link-lift hover:text-accent transition-colors">Manifeste</a>
          <a href="#protocol" className="link-lift hover:text-accent transition-colors">Protocole</a>
          <a href="#quote" className="link-lift hover:text-accent transition-colors">Calculateur Devis</a>
        </div>
        <div className="hidden md:block">
          <a href="#quote" className="btn-magnetic px-5 py-2.5 rounded-full bg-accent text-white text-sm font-semibold overflow-hidden group relative flex items-center">
            <span className="relative z-10">Devis Rapide</span>
            <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></span>
          </a>
        </div>
        <button 
          onClick={toggleMenu} 
          className={`md:hidden p-2 rounded-full transition-colors focus:outline-none ${
            mobileMenuOpen 
              ? 'text-foreground hover:bg-foreground/5' 
              : isScrolled 
                ? 'text-foreground hover:bg-foreground/5' 
                : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef} 
          className="fixed inset-0 z-30 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-32 pb-12 px-8"
        >
          <div className="flex flex-col gap-8 text-2xl font-bold font-sans">
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link text-foreground hover:text-accent transition-colors"
            >
              Fonctionnalités
            </a>
            <a 
              href="#manifesto" 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link text-foreground hover:text-accent transition-colors"
            >
              Manifeste
            </a>
            <a 
              href="#protocol" 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link text-foreground hover:text-accent transition-colors"
            >
              Protocole
            </a>
            <a 
              href="#quote" 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-link text-foreground hover:text-accent transition-colors"
            >
              Calculateur Devis
            </a>
          </div>

          <div className="flex flex-col gap-6 mobile-link">
            <a 
              href="#quote" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-4 bg-accent text-white font-semibold rounded-2xl shadow-lg hover:bg-primary transition-all duration-300"
            >
              Devis Rapide en 2 Min
            </a>
            <div className="flex items-center justify-between border-t border-foreground/10 pt-6">
              <span className="font-mono text-xs text-foreground/50">Dakar, Sénégal</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase text-foreground/60 tracking-wider">Actif</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- 2. HERO ---
const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-16 md:pb-24 px-6 md:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/dakar_delivery_hero.png" 
          alt="Livraison rapide à Dakar" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl text-background">
        <h1 className="flex flex-col gap-1 md:gap-2">
          <span className="hero-text font-sans font-semibold text-xl md:text-4xl tracking-wide uppercase text-background/80">LivrExpress est la</span>
          <span className="hero-text font-serif italic text-5xl md:text-[9rem] leading-none text-accent">Vitesse.</span>
        </h1>
        <p className="hero-text mt-6 font-mono text-xs md:text-base max-w-md text-background/80 leading-relaxed">
          Livraison rapide de colis en 2 heures à Dakar. L'intersection entre précision logistique et fiabilité absolue.
        </p>
      </div>
    </section>
  );
};

// --- 3. FEATURES ---
const FeatureDiagnostique = () => {
  const [cards, setCards] = useState(['Colis Sécurisé', 'Itinéraire Optimisé', 'Livraison Flash']);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        newCards.unshift(newCards.pop());
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm h-80 flex flex-col relative overflow-hidden group">
      <div className="font-sans font-semibold text-xl mb-2 z-10">Livraison Rapide</div>
      <div className="font-mono text-xs text-foreground/50 z-10">Diagnostic du flux</div>
      
      <div className="flex-1 flex items-center justify-center relative mt-8 z-10 perspective-1000">
        {cards.map((card, i) => (
          <div 
            key={card}
            className="absolute w-full max-w-[200px] p-4 rounded-xl bg-background border border-primary/10 flex items-center justify-between"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i,
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <span className="font-mono text-xs font-medium">{card}</span>
            <Activity className="w-4 h-4 text-accent" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureTelemetry = () => {
  const fullText = "Initialisation du protocole... \nValidation des coordonnées... \nAffectation d'un agent... \nColis en transit. Service professionnel garanti.";
  const [text, setText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        setTimeout(() => { i = 0; setText(""); }, 4000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-foreground text-background rounded-[2rem] p-8 shadow-lg h-80 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="font-sans font-semibold text-xl text-white">Service Professionnel</div>
          <div className="font-mono text-xs text-background/50">Télémétrie en direct</div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] text-white">Flux en Direct</span>
        </div>
      </div>
      
      <div className="flex-1 bg-black/40 rounded-xl p-4 font-mono text-xs leading-relaxed text-accent/90">
        <Terminal className="w-4 h-4 mb-2 text-white/50" />
        {text}
        <span className="inline-block w-2 h-3 bg-accent ml-1 animate-pulse"></span>
      </div>
    </div>
  );
};

const FeatureScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const activeDayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.to(cursorRef.current, { x: 80, y: 30, duration: 1, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(activeDayRef.current, { backgroundColor: '#CC5833', color: '#fff', duration: 0.2 }, "-=0.1")
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 150, y: 90, duration: 1, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.9, duration: 0.1 })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .set(activeDayRef.current, { backgroundColor: 'transparent', color: 'inherit' })
        .set(cursorRef.current, { x: 0, y: 0, opacity: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div ref={containerRef} className="bg-white rounded-[2rem] p-8 shadow-sm h-80 flex flex-col relative overflow-hidden">
      <div className="font-sans font-semibold text-xl mb-2">Disponible 24/24</div>
      <div className="font-mono text-xs text-foreground/50">Planificateur Protocole</div>
      
      <div className="flex-1 flex flex-col justify-center gap-6 mt-4 relative">
        <div className="flex justify-between border border-foreground/10 rounded-xl p-2">
          {days.map((d, i) => (
            <div 
              key={i} 
              ref={i === 3 ? activeDayRef : null}
              className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs transition-colors"
            >
              {d}
            </div>
          ))}
        </div>
        
        <div className="self-end bg-primary text-background px-4 py-2 rounded-lg font-mono text-xs">
          Sauvegarder
        </div>

        <MousePointer2 
          ref={cursorRef} 
          className="absolute top-0 left-0 w-6 h-6 text-foreground drop-shadow-md z-20" 
          style={{ transform: 'translate(0px, 0px)' }}
        />
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureDiagnostique />
        <FeatureTelemetry />
        <FeatureScheduler />
      </div>
    </section>
  );
};

// --- 4. PHILOSOPHY ---
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-text', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={containerRef} className="relative py-24 md:py-40 px-6 md:px-16 bg-primary overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop" 
          alt="Texture" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="manifesto-text font-mono text-xs md:text-sm text-background/60 mb-6 uppercase tracking-widest">
          La plupart des entreprises de livraison se concentrent sur : l'acheminement basique.
        </p>
        <h2 className="manifesto-text font-serif italic text-3xl md:text-6xl text-background leading-tight">
          Nous nous concentrons sur : <br/> l'<span className="text-accent">excellence</span>.
        </h2>
      </div>
    </section>
  );
};

// --- 5. PROTOCOL ---
const ProtocolCard = ({ index, title, description, animationType }) => {
  const renderAnimation = () => {
    if (animationType === 'geo') {
      return (
        <div className="w-32 h-32 border-2 border-accent/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
          <div className="w-16 h-16 border-2 border-accent/60 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
        </div>
      );
    }
    if (animationType === 'laser') {
      return (
        <div className="w-48 h-32 border border-white/10 rounded-xl relative overflow-hidden flex flex-wrap gap-1 p-2">
          {Array.from({length: 40}).map((_, i) => <div key={i} className="w-1 h-1 bg-white/20 rounded-full"></div>)}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_10px_#CC5833] animate-[ping_3s_ease-in-out_infinite_alternate]" style={{ animationName: 'scan' }}></div>
          <style>{`@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }`}</style>
        </div>
      );
    }
    if (animationType === 'wave') {
      return (
        <svg viewBox="0 0 100 40" className="w-48 h-20 stroke-accent fill-none stroke-[2]" strokeLinecap="round">
          <path d="M0,20 L20,20 L30,5 L40,35 L50,20 L100,20" className="animate-[dash_2s_linear_infinite]" strokeDasharray="100" strokeDashoffset="100" />
          <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
        </svg>
      );
    }
  };

  return (
    <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-background text-foreground px-6 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="font-mono text-3xl md:text-5xl text-primary/20 font-bold">0{index}</div>
          <h3 className="font-sans text-2xl md:text-5xl font-semibold tracking-tight">{title}</h3>
          <p className="font-serif italic text-base md:text-2xl text-foreground/70">{description}</p>
        </div>
        <div className="h-[200px] md:h-[400px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl flex items-center justify-center">
          {renderAnimation()}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            endTrigger: ".protocol-container",
            end: "bottom bottom"
          });

          // Animation for previous card scaling down
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="protocol-container relative bg-background">
      <ProtocolCard 
        index="1" 
        title="Commande Instantanée" 
        description="Une interface épurée pour initier votre livraison en quelques secondes." 
        animationType="geo" 
      />
      <ProtocolCard 
        index="2" 
        title="Acheminement Sécurisé" 
        description="Suivi télémétrique de pointe garantissant l'intégrité de votre colis." 
        animationType="laser" 
      />
      <ProtocolCard 
        index="3" 
        title="Livraison Confirmée" 
        description="Remise en main propre avec validation biométrique ou signature électronique." 
        animationType="wave" 
      />
    </section>
  );
};

// --- 6. QUOTE SECTION (FORMULAIRE DE DEVIS DYNAMIQUE) ---
const QuoteSection = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    location: 'dakar-plateau',
    packageType: 'docs',
    speed: 'standard'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const zones = {
    'dakar-plateau': { name: 'Dakar Plateau', price: 1500 },
    'almadies': { name: 'Les Almadies / Ngor', price: 2500 },
    'mermoz': { name: 'Mermoz / Sacré-Cœur', price: 1800 },
    'ouakam': { name: 'Ouakam / Fann', price: 1800 },
    'yoff': { name: 'Yoff / Patte d\'Oie', price: 2000 },
    'hann': { name: 'Hann / Grand Yoff', price: 2000 },
    'guediawaye': { name: 'Guédiawaye / Pikine', price: 3000 },
    'rufisque': { name: 'Rufisque / Diamniadio', price: 4500 }
  };

  const packageTypes = {
    'docs': { name: 'Enveloppe / Plis', extra: 0 },
    'small': { name: 'Petit Colis (<5kg)', extra: 500 },
    'medium': { name: 'Colis Moyen (<15kg)', extra: 1000 },
    'large': { name: 'Grand Colis (>15kg)', extra: 2000 }
  };

  const speeds = {
    'standard': { name: 'Standard (2 heures)', extra: 0 },
    'express': { name: 'Express Flash (1 heure)', extra: 1000 }
  };

  const calculateTotal = () => {
    const base = zones[formData.location]?.price || 0;
    const pkg = packageTypes[formData.packageType]?.extra || 0;
    const spd = speeds[formData.speed]?.extra || 0;
    return base + pkg + spd;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderPhone || !formData.recipientName || !formData.recipientPhone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      senderName: '',
      senderPhone: '',
      recipientName: '',
      recipientPhone: '',
      location: 'dakar-plateau',
      packageType: 'docs',
      speed: 'standard'
    });
    setIsSubmitted(false);
  };

  return (
    <section id="quote" className="py-16 md:py-24 px-6 md:px-16 bg-background relative z-10">
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        {!isSubmitted ? (
          <>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-full">Simulateur en Direct</span>
              <h2 className="font-sans text-2xl md:text-4xl font-bold mt-4 mb-4 text-foreground tracking-tight">Estimez et Commandez</h2>
              <p className="font-serif italic text-base md:text-lg text-foreground/60">Calculez instantanément le tarif de votre livraison à Dakar</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              {/* Left Column: Premium Visual Dakar Map Route */}
              <div className="lg:col-span-4 bg-primary text-background p-6 md:p-8 rounded-[2rem] flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[360px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 rounded-full blur-2xl pointer-events-none"></div>
                
                <div>
                  <span className="font-mono text-[9px] text-accent uppercase tracking-widest bg-accent/20 px-2.5 py-1 rounded-full">Dakar Logistique</span>
                  <h3 className="font-sans font-bold text-lg md:text-xl mt-4 mb-2 text-white">Réseau En Direct</h3>
                  <p className="font-sans text-xs text-background/60 leading-relaxed mb-6">
                    Acheminement optimisé en temps réel à travers la presqu'île de Dakar.
                  </p>
                </div>

                {/* Animated SVG Path Dakar Peninsula */}
                <div className="flex-1 flex items-center justify-center bg-black/25 rounded-2xl p-4 mb-6 border border-white/5">
                  <svg viewBox="0 0 200 150" className="w-full h-full max-h-[160px] stroke-background/20 fill-none stroke-[2]">
                    <path d="M 20,40 C 50,20 100,10 130,30 C 160,50 180,90 160,120 C 140,140 90,130 60,110 C 30,90 10,70 20,40 Z" className="stroke-white/10 stroke-[1.5] fill-white/5" />
                    <path id="delivery-route" d="M 60,110 Q 100,75 140,40" className="stroke-accent/60 stroke-[2] stroke-dasharray-[4,4] fill-none" strokeDasharray="4,4" />
                    <g transform="translate(60, 110)">
                      <circle r="4" className="fill-accent" />
                      <circle r="8" className="stroke-accent fill-none animate-pulse" />
                    </g>
                    <g transform="translate(140, 40)">
                      <circle r="4" className="fill-white" />
                      <circle r="8" className="stroke-white fill-none animate-pulse" />
                    </g>
                    <text x="35" y="125" className="fill-background/40 font-mono text-[8px] tracking-wider uppercase stroke-none">Plateau</text>
                    <text x="125" y="25" className="fill-background/40 font-mono text-[8px] tracking-wider uppercase stroke-none">Almadies</text>
                    <circle r="5" className="fill-accent">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 60,110 Q 100,75 140,40" />
                    </circle>
                  </svg>
                </div>

                <div className="space-y-3 font-mono text-[10px] text-background/80">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                    <span>Moyenne 45 min de livraison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Livreurs géo-localisés</span>
                  </div>
                </div>
              </div>

              {/* Right Columns: Form Inputs */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expéditeur */}
                  <div className="space-y-4 bg-background/30 p-5 md:p-6 rounded-2xl border border-primary/5">
                    <h4 className="font-sans font-bold text-base flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                      <User className="w-4 h-4 text-accent" /> Expéditeur
                    </h4>
                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Votre Nom Complet *</label>
                      <input 
                        type="text" 
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-foreground/10 focus:border-accent focus:outline-none font-mono text-xs transition-all focus:ring-1 focus:ring-accent"
                        placeholder="Ex: Amadou Diop"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Votre Téléphone *</label>
                      <input 
                        type="tel" 
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-foreground/10 focus:border-accent focus:outline-none font-mono text-xs transition-all focus:ring-1 focus:ring-accent"
                        placeholder="Ex: 77 123 45 67"
                      />
                    </div>
                  </div>

                  {/* Destinataire */}
                  <div className="space-y-4 bg-background/30 p-5 md:p-6 rounded-2xl border border-primary/5">
                    <h4 className="font-sans font-bold text-base flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                      <User className="w-4 h-4 text-accent" /> Destinataire
                    </h4>
                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Nom du Destinataire *</label>
                      <input 
                        type="text" 
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-foreground/10 focus:border-accent focus:outline-none font-mono text-xs transition-all focus:ring-1 focus:ring-accent"
                        placeholder="Ex: Fatou Ndiaye"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Téléphone Destinataire *</label>
                      <input 
                        type="tel" 
                        name="recipientPhone"
                        value={formData.recipientPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-foreground/10 focus:border-accent focus:outline-none font-mono text-xs transition-all focus:ring-1 focus:ring-accent"
                        placeholder="Ex: 78 987 65 43"
                      />
                    </div>
                  </div>
                </div>

                {/* Course details */}
                <div className="bg-background/30 p-5 md:p-6 rounded-2xl border border-primary/5 space-y-4">
                  <h4 className="font-sans font-bold text-base flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                    <Package className="w-4 h-4 text-accent" /> Détails de Livraison
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Zone de Livraison *</label>
                      <select 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-foreground/10 text-foreground focus:border-accent focus:outline-none font-mono text-xs transition-all focus:ring-1 focus:ring-accent"
                      >
                        {Object.entries(zones).map(([key, val]) => (
                          <option key={key} value={key}>{val.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Type de Colis</label>
                      <select 
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-foreground/10 text-foreground focus:border-accent focus:outline-none font-mono text-xs transition-all focus:ring-1 focus:ring-accent"
                      >
                        {Object.entries(packageTypes).map(([key, val]) => (
                          <option key={key} value={key}>{val.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-semibold uppercase tracking-wider text-foreground/60 mb-2">Priorité</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(speeds).map(([key, val]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, speed: key }))}
                            className={`px-3 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                              formData.speed === key 
                                ? 'bg-accent border-accent text-white shadow-sm' 
                                : 'bg-white border-foreground/10 text-foreground/80 hover:bg-foreground/5'
                            }`}
                          >
                            {val.name.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Bar at the Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-primary text-background rounded-2xl p-5 md:p-6 gap-6 shadow-md border border-white/5">
                  <div className="text-center md:text-left flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="font-sans text-[10px] md:text-xs text-background/60 uppercase tracking-widest">Estimation du Tarif :</span>
                    <span className="font-mono text-2xl md:text-3xl font-extrabold text-accent leading-none whitespace-nowrap">{calculateTotal().toLocaleString()} FCFA</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3.5 bg-accent text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-all duration-300 shadow-md group text-sm self-stretch md:self-auto"
                  >
                    {loading ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Confirmer la Livraison</span>
                        <Zap className="w-4 h-4 text-white group-hover:scale-125 transition-transform animate-pulse" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6 max-w-lg mx-auto flex flex-col items-center">
            <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-7 h-7 text-accent animate-bounce" />
            </div>
            
            <h2 className="font-sans text-2xl md:text-3xl font-bold mb-4 text-foreground">Protocole Initié !</h2>
            <p className="font-serif italic text-sm md:text-base text-foreground/60 mb-6">Votre course a été validée et enregistrée avec succès dans notre système.</p>
            
            <div className="w-full bg-background/50 rounded-2xl p-5 mb-8 text-left border border-primary/5 font-mono text-[10px] md:text-xs space-y-3">
              <div className="flex justify-between border-b border-primary/5 pb-2">
                <span className="text-foreground/50">Code Commande :</span>
                <span className="font-bold text-accent">LX-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between border-b border-primary/5 pb-2">
                <span className="text-foreground/50">Expéditeur :</span>
                <span className="font-semibold text-foreground">{formData.senderName}</span>
              </div>
              <div className="flex justify-between border-b border-primary/5 pb-2">
                <span className="text-foreground/50">Destinataire :</span>
                <span className="font-semibold text-foreground">{formData.recipientName} ({zones[formData.location]?.name})</span>
              </div>
              <div className="flex justify-between border-b border-primary/5 pb-2">
                <span className="text-foreground/50">Priorité :</span>
                <span className="font-semibold text-foreground uppercase">{speeds[formData.speed]?.name}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-foreground/50">Montant estimé :</span>
                <span className="font-bold text-accent text-sm md:text-base">{calculateTotal().toLocaleString()} FCFA</span>
              </div>
            </div>

            <button 
              onClick={resetForm}
              className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-full font-semibold text-xs md:text-sm transition-all duration-300"
            >
              Faire une autre simulation
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- 7. FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-dark text-background rounded-t-[3rem] md:rounded-t-[4rem] px-6 md:px-16 py-12 md:py-16 relative z-20 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16">
        <div>
          <div className="font-sans font-bold text-xl md:text-2xl mb-4">LivrExpress</div>
          <p className="font-mono text-xs md:text-sm text-background/50 max-w-xs">Livraison rapide de colis en 2 heures à Dakar.</p>
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <h4 className="font-sans font-semibold mb-2 text-sm md:text-base">Navigation</h4>
          <a href="#features" className="font-serif text-xs md:text-sm text-background/70 hover:text-accent transition-colors">Fonctionnalités</a>
          <a href="#manifesto" className="font-serif text-xs md:text-sm text-background/70 hover:text-accent transition-colors">Manifeste</a>
          <a href="#protocol" className="font-serif text-xs md:text-sm text-background/70 hover:text-accent transition-colors">Protocole</a>
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <h4 className="font-sans font-semibold mb-2 text-sm md:text-base">Légal</h4>
          <a href="#" className="font-serif text-xs md:text-sm text-background/70 hover:text-accent transition-colors">Confidentialité</a>
          <a href="#" className="font-serif text-xs md:text-sm text-background/70 hover:text-accent transition-colors">Conditions Générales</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[10px] md:text-xs text-background/40">© 2026 LivrExpress. Tous droits réservés.</div>
        <div className="flex items-center gap-2 px-3 py-1 bg-background/5 rounded-full border border-background/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-background/70">Système Opérationnel</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <QuoteSection />
      <Footer />
    </div>
  );
}

export default App;
