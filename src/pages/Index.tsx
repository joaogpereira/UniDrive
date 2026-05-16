import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroimg from "@/assets/landing-page/hero/hero-image.png";
import {
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Play,
  ShieldCheck,
  Clock3,
  Leaf,
  Users,
  Eye,
  HeartHandshake,
  Target,
  Sparkles,
} from "lucide-react";
import Logonavbar from "@/assets/logo/logo-navbar.png";
import Logo from "@/assets/logo/logo-unidrive.png";

// ---------------------- Motion Variants ----------------------
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ---------------------- Smooth Scroll ----------------------
function smoothScrollTo(hash: string, duration = 1000) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;

  const headerOffset = 90;
  const target = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  const start = window.pageYOffset;
  const distance = target - start;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function loop(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

// ---------------------- Button ----------------------
function UIButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300";

  const variants = {
    solid:
      "bg-[#0A66FF] text-white hover:bg-[#0958dc] shadow-[0_10px_30px_rgba(10,102,255,0.25)]",
    outline:
      "border border-white/20 bg-white/8 text-white hover:bg-white/14 backdrop-blur-md",
    ghost:
      "text-gray-900 hover:text-[#0A66FF]",
  };

  const Comp: any = href ? motion.a : motion.button;
  const props = href ? { href } : {};

  return (
    <Comp
      {...props}
      className={`${base} px-6 py-3 text-sm md:text-base ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e: any) => {
        if (href && href.startsWith("#")) {
          e.preventDefault();
          smoothScrollTo(href);
        }
      }}
    >
      {children}
    </Comp>
  );
}

// ---------------------- Navbar ----------------------
function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowNavbar(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Por que escolher", href: "#porque-escolher" },
    { label: "Nossa essência", href: "#nossa-essencia" },
  ];

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={
        showNavbar
          ? { y: 0, opacity: 1 }
          : { y: -120, opacity: 0 }
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between rounded-full border border-black/45 bg-black/60 px-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <a href="#" className="flex items-center gap-3">
            <img
              src={Logonavbar}
              alt="UniDrive"
              className="h-12 w-auto object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(link.href);
                }}
                className="text-sm font-medium text-white/85 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <SocialIcon href="#" icon={<Instagram size={16} />} />
            <SocialIcon href="#" icon={<Linkedin size={16} />} />
            <SocialIcon href="#" icon={<Facebook size={16} />} />
          </div>

          <div className="flex items-center gap-3">
            <UIButton href="/login" variant="outline" className="hidden sm:inline-flex">
              Login
            </UIButton>
            <UIButton href="/register" variant="solid">
              Cadastre-se
            </UIButton>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function SocialIcon({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.08, y: -1 }}
      whileTap={{ scale: 0.96 }}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/85 backdrop-blur-md transition hover:bg-white/15"
    >
      {icon}
    </motion.a>
  );
}

// ---------------------- Feature Slide Card ----------------------
function WhyCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="group relative min-w-[280px] md:min-w-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0d] shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
    >
      <div className="h-52 w-full bg-[linear-gradient(135deg,#0A66FF_0%,#0d1b3d_60%,#05070c_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------- Value Card ----------------------
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group rounded-[24px] border border-black/10 bg-white p-6 transition-all duration-300 hover:border-[#0A66FF]/30 hover:shadow-[0_20px_40px_rgba(10,102,255,0.12)]"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A66FF]/10 text-[#0A66FF] transition group-hover:bg-[#0A66FF] group-hover:text-white">
        {icon}
      </div>

      <h4 className="text-lg font-semibold text-black">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </motion.div>
  );
}

// ---------------------- Main Page ----------------------
export default function Index() {
  return (
    <div className="bg-white text-black overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden text-white">


  {/* 🖼️ FALLBACK IMAGE */}
  <img
    src={heroimg}
    alt="UniDrive background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* 🌑 OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />
  

  {/* 🎯 CONTENT */}
  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-7xl mx-auto px-6 w-full">

      <div className="max-w-2xl">
        {/* LOGO */}
        <div className="z-20">
          <img
            src={Logo}
            alt="UniDrive"
            className="h-32 md:h-32 object-contain"
          />
        </div>
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          
          <span className="block">Economize</span>
          <span className="block text-blue-500">tempo e dinheiro</span>
        </h1>

        <p className="mt-6 text-lg text-white/80">
          Conectamos estudantes para uma mobilidade mais econômica,
          moderna e sustentável.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
            Começar agora
          </button>

          <button className="border border-white/30 px-6 py-3 rounded-full backdrop-blur hover:bg-white/10 transition">
            Ver como funciona
          </button>
        </div>

      </div>
    </div>
  </div>
</section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A66FF]">
                Quem somos
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-black md:text-5xl">
                Uma nova forma de viver a mobilidade universitária.
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[36px] border border-black/10 bg-[#f6f8fc] p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0A66FF_0%,#dfe9ff_45%,#ffffff_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_30%)]" />
                  <div className="absolute inset-0 flex items-end p-8 md:p-10">
                    <div className="max-w-xl rounded-[28px] border border-white/40 bg-white/70 p-6 backdrop-blur-xl shadow-lg">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0A66FF]">
                        Sobre a UniDrive
                      </span>
                      <h3 className="mt-3 text-2xl font-semibold text-black md:text-3xl">
                        Conectamos pessoas, trajetos e propósito.
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">
                        A UniDrive nasceu para tornar o deslocamento universitário
                        mais inteligente. Nossa proposta une economia, praticidade,
                        segurança e consciência coletiva em uma experiência moderna,
                        pensada para a rotina real dos estudantes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center rounded-[28px] bg-white p-8 md:p-10">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A66FF]">
                    Nosso papel
                  </span>

                  <p className="mt-5 text-base leading-relaxed text-gray-700 md:text-lg">
                    Mais do que caronas, criamos uma plataforma com potencial para
                    transformar a cultura de deslocamento universitário, reduzindo
                    custos, otimizando tempo e incentivando uma comunidade mais
                    conectada.
                  </p>

                  <div className="mt-8 space-y-4">
                    <InfoLine title="Mais economia" text="Divisão inteligente de custos no dia a dia." />
                    <InfoLine title="Mais conexão" text="Estudantes compartilhando rotas e experiências." />
                    <InfoLine title="Mais eficiência" text="Uma jornada simples, intuitiva e moderna." />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section
        id="porque-escolher"
        className="bg-[#05070c] py-24 text-white md:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10 md:mb-14">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A66FF]">
                Por que escolher a UniDrive
              </span>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
                  Uma experiência pensada para ser bonita, útil e realmente valiosa.
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                  Aqui você pode depois trocar essas imagens por prints do app,
                  fotos conceituais, mockups ou imagens da vida universitária.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none]"
            >
              <WhyCard
                title="Economia real"
                description="Reduza gastos recorrentes com transporte em uma solução prática para a rotina universitária."
              />
              <WhyCard
                title="Mais segurança"
                description="Construa confiança com uma plataforma voltada para uma comunidade universitária conectada."
              />
              <WhyCard
                title="Menos impacto ambiental"
                description="Compartilhar trajetos é uma forma inteligente de reduzir emissões e congestionamentos."
              />
              <WhyCard
                title="Experiência moderna"
                description="Uma interface simples, intuitiva e visualmente forte para gerar confiança desde o primeiro acesso."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NOSSA ESSÊNCIA */}
      <section id="nossa-essencia" className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A66FF]">
                Nossa essência
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-black md:text-5xl">
                Missão, visão e valores que movem a UniDrive.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr]">
              <motion.div
                variants={fadeUp}
                className="overflow-hidden rounded-[32px] border border-black/10 bg-[#f5f8ff] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="h-[320px] md:h-[420px] bg-[linear-gradient(135deg,#0A66FF_0%,#dbe8ff_45%,#ffffff_100%)]" />
                <div className="border-t border-black/10 p-8">
                  <h3 className="text-2xl font-semibold text-black">
                    Espaço para imagem institucional
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Aqui você pode colocar uma imagem forte da marca, estudantes,
                    campus ou um mockup grande do sistema.
                  </p>
                </div>
              </motion.div>

              <div className="space-y-6">
                <motion.div
                  variants={fadeUp}
                  className="rounded-[28px] border border-black/10 bg-black p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center gap-3">
                    <Target className="text-[#0A66FF]" size={22} />
                    <h3 className="text-2xl font-semibold">Missão</h3>
                  </div>
                  <p className="mt-4 text-white/75 leading-relaxed">
                    Transformar a mobilidade universitária em uma experiência mais
                    econômica, conectada e segura, oferecendo uma solução prática
                    para estudantes que buscam otimizar sua rotina.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="rounded-[28px] border border-black/10 bg-[#0A66FF] p-8 text-white shadow-[0_20px_50px_rgba(10,102,255,0.22)]"
                >
                  <div className="flex items-center gap-3">
                    <Eye className="text-white" size={22} />
                    <h3 className="text-2xl font-semibold">Visão</h3>
                  </div>
                  <p className="mt-4 text-white/85 leading-relaxed">
                    Ser referência em mobilidade universitária inteligente,
                    conectando inovação, impacto social e experiência digital de
                    alto nível.
                  </p>
                </motion.div>

                <motion.div
                  variants={stagger}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <ValueCard
                    icon={<Users size={22} />}
                    title="Comunidade"
                    description="Valorizamos conexões reais entre pessoas com objetivos em comum."
                  />
                  <ValueCard
                    icon={<ShieldCheck size={22} />}
                    title="Segurança"
                    description="Projetamos confiança como parte essencial da experiência."
                  />
                  <ValueCard
                    icon={<HeartHandshake size={22} />}
                    title="Colaboração"
                    description="Compartilhar trajetos é compartilhar valor, tempo e oportunidade."
                  />
                  <ValueCard
                    icon={<Leaf size={22} />}
                    title="Sustentabilidade"
                    description="Mobilidade mais inteligente também significa menos impacto para a cidade."
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#05070c] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(10,102,255,0.22),rgba(255,255,255,0.04))] p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.25)]"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8bb6ff]">
                  Comece agora
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                  Entre para a UniDrive e eleve sua rotina universitária.
                </h2>
                <p className="mt-4 text-white/70 md:text-lg">
                  Uma landing premium precisa terminar com uma chamada forte, clara
                  e elegante. Aqui está esse espaço.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <UIButton href="/register" variant="solid">
                  Criar conta
                  <ArrowRight className="ml-2" size={18} />
                </UIButton>
                <UIButton href="/login" variant="outline">
                  Fazer login
                </UIButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ---------------------- Helpers ----------------------
function MiniInfo({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-md">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-1 text-xs text-white/65">{subtitle}</div>
    </div>
  );
}

function InfoLine({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-black/8 bg-[#f8faff] px-4 py-4">
      <div className="text-sm font-semibold text-black">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{text}</div>
    </div>
  );
}