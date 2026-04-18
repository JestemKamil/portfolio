# Portfolio — Kamil Wąsik

Portfolio web developera z sekcją projektów i narzędziami online:
- **Kreator CV** (`/tools/cv-creator`) — dostępny
- **Kreator Listu Motywacyjnego** — **już wkrótce**

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Aplikacja lokalnie: `http://localhost:3000`

## Walidacja przed wdrożeniem

```bash
npm run lint
npm run build
```

## SEO i metadane

W projekcie są skonfigurowane:
- metadane strony (`src/app/layout.tsx`)
- `robots.txt` (`src/app/robots.ts`)
- `sitemap.xml` (`src/app/sitemap.ts`)
- `manifest.webmanifest` (`src/app/manifest.ts`)

## Wdrożenie na Vercel

1. Podłącz repozytorium w Vercel.
2. Ustaw framework: **Next.js** (auto-detect).
3. Upewnij się, że produkcyjna domena to `https://kamil-wasik.pl`.
4. Wykonaj deploy i sprawdź ścieżki:
   - `/`
   - `/tools/cv-creator`
   - `/privacy`
   - `/robots.txt`
   - `/sitemap.xml`

## Checklista release (produkcyjna)

1. `npm run lint` i `npm run build` przechodzą bez błędów.
2. Brak martwych linków i placeholderów `#`.
3. Narzędzia mają poprawne statusy (dostępne vs wkrótce).
4. Metadane strony i sitemap są aktualne.
5. Po wdrożeniu wykonany smoke test kluczowych podstron.
6. Monitoring i alerty skonfigurowane po stronie Vercel (Analytics / Logs / Alerts).

## Prywatność

Strona prywatności: `/privacy`.

Kreator CV przechowuje wpisane dane lokalnie w przeglądarce (localStorage), bez wysyłania ich do backendu aplikacji.
