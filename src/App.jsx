import { useEffect, useMemo, useState } from "react";
import { tours, packages, images, ui, waLink, PHONE_LABEL } from "./data.js";
import { Scene } from "./scenes.jsx";

const WaIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06C22.68 27.2 28 21.8 28 15.16 28 8.5 22.68 3 16.04 3Zm0 21.9c-1.6 0-3.17-.43-4.54-1.24l-.33-.19-4.2 1.1 1.12-4.1-.21-.34a9.83 9.83 0 0 1-1.5-5.2c0-5.44 4.43-9.87 9.9-9.87 5.45 0 9.88 4.43 9.88 9.87 0 5.45-4.43 9.97-10.12 9.97Zm5.4-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

function Header({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["#tours", t.nav.tours],
    ["#paquetes", t.nav.packages],
    ["#como-reservar", t.nav.how],
    ["#reservar", t.nav.book],
  ];
  return (
    <header className="cab">
      <div className="wrap cab-fila">
        <a className="marca" href="#inicio">
          Coban<span>Travels</span>
        </a>
        <nav className={"nav" + (open ? " abierto" : "")} aria-label="Principal">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="cab-acciones">
          <button className="idioma" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={t.otherLabel}>
            {t.other}
          </button>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  const [y, setY] = useState(0);
  const [fotoFalla, setFotoFalla] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(Math.min(window.scrollY, 600)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="portada" id="inicio">
      {!fotoFalla && (
        <img
          className="portada-foto"
          src="img/portada.jpg"
          alt=""
          decoding="async"
          style={{ transform: `translateY(${y * 0.06}px) scale(1.12)` }}
          onError={() => setFotoFalla(true)}
        />
      )}
      <div className="wrap portada-fila">
        <div className="portada-texto">
          <h1>{t.hero.h1}</h1>
          <p className="sub">{t.hero.sub}</p>
          <div className="acciones">
            <a className="btn btn-wa" href={waLink(t.hero.msg)} target="_blank" rel="noopener noreferrer">
              <WaIcon />
              {t.hero.cta}
            </a>
            <a className="btn btn-borde" href="#tours">
              {t.hero.see}
            </a>
          </div>
        </div>
      </div>
      <div className="datos-rapidos">
        <dl className="wrap datos-fila">
          {t.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function TourCard({ tour, t, lang }) {
  const [open, setOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const photo = images[tour.id];
  const showPhoto = photo && !imgFailed;
  const c = tour[lang];
  const panelId = `det-${tour.id}`;
  return (
    <article className={"tour" + (open ? " abierta" : "")}>
            <div className="tour-img">
        {showPhoto ? (
          <img
            src={encodeURI(photo.src)}
            alt={c.title}
            width="800"
            height="600"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photo.focus || "center" }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="tour-fallback" role="img" aria-label={`${c.title}. ${t.tours.photo}`}>
            <Scene name={tour.scene} />
          </div>
        )}
        <span className="tour-dur">{c.dur}</span>
      </div>
      <div className="tour-cuerpo">
        <h3>{c.title}</h3>
        <p>{c.desc}</p>
        <p className="nivel">
          {t.tours.level}: <b>{c.level}</b>
        </p>
        <button className="enlace" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          {open ? t.tours.hide : t.tours.details}
        </button>
        <div id={panelId} className="detalle" hidden={!open}>
          <h4>{t.tours.itinerary}</h4>
          <ul>
            {c.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h4>{t.tours.includes}</h4>
          <ul className="inc">
            {c.inc.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <a className="btn btn-chico" href={waLink(t.tours.msg(c.title))} target="_blank" rel="noopener noreferrer">
          <WaIcon />
          {t.tours.ask}
        </a>
      </div>
    </article>
  );
}

function Tours({ t, lang }) {
  const [cat, setCat] = useState("all");
  const shown = useMemo(() => tours.filter((x) => cat === "all" || x.cat === cat), [cat]);
  return (
    <section id="tours">
      <div className="wrap">
        <h2>{t.tours.h}</h2>
        <p className="intro">{t.tours.p}</p>
        <div className="filtros" role="group" aria-label={t.tours.h}>
          {Object.entries(t.tours.filters).map(([k, label]) => (
            <button key={k} className={"filtro" + (cat === k ? " on" : "")} aria-pressed={cat === k} onClick={() => setCat(k)}>
              {label}
            </button>
          ))}
        </div>
        <div className="tour-grid">
          {shown.map((x) => (
            <TourCard key={x.id} tour={x} t={t} lang={lang} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

function Packages({ t, lang }) {
  return (
    <section className="paquetes" id="paquetes">
      <div className="wrap">
        <h2>{t.packages.h}</h2>
        <p className="intro">{t.packages.p}</p>
        <div className="paq-grid">
          {packages.map((p) => {
            const c = p[lang];
            return (
              <article key={p.id} className={"paq" + (p.featured ? " destacado" : "")}>
                {p.featured && <span className="insignia">{t.packages.badge}</span>}
                <p className="paq-dias">{c.days}</p>
                <h3>{c.title}</h3>
                <p className="paq-texto">{c.text}</p>
                <ul>
                  {c.inc.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <p className="paq-precio">{t.packages.price}</p>
                <a
                  className={"btn " + (p.featured ? "btn-wa" : "btn-chico")}
                  href={waLink(t.packages.msg(c.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.packages.ask}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function How({ t }) {
  return (
    <section className="pasos-sec" id="como-reservar">
      <div className="wrap">
        <h2>{t.how.h}</h2>
        <p className="intro">{t.how.p}</p>
        <ol className="pasos">
          {t.how.steps.map(([h, p]) => (
            <li key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Why({ t }) {
  return (
    <section className="porque">
      <div className="wrap">
        <h2>{t.why.h}</h2>
        <div className="motivos">
          {t.why.items.map(([h, p]) => (
            <div key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <div className="resenas">{t.why.reviews}</div>
      </div>
    </section>
  );
}

function Booking({ t, lang }) {
  const [name, setName] = useState("");
  const [what, setWhat] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);

  const prettyDate = date ? date.split("-").reverse().join("/") : "";
  const message = t.book.msg({ name: name.trim(), what, date: prettyDate, people });

  const submit = (e) => {
    e.preventDefault();
    window.open(waLink(message), "_blank", "noopener");
  };

  return (
    <section className="reserva" id="reservar">
      <div className="wrap reserva-fila">
        <div>
          <h2>{t.book.h}</h2>
          <p className="intro">{t.book.p}</p>
          <form onSubmit={submit}>
            <label>
              {t.book.name}
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder={t.book.namePh} />
            </label>
            <label>
              {t.book.tour}
              <select value={what} onChange={(e) => setWhat(e.target.value)}>
                <option value="">{t.book.undecided}</option>
                <optgroup label={t.book.toursGroup}>
                  {tours.map((x) => (
                    <option key={x.id} value={x[lang].title}>
                      {x[lang].title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label={t.book.packagesGroup}>
                  {packages.map((x) => (
                    <option key={x.id} value={x[lang].title}>
                      {x[lang].title}
                    </option>
                  ))}
                </optgroup>
              </select>
            </label>
            <div className="fila">
              <label>
                {t.book.date}
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label>
                {t.book.people}
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={people}
                  onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>
            </div>
            <button className="btn btn-wa" type="submit">
              <WaIcon />
              {t.book.send}
            </button>
            <p className="nota-form">{t.book.note}</p>
          </form>
        </div>
        <div className="reserva-lado">
          <p className="prev-t">{t.book.preview}</p>
          <div className="chat" aria-live="polite">
            <div className="burbuja">{message}</div>
          </div>
          <h2 className="h2-chico">{t.contact.h}</h2>
          <dl className="contacto">
            <div>
              <dt>{t.contact.whatsapp}</dt>
              <dd>{PHONE_LABEL}</dd>
            </div>
            <div>
              <dt>{t.contact.city}</dt>
              <dd>{t.contact.cityV}</dd>
            </div>
            <div>
              <dt>{t.contact.hours}</dt>
              <dd>{t.contact.hoursV}</dd>
            </div>
          </dl>
          <div className="mapa">{t.contact.map}</div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es";
    } catch {
      return "es";
    }
  });
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.lang = t.lang;
  }, [t.lang]);

  return (
    <>
      <div className="aviso">
        <strong>{t.notice}</strong> {t.noticeSub}
      </div>
      <Header t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Tours t={t} lang={lang} />
        <Packages t={t} lang={lang} />
        <How t={t} />
        <Why t={t} />
        <Booking t={t} lang={lang} />
      </main>
      <footer>
        <div className="wrap pie-fila">
          <span>
            <strong>Coban Travels</strong> {t.footer.left}
          </span>
          <span>{t.footer.right}</span>
        </div>
      </footer>
      <a className="flota" href={waLink(t.hero.msg)} target="_blank" rel="noopener noreferrer" aria-label={t.floatLabel}>
        <WaIcon />
      </a>
    </>
  );
}
