# Twoja Energia — Platforma Zdrowia i Fitnessu

**Twoja Energia** to nowoczesna platforma internetowa dla osób dbających o swoje zdrowie i kondycję. Projekt umożliwia przeglądanie ćwiczeń, filtrowanie ich według grup mięśni i dodawanie ulubionych treningów do listy ulubionych.

**Strona projektu w wersji na żywo:** [Demo Twojej Energii](https://tamara-kat.github.io/goit-js-hw-your-energy-TamaraK1/)

---

## Funkcje
- **Katalog Ćwiczeń:** Wygodne wyszukiwanie i filtrowanie według kategorii (części ciała, mięśnie, sprzęt).
- **Ulubione:** Zapisywanie ulubionych ćwiczeń w pamięci lokalnej (LocalStorage).
- **W pełni responsywny:** Adaptacyjny design dla urządzeń mobilnych, tabletów i komputerów stacjonarnych (Mobile-first).
- **Cytat Dnia:** Codzienny cytat motywacyjny ładowany przez API. - **Subskrypcja:** Możliwość subskrypcji aktualizacji za pomocą formularza w stopce.

---

## Zestaw technologii
- **Builder:** [Vite](https://vitejs.dev/) — dla szybkiego rozwoju i zoptymalizowanej kompilacji.
- **Układ:** HTML5 (z wykorzystaniem `vite-plugin-html-inject` dla zapewnienia modułowości).
- **Style:** SCSS (Sass) z wykorzystaniem metodologii **BEM (Block Element Modifier)**.
- **Język:** JavaScript (ES6+).
- **Optymalizacja:** Format obrazu WebP, responsywne obrazy (`srcset`).

---

## Jak uruchomić projekt lokalnie

Aby wdrożyć projekt na swoim komputerze, wykonaj następujące kroki:

1. **Sklonuj repozytorium:**
```bash
git clone [https://github.com/Tamara-Kat/goit-js-hw-your-energy-TamaraK1.git](https://github.com/Tamara-Kat/goit-js-hw-your-energy-TamaraK1.git)
```
2. **Przejdź do folderu projektu:**
```bash
cd goit-js-hw-your-energy-TamaraK1
```
3. **Zainstaluj zależności:**

```bash
npm install
```
4. **Uruchom tryb deweloperski:**

```bash
npm run dev
```
Następnie otwórz link http://localhost:5173 w przeglądarce

## Kompilacja projektu (Build)
Aby utworzyć zoptymalizowaną wersję projektu do uruchomienia produkcyjnego:

```bash
npm run build
```
Ukończone pliki będą znajdować się w folderze dist.

## Autor
Tamara Katsyashvili - Student

Projekt został ukończony w ramach kursu GoIT.