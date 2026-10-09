// Ilustraciones originales de ejemplo. En la versión final se reemplazan por fotos reales del negocio.

const svgProps = {
  viewBox: "0 0 400 300",
  preserveAspectRatio: "xMidYMid slice",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
};

function Pools() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sc-sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFE6E0" /><stop offset="1" stopColor="#6FC3B6" /></linearGradient>
        <linearGradient id="sc-w1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#52D8CB" /><stop offset="1" stopColor="#1B9A94" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sc-sky1)" />
      <path d="M0 120 Q80 70 170 110 T400 90 V300 H0Z" fill="#2F6B4A" />
      <path d="M0 170 Q120 120 230 160 T400 140 V300 H0Z" fill="#1F5238" />
      <g stroke="#EDF1EC" strokeWidth="5" fill="url(#sc-w1)">
        <ellipse cx="270" cy="170" rx="82" ry="22" transform="rotate(-6 270 170)" />
        <ellipse cx="175" cy="205" rx="92" ry="25" transform="rotate(4 175 205)" />
        <ellipse cx="275" cy="238" rx="86" ry="23" transform="rotate(-4 275 238)" />
        <ellipse cx="150" cy="268" rx="96" ry="24" transform="rotate(3 150 268)" />
      </g>
    </svg>
  );
}

function Cave() {
  const drips = [60, 105, 150, 255, 300, 345];
  return (
    <svg {...svgProps}>
      <defs>
        <radialGradient id="sc-glow" cx=".5" cy=".62" r=".5"><stop offset="0" stopColor="#F7E7B0" /><stop offset="1" stopColor="#4F6B5C" /></radialGradient>
        <linearGradient id="sc-river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3FBDB4" /><stop offset="1" stopColor="#17696B" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="#2A302B" />
      <path d="M70 300 V150 Q70 40 200 40 Q330 40 330 150 V300Z" fill="url(#sc-glow)" />
      <path d="M0 0 H400 V300 H0Z M70 300 V150 Q70 40 200 40 Q330 40 330 150 V300Z" fill="#3A413A" fillRule="evenodd" />
      {drips.map((x, i) => (
        <path key={x} d={`M${x} 0 L${x + 14} 0 L${x + 7} ${46 + (i % 3) * 20}Z`} fill="#4B5349" />
      ))}
      <path d="M0 250 Q120 215 200 235 T400 225 V300 H0Z" fill="url(#sc-river)" />
      <path d="M40 270 Q110 250 180 262" stroke="#8FE4DB" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

function Lagoon() {
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sc-sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F6D9A8" /><stop offset="1" stopColor="#CBE8E2" /></linearGradient>
        <linearGradient id="sc-lag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#47D2D0" /><stop offset="1" stopColor="#127A86" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sc-sky2)" />
      <circle cx="300" cy="78" r="30" fill="#FBEBC4" />
      <path d="M0 140 Q60 110 120 135 T240 125 T400 135 V300 H0Z" fill="#2B5A3C" />
      <ellipse cx="200" cy="205" rx="250" ry="62" fill="url(#sc-lag)" />
      <path d="M0 262 Q100 232 200 252 T400 238 V300 H0Z" fill="#1E4A31" />
      <path d="M90 200 Q150 190 210 200" stroke="#9BE9E4" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M220 222 Q280 214 330 222" stroke="#9BE9E4" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

function Forest() {
  const trunks = [30, 78, 130, 188, 246, 300, 352];
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sc-mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DDEBE0" /><stop offset="1" stopColor="#8DB295" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sc-mist)" />
      <path d="M0 150 Q100 100 200 140 T400 120 V300 H0Z" fill="#6E9A77" opacity=".7" />
      <path d="M0 190 Q120 140 240 180 T400 165 V300 H0Z" fill="#4A7D58" opacity=".85" />
      {trunks.map((x, i) => (
        <g key={x}>
          <rect x={x} y={70 + (i % 3) * 14} width="9" height="240" rx="4" fill="#2C4B34" />
          <ellipse cx={x + 4} cy={78 + (i % 3) * 14} rx="38" ry="22" fill={i % 2 ? "#356B45" : "#2E5C3C"} />
        </g>
      ))}
      <rect y="210" width="400" height="90" fill="#DDEBE0" opacity=".35" />
      <circle cx="318" cy="205" r="6" fill="#C8323C" />
      <path d="M318 205 q-18 4 -26 -8 q16 -6 26 8Z" fill="#2FA37B" />
    </svg>
  );
}

function Coffee() {
  const rows = [0, 1, 2, 3];
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id="sc-sky3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3D9B8" /><stop offset="1" stopColor="#CFE3D2" /></linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sc-sky3)" />
      <path d="M0 130 L90 70 L170 120 L260 60 L400 130 V300 H0Z" fill="#7C9C86" />
      <path d="M0 160 Q150 120 400 150 V300 H0Z" fill="#587F57" />
      {rows.map((r) => (
        <g key={r}>
          {Array.from({ length: 8 }).map((_, c) => {
            const x = 20 + c * 50 + r * 12;
            const y = 188 + r * 28;
            return (
              <g key={c}>
                <ellipse cx={x} cy={y} rx={22 + r * 3} ry={12 + r * 2} fill={r % 2 ? "#2F6040" : "#3B7449"} />
                <circle cx={x - 6} cy={y - 2} r="2.4" fill="#C8323C" />
                <circle cx={x + 7} cy={y + 2} r="2.4" fill="#C8323C" />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

const map = { pools: Pools, cave: Cave, lagoon: Lagoon, forest: Forest, coffee: Coffee };

export function Scene({ name }) {
  const C = map[name] || Pools;
  return <C />;
}

export function HeroPools() {
  return (
    <svg viewBox="0 0 700 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="hp1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5BE0D3" /><stop offset="1" stopColor="#1D9C95" /></linearGradient>
        <linearGradient id="hp2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#34C6BA" /><stop offset="1" stopColor="#16837F" /></linearGradient>
        <linearGradient id="hp3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3FCDC8" /><stop offset="1" stopColor="#1B8F96" /></linearGradient>
      </defs>
      <g stroke="#EDF1EC" strokeWidth="9">
        <ellipse className="poza-e" cx="520" cy="110" rx="150" ry="72" transform="rotate(-14 520 110)" fill="url(#hp1)" />
        <ellipse className="poza-e" cx="360" cy="205" rx="165" ry="78" transform="rotate(-8 360 205)" fill="url(#hp2)" />
        <ellipse className="poza-e" cx="545" cy="292" rx="140" ry="66" transform="rotate(10 545 292)" fill="url(#hp3)" />
        <ellipse className="poza-e" cx="370" cy="392" rx="170" ry="80" transform="rotate(-6 370 392)" fill="url(#hp1)" />
        <ellipse className="poza-e" cx="560" cy="482" rx="130" ry="62" transform="rotate(12 560 482)" fill="url(#hp2)" />
        <ellipse className="poza-e" cx="395" cy="570" rx="150" ry="68" transform="rotate(-4 395 570)" fill="url(#hp3)" />
      </g>
      <g className="brillos" fill="none" stroke="#C9FFF8" strokeWidth="3" strokeLinecap="round" opacity=".55">
        <path d="M430 195 q30 -10 60 0" />
        <path d="M500 285 q26 -8 52 0" />
        <path d="M320 385 q34 -10 70 0" />
        <path d="M520 475 q22 -8 44 0" />
      </g>
    </svg>
  );
}
