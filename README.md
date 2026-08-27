# Repeat

Deník denních rutin — série, statistiky, připomínky. Jedna statická stránka, žádný server, žádný účet. Data zůstávají v prohlížeči zařízení, na kterém appku používáš.

## Obsah repozitáře

```
index.html              celá aplikace (HTML + CSS + JS v jednom souboru)
manifest.webmanifest    metadata pro instalaci na plochu
sw.js                   service worker — offline provoz
fonts/                  Schibsted Grotesk + IBM Plex Mono (self-hosted, latin a latin-ext)
icons/                  ikony aplikace
.nojekyll               vypne Jekyll na GitHub Pages
```

## Nasazení na GitHub Pages

1. Na GitHubu vytvoř nový repozitář, třeba `repeat`. Může být veřejný i soukromý — Pages funguje i pro soukromé repozitáře na placeném plánu, na free plánu musí být repozitář veřejný.

2. Nahraj obsah téhle složky do kořene repozitáře (ne do podsložky):

   ```bash
   git init
   git add .
   git commit -m "Repeat"
   git branch -M main
   git remote add origin https://github.com/UZIVATEL/repeat.git
   git push -u origin main
   ```

   Nebo přes web: **Add file → Upload files**, přetáhni všechny soubory včetně složek `fonts/` a `icons/`.

3. V repozitáři jdi do **Settings → Pages**. V sekci *Build and deployment* nastav **Source: Deploy from a branch**, **Branch: main**, složka **/ (root)**. Ulož.

4. Za minutu nebo dvě bude appka na adrese:

   ```
   https://UZIVATEL.github.io/repeat/
   ```

HTTPS je tu důležité — bez něj by nefungoval service worker ani instalace na plochu. GitHub Pages ho dává automaticky.

## Instalace na iPhone

1. Otevři adresu **v Safari** (ne v Chromu — instalaci na plochu umí na iOS jen Safari).
2. Klepni na ikonu **Sdílet** (čtvereček se šipkou nahoru).
3. **Přidat na plochu** → **Přidat**.

Teď se appka chová jako běžná aplikace: vlastní ikona, žádný adresní řádek, funguje offline.

Na Androidu je postup stejný přes Chrome → nabídka → *Přidat na plochu* / *Nainstalovat aplikaci*.

## Připomínky

V Nastavení zapni *Systémová oznámení* a povol je, až se prohlížeč zeptá. Po instalaci na plochu chodí oznámení do notifikačního centra iOS.

Jedno omezení, které stojí za to vědět dopředu: appka bez serveru dokáže hlídat čas jen tehdy, když běží nebo je na pozadí. Když ji úplně zavřeš (odswipeuješ), naplánované připomínky ten den nedorazí. Spolehlivé doručení i po zavření vyžaduje push server — to je samostatná věc, kterou lze doplnit později.

## Aktualizace na novou verzi

Když nahraješ změněný `index.html`, **zvyš verzi v `sw.js`**:

```js
const VERSION = 'repeat-v2';   // bylo repeat-v1
```

Bez toho by prohlížeč servíroval starou verzi z cache. Po nahrání appku jednou zavři a znovu otevři — nová verze se natáhne.

## Data a zálohy

Rutiny i historie žijí v `localStorage` daného prohlížeče. Neputují mezi zařízeními a zmizí, když smažeš data webu.

V **Nastavení → Data** je *Export* (stáhne JSON) a *Import*. Dělej si zálohu čas od času, hlavně než budeš appku aktualizovat nebo měnit telefon.

## Vývoj lokálně

Service worker nefunguje přes `file://`. Spusť si lokální server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```
