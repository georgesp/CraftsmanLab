/**
 * Prerendering du site : genere un index.html complet pour chaque route du sitemap.
 *
 * Le site est une SPA : sans cette etape, Azure Static Web Apps sert la meme
 * coquille vide (index.html) pour toutes les URLs. Les moteurs de recherche
 * recoivent alors des pages sans titre, sans description et sans contenu
 * propres, ce qui les fait basculer en « Exploree, actuellement non indexee ».
 *
 * Principe : on sert le dossier build/ en local, on ouvre chaque route dans un
 * Chrome headless, on laisse React rendre la page, puis on ecrit le HTML obtenu
 * dans build/<route>/index.html. Azure sert ces fichiers statiques en priorite
 * et ne retombe sur le navigationFallback que pour les URLs inconnues.
 */
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';

const RACINE = path.resolve(process.cwd(), 'build');
const SITEMAP = path.join(RACINE, 'sitemap.xml');
const PORT = Number(process.env.PRERENDER_PORT ?? 4173);
/** Langue utilisee pour le rendu statique : le domaine est un .fr. */
const LANGUE = process.env.PRERENDER_LANG ?? 'fr-FR';
/** Delai max d'attente du marqueur de fin de rendu, par page. */
const TIMEOUT_MS = Number(process.env.PRERENDER_TIMEOUT ?? 20000);
/**
 * Seuils de texte en dessous desquels on considere la page figee trop tot.
 * Les pages de detail (/tips/x, /prompts/x) portent un article complet ; les
 * pages de liste et statiques peuvent legitimement etre courtes.
 */
const LONGUEUR_MIN_DETAIL = Number(process.env.PRERENDER_MIN_TEXT_DETAIL ?? 800);
const LONGUEUR_MIN_LISTE = Number(process.env.PRERENDER_MIN_TEXT ?? 200);

const TYPES_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

/** Localise un Chrome/Chromium utilisable, sans rien telecharger. */
function trouverNavigateur() {
  if (process.env.PRERENDER_BROWSER) return process.env.PRERENDER_BROWSER;

  const candidats = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ].filter(Boolean);
  for (const c of candidats) {
    if (existsSync(c)) return c;
  }

  for (const nom of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try {
      const trouve = execSync(`command -v ${nom}`, { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString()
        .trim();
      if (trouve) return trouve;
    } catch {
      /* binaire absent : on essaie le suivant */
    }
  }

  throw new Error(
    "Aucun Chrome/Chromium trouve. Installez Google Chrome, ou definissez PRERENDER_BROWSER avec le chemin de l'executable.",
  );
}

/** Extrait les chemins a prerendre depuis le sitemap genere. */
async function lireRoutes() {
  const xml = await fs.readFile(SITEMAP, 'utf8');
  const routes = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => {
      try {
        return new URL(m[1]).pathname;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  return [...new Set(routes)].sort();
}

/**
 * Serveur statique minimal sur build/, avec repli SPA sur index.html.
 * La coquille de repli est lue une seule fois au demarrage : le script ecrit
 * lui-meme dans build/, et chaque page doit partir de la coquille d'origine,
 * pas du HTML deja prerendu d'une route precedente.
 */
async function demarrerServeur() {
  const coquille = await fs.readFile(path.join(RACINE, 'index.html'));
  const serveur = http.createServer(async (req, res) => {
    const chemin = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const candidat = path.join(RACINE, chemin);

    // Empeche toute sortie du dossier build/.
    if (!candidat.startsWith(RACINE)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    try {
      const infos = await fs.stat(candidat);
      if (infos.isFile()) {
        const contenu = await fs.readFile(candidat);
        res.writeHead(200, {
          'Content-Type': TYPES_MIME[path.extname(candidat).toLowerCase()] ?? 'application/octet-stream',
        });
        res.end(contenu);
        return;
      }
    } catch {
      /* fichier absent : on tombe sur le repli SPA */
    }

    res.writeHead(200, { 'Content-Type': TYPES_MIME['.html'] });
    res.end(coquille);
  });

  return new Promise((resolve) => serveur.listen(PORT, '127.0.0.1', () => resolve(serveur)));
}

/** Transforme '/tips/dapper' en 'build/tips/dapper/index.html'. */
function fichierDeSortie(route) {
  if (route === '/') return path.join(RACINE, 'index.html');
  return path.join(RACINE, route.replace(/^\/+|\/+$/g, ''), 'index.html');
}

async function main() {
  if (!existsSync(RACINE)) {
    throw new Error(`Dossier ${RACINE} introuvable : lancez le build avant le prerendering.`);
  }
  if (!existsSync(SITEMAP)) {
    throw new Error(`Sitemap ${SITEMAP} introuvable : lancez generate-sitemap avant le prerendering.`);
  }

  const executablePath = trouverNavigateur();
  const routes = await lireRoutes();
  console.log(`Prerendering de ${routes.length} routes avec ${executablePath}`);

  const serveur = await demarrerServeur();
  const navigateur = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      `--lang=${LANGUE}`,
      `--accept-lang=${LANGUE}`,
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  let echecs = 0;
  try {
    for (const route of routes) {
      const page = await navigateur.newPage();
      try {
        await page.setExtraHTTPHeaders({ 'Accept-Language': LANGUE });

        // i18next lit d'abord localStorage, puis navigator. On fixe les deux pour
        // que le HTML statique soit toujours dans la langue voulue, quelle que
        // soit la configuration de la machine qui lance le build.
        await page.evaluateOnNewDocument((codeLangue) => {
          const court = codeLangue.split('-')[0];
          try {
            window.localStorage.setItem('i18nextLng', court);
          } catch {
            /* storage indisponible : on se rabat sur navigator */
          }
          Object.defineProperty(navigator, 'language', { get: () => codeLangue });
          Object.defineProperty(navigator, 'languages', { get: () => [codeLangue, court] });
        }, LANGUE);

        // Le prerendering ne doit pas dependre du reseau externe : les polices
        // Google et autres ressources tierces sont coupees, leurs <link> restent
        // dans le HTML et seront chargees normalement par le navigateur du visiteur.
        await page.setRequestInterception(true);
        page.on('request', (requete) => {
          const url = requete.url();
          if (url.startsWith(`http://127.0.0.1:${PORT}`) || url.startsWith('data:')) {
            requete.continue();
          } else {
            requete.abort();
          }
        });
        await page.goto(`http://127.0.0.1:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: TIMEOUT_MS,
        });
        // Le contenu des tips et prompts arrive par import dynamique : on attend
        // que le conteneur React ne soit plus vide avant de figer le HTML.
        await page.waitForFunction(
          () => {
            const racine = document.getElementById('root');
            return !!racine && racine.children.length > 0;
          },
          { timeout: TIMEOUT_MS },
        );

        const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`);
        const titre = await page.title();

        // Garde-fou : une page figee trop tot (contenu pas encore charge, ou
        // metadonnees non posees) est pire qu'une absence de prerendering, car
        // elle sert un doublon de la home aux moteurs. On echoue bruyamment.
        const texte = await page.evaluate(() => document.body.innerText.trim().length);
        const estDetail = route.split('/').filter(Boolean).length >= 2;
        const minimum = estDetail ? LONGUEUR_MIN_DETAIL : LONGUEUR_MIN_LISTE;
        if (texte < minimum) {
          throw new Error(
            `contenu trop court (${texte} caracteres, minimum ${minimum}) : rendu probablement incomplet`,
          );
        }
        if (route !== '/' && titre === 'CraftsmanLab') {
          throw new Error('titre par defaut : useSeo ne s\'est pas applique sur cette route');
        }

        const sortie = fichierDeSortie(route);
        await fs.mkdir(path.dirname(sortie), { recursive: true });
        await fs.writeFile(sortie, html, 'utf8');
        console.log(`  ok  ${route.padEnd(45)} ${(html.length / 1024).toFixed(0)} ko  « ${titre} »`);
      } catch (erreur) {
        echecs++;
        console.error(`  ECHEC ${route} : ${erreur.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await navigateur.close();
    serveur.close();
  }

  if (echecs > 0) {
    throw new Error(`${echecs} route(s) n'ont pas pu etre prerendues.`);
  }
  console.log(`\nPrerendering termine : ${routes.length} pages ecrites dans build/.`);
}

main().catch((erreur) => {
  console.error(erreur.message);
  process.exit(1);
});
