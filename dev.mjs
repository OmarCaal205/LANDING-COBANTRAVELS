import { context } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";

const PORT = 5173;

mkdirSync("dev", { recursive: true });

// Misma plantilla que el build final, pero cargando main.js y main.css por separado
const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Coban Travels | Propuesta de diseño (desarrollo)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/main.css">
</head>
<body>
<div id="root"></div>
<script>new EventSource("/esbuild").addEventListener("change", () => location.reload());</script>
<script src="/main.js"></script>
</body>
</html>`;
writeFileSync("dev/index.html", html);

const ctx = await context({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  outdir: "dev",
  jsx: "automatic",
  loader: { ".css": "css" },
  define: { "process.env.NODE_ENV": '"development"' },
  sourcemap: true,
  logLevel: "info",
});

await ctx.watch();
const { host, port } = await ctx.serve({ servedir: "dev", port: PORT });
console.log(`\n  Abre http://localhost:${port}\n  Los cambios se recargan solos al guardar.\n`);
