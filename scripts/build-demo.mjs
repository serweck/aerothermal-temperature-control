// Monta la demo de GitHub Pages: demo/template.html con el dist real de la
// tarjeta, los iconos MDI que usa y la version de package.json.
// Uso: npm run build && node scripts/build-demo.mjs  -> _site/index.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const card = read("dist/aerothermal-temperature-control.js");
if (card.toLowerCase().includes("</script")) throw new Error("el dist contiene </script>");
const { version } = JSON.parse(read("package.json"));

const html = read("demo/template.html")
  .replace("__VERSION__", version)
  .replace("__ICONS__", () => read("demo/icons.json").trim())
  .replace("__CARD_JS__", () => card);

mkdirSync(new URL("../_site/", import.meta.url), { recursive: true });
writeFileSync(new URL("../_site/index.html", import.meta.url), html);
console.log(`_site/index.html (v${version}, ${html.length} bytes)`);
