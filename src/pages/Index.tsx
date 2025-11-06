import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Car, Leaf, PiggyBank, Ticket } from "lucide-react";
import Logo from "@/assets/logo-unidrive.png";


// --------- Motion Variants ---------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const navItem = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// --------- Smooth Scroll Helper (devagar) ---------
function smoothScrollTo(hash: string, duration = 900) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;
  const headerOffset = 64; // altura da navbar
  const target = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  const start = window.pageYOffset;
  const distance = target - start;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function loop(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ---------------------- Navbar (inline) ----------------------
function Navbar() {
  const links = [
    { href: "#sobre", label: "Missão & Visão" },
    { href: "#beneficios", label: "Benefícios" },
    { href: "#cta", label: "Começar" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <motion.nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        {/* ✅ LOGO GRANDE */}
        <motion.a
          variants={navItem}
          href="#"
          className="flex items-center gap-2"
        >
          <img
            src={Logo}
            alt="Unidrive Logo"
            className="h-[100px] w-auto object-contain"  // ✅ AQUI VOCÊ AUMENTA
          />
        </motion.a>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((lk) => (
            <motion.a
              key={lk.href}
              variants={navItem}
              href={lk.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(lk.href, 1000);
              }}
              className="relative text-base font-medium text-gray-700 hover:text-gray-900 leading-none"
              whileHover={{ y: -1 }}
            >
              {lk.label}
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 -bottom-2 h-0.5 w-full bg-unidriver-600 origin-left"
                initial={{ scaleX: 0, opacity: 0.5 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              />
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}

// ---------------------- UIButton (inline) ----------------------
function UIButton({
  href,
  children,
  variant = "solid",
  size = "lg",
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "md" | "lg";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = size === "lg" ? "px-8 py-3 text-lg" : "px-5 py-2.5 text-sm";
  const variants =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-400"
      : "bg-unidriver-600 text-white hover:brightness-110 focus:ring-unidriver-400";
  const cls = `${base} ${sizes} ${variants} ${className}`;

  const Cmp: any = href ? motion.a : motion.button;
  const props = href ? { href } : {};
  return (
    <Cmp
      {...props}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      onClick={(e: any) => {
        if (href && href.startsWith("#")) {
          e.preventDefault();
          smoothScrollTo(href, 1000);
        }
      }}
    >
      {children}
    </Cmp>
  );
}

// ---------------------- Auth fallback ----------------------
function useAuthFallback(): { isAuthenticated: boolean; user: { tipo_usuario?: string } | null } {
  const g: any = (globalThis as any);
  return g?.UNIDRIVE_AUTH ?? { isAuthenticated: false, user: null };
}

// ---------------------- Page ----------------------
export default function Index({
  __testAuth,
}: {
  __testAuth?: { isAuthenticated: boolean; user?: { tipo_usuario?: string } | null };
}) {
  const auth = __testAuth ?? useAuthFallback();
  const { isAuthenticated, user } = auth;
  const isDriver = user?.tipo_usuario === "motorista";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      {/* HERO */}
      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.section
          className="text-center mt-8"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Encontre caronas facilmente com {" "}
            <span className="text-unidriver-600">UniDrive</span>
          </motion.h1>
          <motion.p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" variants={fadeUp}>
            Conectamos motoristas e passageiros para viagens mais econômicas, sustentáveis e seguras.
          </motion.p>

          {/* CTA primário */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <UIButton href="/regions">
                    <span>Encontrar caronas</span>
                    <ArrowRight className="ml-2" size={18} />
                  </UIButton>
                  {isDriver && (
                    <UIButton href="/create-trip">
                      <span>Criar nova viagem</span>
                      <ArrowRight className="ml-2" size={18} />
                    </UIButton>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <UIButton href="/register">
                    <span>Cadastre-se grátis</span>
                    <ArrowRight className="ml-2" size={18} />
                  </UIButton>
                  {/* Link âncora para CTA com smooth scroll */}
                  <UIButton href="#cta" variant="outline">
                    Entrar
                  </UIButton>
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div className="mt-6 text-base text-gray-500" variants={fadeUp}>
            100% gratuito para estudantes • Comunidade verificada • Em poucos cliques
          </motion.div>
        </motion.section>

        {/* Benefícios principais */}
        <motion.section
          id="beneficios"
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <FeatureCard
            icon={<Car className="text-unidriver-600" size={32} />}
            title="Caronas seguras"
            description="Motoristas verificados e avaliações da comunidade garantem sua segurança."
          />
          <FeatureCard
            icon={<PiggyBank className="text-unidriver-600" size={32} />}
            title="Economize de verdade"
            description="Divida os custos de combustível e pedágio. Mais barato que apps tradicionais."
          />
          <FeatureCard
            icon={<Leaf className="text-unidriver-600" size={32} />}
            title="Menos CO₂"
            description="Compartilhe o trajeto e contribua com a redução de emissões na sua cidade."
          />
          {/* ✅ Novo quadrado: Gasta menos que ônibus */}
          <FeatureCard
            icon={<Ticket className="text-unidriver-600" size={32} />}
            title="Mais barato que ônibus"
            description="Pague menos por trajeto compartilhando a viagem com colegas de curso."
          />
        </motion.section>

        {/* Missão & Visão */}
        <motion.section
          id="sobre"
          className="mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.div className="text-center mb-10" variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Nossa essência</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              O porquê da UniDrive existir e para onde estamos indo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-unidriver-100 w-12 h-12 flex items-center justify-center">
                  <Leaf className="text-unidriver-600" size={24} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Missão</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Conectar universitários para compartilhar caronas de forma segura e acessível, reduzindo custos de deslocamento e a pegada ambiental no dia a dia do campus.
              </p>
            </motion.div>

            <motion.div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100" variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-unidriver-100 w-12 h-12 flex items-center justify-center">
                  <PiggyBank className="text-unidriver-600" size={24} />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Visão</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Construir um ecossistema de mobilidade universitária que diminui significativamente a poluição nas cidades e alivia o orçamento dos estudantes.
              </p>
            </motion.div>
          </div>

          {/* Micro-métricas (exemplo estático) */}
          <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center" variants={stagger}>
            <Stat label="Universidades" value="50+" />
            <Stat label="Caronas organizadas" value="10k+" />
            <Stat label="R$ economizados" value="1M+" />
            <Stat label="kg CO₂ evitados" value="250k+" />
          </motion.div>
        </motion.section>

        {/* CTA final */}
        <motion.section
          id="cta"
          className="mt-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="bg-gradient-to-r from-unidriver-100 to-white border border-gray-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">Pronto para fazer parte?</h3>
              <p className="text-lg text-gray-600">Leva menos de 2 minutos para criar sua conta e começar a economizar.</p>
            </div>
            <div className="flex gap-3">
              <UIButton href={isAuthenticated ? "/regions" : "/register"}>
                {isAuthenticated ? "Encontrar caronas" : "Criar conta"}
                <ArrowRight className="ml-2" size={18} />
              </UIButton>
              {!isAuthenticated && (
                <UIButton href="/login" variant="outline">Entrar</UIButton>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// ---------------------- Auxiliares ----------------------
function FeatureCard({
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
      className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100"
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="rounded-full bg-unidriver-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-600 text-base">{description}</p>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow p-6 border border-gray-100"
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-3xl font-bold text-unidriver-600 tracking-tight">{value}</div>
      <div className="text-gray-500 mt-1 text-base font-medium">{label}</div>
    </motion.div>
  );
}

/*
============================================================
🧪 Testes (adicione em `Index.test.tsx` com Vitest + RTL)
============================================================
import { render, screen, fireEvent } from "@testing-library/react";
import Index from "./Index";

describe("Landing CTAs", () => {
  it("mostra CTAs de cadastro/entrar quando não autenticado", () => {
    render(<Index __testAuth={{ isAuthenticated: false, user: null }} />);
    expect(screen.getByText(/Cadastre-se grátis|Criar conta/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });

  it("mostra 'Encontrar caronas' quando autenticado (passageiro)", () => {
    render(<Index __testAuth={{ isAuthenticated: true, user: { tipo_usuario: "passageiro" } }} />);
    expect(screen.getByText(/Encontrar caronas/i)).toBeInTheDocument();
    expect(screen.queryByText(/Entrar/i)).not.toBeInTheDocument();
  });

  it("mostra 'Criar nova viagem' quando autenticado e motorista", () => {
    render(<Index __testAuth={{ isAuthenticated: true, user: { tipo_usuario: "motorista" } }} />);
    expect(screen.getByText(/Criar nova viagem/i)).toBeInTheDocument();
  });

  it("renderiza Missão e Visão", () => {
    render(<Index __testAuth={{ isAuthenticated: false }} />);
    expect(screen.getByText(/Missão/i)).toBeInTheDocument();
    expect(screen.getByText(/Visão/i)).toBeInTheDocument();
  });
});
*/
