import { useEffect, useRef, useState } from "react";
import HaircutScene from "./HaircutScene";

const WHATSAPP_NUMBER = "5515997123860";
const INSTAGRAM_URL = "https://www.instagram.com/regianecamerin";
const FACEBOOK_URL = "https://www.facebook.com/regiane.camerinsantarem";
const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const slides = [
  {
    tab: "Vantagens",
    number: "01",
    title: "Comprimento e volume com resultado natural.",
    text: "O Mega Hair transforma o visual sem abrir mão do movimento. Com aplicação cuidadosa, os fios ganham densidade, comprimento e novas possibilidades de finalização.",
  },
  {
    tab: "Para quem é",
    number: "02",
    title: "Uma solução pensada para o seu momento.",
    text: "Recomendado para quem deseja alongar, dar volume a cabelos finos, recuperar a confiança após um corte ou simplesmente experimentar um visual novo com orientação profissional.",
  },
  {
    tab: "Venha conhecer",
    number: "03",
    title: "Descubra o Mega Hair ideal para você.",
    text: "Cada cabelo pede uma técnica, textura e manutenção diferentes. Venha conversar com a gente e descubra a solução que combina com você.",
    cta: true,
  },
];

const services = [
  ["Corte de cabelo", "R$ 50 ~ R$ 80"],
  ["Tintura", "R$ 100"],
  ["Mega Hair", "R$ 500*"],
  ["Manicure", "R$ 35"],
  ["Pedicure", "R$ 50"],
  ["Manicure + Pedicure", "R$ 80"],
];

function MegaHairShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      setActive(
        Math.min(
          2,
          Math.max(
            0,
            Math.floor((-section.getBoundingClientRect().top / travel) * 3),
          ),
        ),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const selectSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + travel * ((index + 0.12) / 3),
      behavior: "smooth",
    });
  };
  return (
    <section className="mega" id="mega-hair" ref={sectionRef}>
      <div className="mega-sticky">
        <div className="section-heading">
          <span className="eyebrow">Especialidade Estúdio R</span>
          <h2>O melhor salão de Tietê e região, especializado em Mega Hair.</h2>
        </div>
        <div
          className="slide-tabs"
          role="tablist"
          aria-label="Conteúdo sobre Mega Hair"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.tab}
              id={`mega-tab-${index}`}
              aria-controls={`mega-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              className={active === index ? "active" : ""}
              onClick={() => selectSlide(index)}
              role="tab"
              aria-selected={active === index}
            >
              <span>{slide.number}</span>
              {slide.tab}
            </button>
          ))}
        </div>
        <div className="slides-window">
          {slides.map((slide, index) => (
            <article
              key={slide.tab}
              id={`mega-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`mega-tab-${index}`}
              className={`mega-slide ${active === index ? "active" : ""}`}
              aria-hidden={active !== index}
            >
              <span className="slide-number">{slide.number}</span>
              <div>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
                {slide.cta && (
                  <a
                    className="button"
                    href={whatsappUrl(
                      "Olá, gostaria de saber mais sobre o aplique de Mega Hair",
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Venha conhecer <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(
        1,
        Math.max(0, -section.getBoundingClientRect().top / travel),
      );
      setVisibleCount(
        Math.min(services.length, Math.floor(progress * (services.length + 1))),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <section className="services" id="servicos" ref={sectionRef}>
      <div className="services-inner">
        <div className="section-heading">
          <span className="eyebrow">Cuidado completo</span>
          <h2>Conheça nossos serviços.</h2>
        </div>
        <div className="service-list" aria-label="Tabela de serviços e valores">
          {services.map(([name, price], index) => (
            <div
              className={`service-row ${index < visibleCount ? "visible" : index === visibleCount ? "next" : "pending"}`}
              key={name}
            >
              <span>{name}</span>
              <strong>{price}</strong>
            </div>
          ))}
          <small className={visibleCount === services.length ? "visible" : ""}>
            * Valores poderão ser alterados a depender do serviço.
          </small>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ type }: { type: "whatsapp" | "instagram" | "facebook" }) {
  if (type === "whatsapp")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="#ffffff"
        role="img"
        aria-label="WhatsApp"
      >
        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.94 11.94 0 0 0 5.79 1.47h.01C18.65 23.83 24 18.47 24 11.88c0-3.19-1.24-6.18-3.48-8.4ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.72.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.95 9.86ZM17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" className="fill" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24">
      <path d="M14 21v-8h3l.5-3H14V8.5c0-1 .3-1.5 1.7-1.5H18V4.2c-.7-.1-1.5-.2-2.5-.2C13 4 11 5.5 11 8.4V10H8v3h3v8" />
    </svg>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="nav">
        <a className="brand" href="#inicio" aria-label="Estúdio R, início">
          <img
            src="/logo.svg"
            alt="Estúdio R — Cabelo e Beleza"
            width="174"
            height="116"
          />
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#mega-hair">Mega Hair</a>
          <a href="#servicos">Serviços</a>
          <a href="#localizacao">Localização</a>
          <a
            href={whatsappUrl("Olá, gostaria de agendar um horário")}
            target="_blank"
            rel="noreferrer"
          >
            Agendar horário
          </a>
        </nav>
      </header>
      <main id="conteudo">
        <span id="inicio" className="anchor-target" />
        <HaircutScene />
        <MegaHairShowcase />
        <Services />
        <section className="location" id="localizacao">
          <div className="location-copy">
            <span className="eyebrow">Você é nossa convidada</span>
            <h2>Venha nos conhecer, colocar o papo em dia e tomar um café.</h2>
            <p>
              Rua Antonio Nery, 20
              <br />
              Tietê/SP
            </p>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Rua+Antonio+Nery+20+Tiete+SP"
              target="_blank"
              rel="noreferrer"
            >
              Traçar rota ↗
            </a>
          </div>
          <iframe
            title="Localização do Estúdio R no Google Maps"
            src="https://www.google.com/maps?q=Rua%20Antonio%20Nery%2C%2020%2C%20Tiet%C3%AA%2FSP&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
        <section className="booking" id="contato">
          <span className="eyebrow">Seu momento começa aqui</span>
          <h2>Agende agora mesmo.</h2>
          <a
            className="button button-light"
            href={whatsappUrl("Olá, gostaria de agendar um horário")}
            target="_blank"
            rel="noreferrer"
          >
            Agendar pelo WhatsApp <span>↗</span>
          </a>
        </section>
      </main>
      <a
        className="floating-whatsapp"
        href={whatsappUrl("Olá, gostaria de agendar um horário")}
        target="_blank"
        rel="noreferrer"
        aria-label="Agendar horário pelo WhatsApp"
      >
        <SocialIcon type="whatsapp" />
        <span>Agendar</span>
      </a>
      <footer className="footer">
        <div>
          <a
            className="footer-logo"
            href="#inicio"
            aria-label="Estúdio R, voltar ao início"
          >
            <img src="/logo-footer.svg" alt="" width="132" height="88" />
          </a>
          <nav className="socials" aria-label="Redes sociais">
            <a
              href={whatsappUrl("Olá, gostaria de agendar um horário")}
              target="_blank"
              rel="noreferrer"
              aria-label="Conversar com o Estúdio R pelo WhatsApp"
            >
              <SocialIcon type="whatsapp" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Estúdio R no Instagram"
            >
              <SocialIcon type="instagram" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Estúdio R no Facebook"
            >
              <SocialIcon type="facebook" />
            </a>
          </nav>
        </div>
        <a
          className="developer"
          href="https://www.linkedin.com/in/bruno-camerin-santarem-bbb2aa1ab/"
          target="_blank"
          rel="noreferrer"
        >
          Site desenvolvido por Bruno Camerin Santarem ↗
        </a>
      </footer>
    </>
  );
}
