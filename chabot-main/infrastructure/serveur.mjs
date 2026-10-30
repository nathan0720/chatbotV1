// Serveur fourni pour l'atelier : aucune modification demandée.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const fichiers = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/style.css", ["style.css", "text/css; charset=utf-8"]],
  ["/script.js", ["script.js", "text/javascript; charset=utf-8"]]
]);
const port = Number(process.argv[2] ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("Choisir un port de 1 à 65535 : npm run dev -- 3001");
  process.exit(1);
}
const serveur = createServer(async function (requete, reponse) {
  if (requete.method !== "GET" && requete.method !== "HEAD") {
    reponse.writeHead(405, { Allow: "GET, HEAD" });
    reponse.end();
    return;
  }
  let chemin;
  try { chemin = new URL(requete.url, "http://localhost").pathname; }
  catch { reponse.writeHead(400); reponse.end(); return; }
  const fichier = fichiers.get(chemin);
  if (!fichier) { reponse.writeHead(404); reponse.end("Introuvable"); return; }
  try {
    const contenu = await readFile(new URL("../public/" + fichier[0], import.meta.url));
    reponse.writeHead(200, { "Content-Type": fichier[1], "Cache-Control": "no-store" });
    reponse.end(requete.method === "HEAD" ? undefined : contenu);
  } catch { reponse.writeHead(500); reponse.end("Fichier indisponible"); }
});
serveur.on("error", function (erreur) {
  console.error(erreur.code === "EADDRINUSE"
    ? "Port occupé. Arrêter l'autre serveur ou lancer npm run dev -- 3001."
    : erreur.message);
  process.exitCode = 1;
});
serveur.listen(port, "127.0.0.1", function () {
  console.log("Ouvrir http://127.0.0.1:" + port + "/");
  console.log("Enregistrer puis recharger la page. Arrêt : Ctrl+C.");
});
