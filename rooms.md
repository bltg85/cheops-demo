# Cheops pyramid — rumsspecifikation

Strukturerad specifikation av alla 42 kammare.

## Översikt

| #  | Kammare                  | Typ                                    | Frågor | Max fel | Tid   |
|----|--------------------------|----------------------------------------|--------|---------|-------|
| 1  | Sandens kammare          | Addition lvl 1 · ental                 | 10     | 2       | —     |
| 2  | Skuggornas gång          | Subtraktion lvl 1 · ental              | 10     | 2       | —     |
| 3  | Sfinxens likning         | Ekvation · addition                    | 10     | 2       | —     |
| 4  | Stenhuggarens sal        | Addition lvl 2 · tvåsiffrig            | 10     | 2       | —     |
| 5  | Skarabéens likning       | Ekvation · subtraktion                 | 10     | 2       | —     |
| 6  | Ökenvinden               | Subtraktion lvl 2 · tvåsiffrig         | 10     | 2       | —     |
| 7  | Multipliklarens torn     | Multiplikation lvl 1 · ental           | 10     | 2       | —     |
| 8  | Handelskammaren          | Ekvation · multiplikation              | 10     | 2       | —     |
| 9  | Delningens grotta        | Division lvl 1 · ental                 | 10     | 2       | —     |
| 10 | Kvotens kammare          | Ekvation · division                    | 10     | 2       | —     |
| 11 | Solens kapell            | Blixt-addition                         | 10     | 2       | 2 min |
| 12 | Falkens flygning         | Blixt-subtraktion                      | 10     | 2       | 3 min |
| 13 | Dubbelstenen             | Multiplikation lvl 2 · tvåsiffrig      | 10     | 2       | —     |
| 14 | Papyrusrullen            | Division lvl 2 · tvåsiffrig            | 10     | 2       | —     |
| 15 | Åsktornet                | Blixt-multiplikation                   | 10     | 2       | 2 min |
| 16 | Tidsdelaren              | Blixt-division                         | 10     | 2       | 2 min |
| 17 | De tre bärarna           | Addition · tre termer                  | 15     | 3       | —     |
| 18 | Tre skuggor              | Subtraktion · tre termer               | 15     | 3       | —     |
| 19 | Tre faktorer             | Multiplikation · tre faktorer          | 15     | 3       | —     |
| 20 | Tre kvoter               | Division · tre steg                    | 15     | 3       | —     |
| 21 | Kvadratens kraft         | Upphöjt i två · x²                    | 10     | 2       | —     |
| 22 | Rotens grotta            | Kvadratrot · √x                       | 10     | 2       | —     |
| 23 | Kubens kammare           | Upphöjt i tre · x³                    | 10     | 2       | —     |
| 24 | Triangelns gåta          | Bossgåta · geometri                    | 1      | 1       | —     |
| 25 | Vinkelsummans sal        | Triangelns vinkelsumma                 | 10     | 2       | —     |
| 26 | Triangelns rand          | Triangelns omkrets                     | 10     | 2       | —     |
| 27 | Triangelns yta           | Triangelns area                        | 10     | 2       | —     |
| 28 | Pythagoras kammare       | Pythagoras sats                        | 10     | 2       | —     |
| 29 | Rektangelns mur          | Rektangelns omkrets                    | 10     | 2       | —     |
| 30 | Rektangelns golv         | Rektangelns area                       | 10     | 2       | —     |
| 31 | Diagonalens hemlighet    | Rektangelns diagonal                   | 10     | 2       | —     |
| 32 | Solprocentaren           | Procent · 50 %, 100 %, 200 %          | 10     | 2       | —     |
| 33 | Halvmånens andel         | Procent · 10 %, 25 %, 75 %            | 10     | 2       | —     |
| 34 | Procentlabyrinten        | Procent · blandade                     | 10     | 2       | —     |
| 35 | Procentmästaren          | Procent · över 100 %                  | 10     | 2       | —     |
| 36 | Rätblockets kammare      | 3D · rätblock volym                    | 10     | 2       | —     |
| 37 | Cylinderns torn          | 3D · cylindervolym (utan π)            | 10     | 2       | —     |
| 38 | Sfärens tempel           | 3D · sfäryta (utan π)                  | 10     | 2       | —     |
| 39 | Vinkelmätaren            | Trigonometri · sin, cos, tan           | 10     | 2       | —     |
| 40 | Ormbunksalen             | Fraktal · pussel                       | 1      | 1       | —     |
| 41 | Kammare åttioett         | Fakultet · pussel                      | 1      | 1       | —     |
| 42 | Toppstenen               | Bossgåta · geometri                    | 1      | 1       | —     |

## Generella regler

- 42 kammare staplade som en pyramid. Man börjar längst ner (rum 1) och klättrar uppåt mot toppen (rum 42).
- När ett rum klaras scrollas man upp till nästa kammare.
- Kommande rum är gömda tills man har klarat det aktuella — man kan inte tjuvkika uppåt.
- Redan klarade rum ligger kvar synliga nedåt (dimmad) men går inte att interagera med.
- **Överskrids max fel → man åker ner ett rum (demote).** Rum 1 kan inte demotas; kammaren startar om.
- **Vanligt rum:** fel svar → rätt svar visas kort → nästa fråga automatiskt.
- **Bossrum:** fel svar → man stannar på samma fråga och får försöka igen (inom max fel-gränsen).
- **Timerrum:** om tiden rinner ut räknas det som misslyckat → demote ett rum ner.
- Spelet fungerar med både tangentbord (Enter) och mobilkeypad.

## Inmatning

- **Numeriska rum:** `type="text"` med `inputmode="numeric"`. Accepterar heltal, positiva och negativa.
- **Bossrum med text (rum 40, 41, 42):** vanlig textinmatning.
- **Mobilkeypad (numeriska rum):** 1–9, 0, `±` (växlar tecken), `Rensa`, `Svara`.

---

## Aritmetik (rum 1–20)

### Rum 1 — Sandens kammare (Addition lvl 1)

- **Format:** `a + b` där `a, b ∈ [1, 9]`
- **Svarsspann:** `[2, 18]`

### Rum 2 — Skuggornas gång (Subtraktion lvl 1)

- **Format:** `a − b` där `a ∈ [2, 9]`, `b ∈ [1, a]`
- **Svarsspann:** `[0, 8]` (alltid ≥ 0)

### Rum 3 — Sfinxens likning (Ekvation · addition)

- **Format:** `x + a = b` där `x, a ∈ [1, 9]`
- **Svar:** x

### Rum 4 — Stenhuggarens sal (Addition lvl 2)

- **Format:** `a + b` där `a, b ∈ [10, 79]` och `a + b ≤ 99`

### Rum 5 — Skarabéens likning (Ekvation · subtraktion)

- **Format:** `x − a = b` där `x ∈ [3, 15]`, `a ∈ [1, x−1]`
- **Svar:** x

### Rum 6 — Ökenvinden (Subtraktion lvl 2)

- **Format:** `a − b` där `a ∈ [20, 99]`, `b ∈ [10, a−1]`

### Rum 7 — Multipliklarens torn (Multiplikation lvl 1)

- **Format:** `a × b` där `a, b ∈ [2, 9]`

### Rum 8 — Handelskammaren (Ekvation · multiplikation)

- **Format:** `a × x = b` där `x, a ∈ [2, 9]`
- **Svar:** x
- **Exempel:** `6 × x = 42` → 7

### Rum 9 — Delningens grotta (Division lvl 1)

- **Format:** `a ÷ b` där `b ∈ [2, 9]`, svaret `∈ [2, 9]`, `a = b × svar`

### Rum 10 — Kvotens kammare (Ekvation · division)

- **Format:** `a ÷ x = b` där `x, b ∈ [2, 9]`, `a = x × b`
- **Svar:** x

### Rum 11 — Solens kapell (Blixt-addition)

- **Tidsgräns:** 120 s
- **Format:** `a + b` där `a, b ∈ [1, 9]`

### Rum 12 — Falkens flygning (Blixt-subtraktion)

- **Tidsgräns:** 180 s
- **Format:** `a − b` där `a ∈ [25, 99]`, `b ∈ [10, a−1]`

### Rum 13 — Dubbelstenen (Multiplikation lvl 2)

- **Format:** `a × b` där `a ∈ [11, 19]`, `b ∈ [2, 9]`

### Rum 14 — Papyrusrullen (Division lvl 2)

- **Format:** `a ÷ b` där `b ∈ [2, 9]`, svaret `∈ [11, 19]`, `a = b × svar`

### Rum 15 — Åsktornet (Blixt-multiplikation)

- **Tidsgräns:** 120 s
- **Format:** `a × b` där `a, b ∈ [2, 9]`

### Rum 16 — Tidsdelaren (Blixt-division)

- **Tidsgräns:** 120 s
- **Format:** `a ÷ b` där `b ∈ [2, 9]`, svaret `∈ [2, 9]`

### Rum 17 — De tre bärarna (Addition · tre termer)

- **15 frågor, 3 max fel**
- **Format:** `a + b + c` där `a, b, c ∈ [1, 25]`

### Rum 18 — Tre skuggor (Subtraktion · tre termer)

- **15 frågor, 3 max fel**
- **Format:** `a − b − c` där `a ∈ [30, 99]`, `b, c ∈ [1, 14]`

### Rum 19 — Tre faktorer (Multiplikation · tre faktorer)

- **15 frågor, 3 max fel**
- **Format:** `a × b × c` där `a, b, c ∈ [2, 5]`

### Rum 20 — Tre kvoter (Division · tre steg)

- **15 frågor, 3 max fel**
- **Format:** `a ÷ b ÷ c` där `b, c ∈ [2, 4]`, svaret `∈ [2, 8]`, `a = svar × b × c`

---

## Potens & rot (rum 21–23)

### Rum 21 — Kvadratens kraft (x²)

- **Format:** `a²` där `a ∈ [2, 12]`
- **Svarsspann:** `[4, 144]`

### Rum 22 — Rotens grotta (√x)

- **Format:** `√n` där `n` är ett perfekt kvadrattal, `√n ∈ [2, 12]`

### Rum 23 — Kubens kammare (x³)

- **Format:** `a³` där `a ∈ [2, 6]`
- **Svarsspann:** `[8, 216]`

---

## Boss — Triangelns gåta (rum 24)

- **Typ:** Geometri, bossgåta
- **Fråga:** *"Hur många grader är det totalt i en triangel?"*
- **Svar:** `180`
- **Grafik:** liksidig triangel med frågetecken vid varje vinkel
- **Ledtråd:** *"Alla tre vinklar inuti — tillsammans."*

---

## Geometri — Trianglar (rum 25–28)

### Rum 25 — Vinkelsummans sal

- **Format:** `a° + b° + ?°` där `a ∈ [25, 80]`, `b ∈ [25, min(80, 155−a)]`
- **Svar:** `180 − a − b`

### Rum 26 — Triangelns rand (omkrets)

- **Format:** `a + b + c` (tre giltiga triangelsidor `∈ [3, 12]`)
- **Svar:** `a + b + c`

### Rum 27 — Triangelns yta (area)

- **Format:** `(bas × höjd) ÷ 2` där `bas` alltid jämn `∈ {2,4,…,14}`, `höjd ∈ [2, 10]`
- **Svar:** alltid heltal

### Rum 28 — Pythagoras kammare

- **Format:** `√(a² + b²)` med kända pythagorastripplar: (3,4,5), (5,12,13), (6,8,10), (8,15,17), (9,12,15)
- **Svar:** hypotenusan

---

## Geometri — Rektanglar (rum 29–31)

### Rum 29 — Rektangelns mur (omkrets)

- **Format:** `2 × (a + b)` där `a, b ∈ [2, 15]`

### Rum 30 — Rektangelns golv (area)

- **Format:** `a × b` där `a, b ∈ [2, 15]`

### Rum 31 — Diagonalens hemlighet (diagonal)

- **Format:** `√(a² + b²)` med pythagorastripplar
- **Svar:** diagonalen

---

## Procent (rum 32–35)

### Rum 32 — Solprocentaren (lvl 1)

- **Procenttal:** 50 %, 100 %, 200 %
- **Format:** `p % av n` där `n` alltid jämnt (bas `∈ {4, 6, …, 40}`)

### Rum 33 — Halvmånens andel (lvl 2)

- **Procenttal:** 10 %, 25 %, 75 %
- **Bas anpassas** så svaret alltid blir heltal

### Rum 34 — Procentlabyrinten (lvl 3)

- **Procenttal:** 20 %, 30 %, 40 %, 60 %, 80 %
- **Bas:** multipel av 10 `∈ [10, 150]`

### Rum 35 — Procentmästaren (lvl 4)

- **Procenttal:** 125 %, 150 %, 175 %, 250 %
- **Bas:** multipel av 4 `∈ [8, 40]` → alltid heltals-svar

---

## 3D-objekt (rum 36–38)

### Rum 36 — Rätblockets kammare (volym)

- **Format:** `l × b × h` där `l, b, h ∈ [2, 8]`

### Rum 37 — Cylinderns torn (volym, utan π)

- **Subtitle förklarar:** "Volym = r² × h × π · svara utan π"
- **Format:** `r² × h` där `r ∈ [2, 7]`, `h ∈ [2, 9]`
- **Svar:** `r² × h` (koefficienten framför π)

### Rum 38 — Sfärens tempel (yta, utan π)

- **Subtitle förklarar:** "Yta = 4 × r² × π · svara utan π"
- **Format:** `4 × r²` där `r ∈ [1, 8]`
- **Svar:** `4r²`

---

## Trigonometri (rum 39)

### Rum 39 — Vinkelmätaren

- **Standardvinklar:** 0°, 45°, 90°, 180°
- **Frågor ur tabellen:**

| Fråga       | Svar |
|-------------|------|
| sin(0°)     | 0    |
| sin(90°)    | 1    |
| sin(180°)   | 0    |
| cos(0°)     | 1    |
| cos(90°)    | 0    |
| cos(180°)   | −1   |
| tan(0°)     | 0    |
| tan(45°)    | 1    |
| tan(180°)   | 0    |

*Enbart heltalssvar — sin(45°) etc. exkluderas.*

---

## Special — Fraktal (rum 40, pussel)

### Rum 40 — Ormbunksalen

- **Typ:** Pussel, textinmatning
- **Grafik:** Barnsley-ormbunke (fraktal-SVG)
- **Fråga:** *"Denna ormbunke skapas genom att samma mönster upprepas i allt mindre skala. Vad kallas den typen av geometriskt objekt?"*
- **Svar:** `fraktal` (accepterar även `fractal`)
- **Ledtråd:** *"Tänk på självlikhet — delen liknar helheten."*

---

## Special — Fakultet (rum 41, pussel)

### Rum 41 — Kammare åttioett

- **Typ:** Pussel, textinmatning
- **Grafik:** Visar `81!` med förklarande text `= 81 × 80 × 79 × … × 2 × 1`
- **Fråga:** *"Du har nått den legendariska kammare 81. Skriv det matematiska uttrycket för produkten av alla heltal från 81 ner till 1."*
- **Svar:** `81!`
- **Ledtråd:** *"Det finns en notation med ett utropstecken …"*

---

## Boss — Toppstenen (rum 42, pussel)

### Rum 42 — Toppstenen

- **Typ:** Geometri, bossgåta
- **Fråga:** *"Vad heter den här fyrhörningen?"*
- **Svar:** `parallelltrapets` (accepterar även `paralleltrapets`)
- **Grafik:** parallelltrapets med markerade parallella sidor
- **Inmatning:** textinmatning
- **Ledtråd:** *"Två sidor är parallella, men den är inte en rektangel."*

---

## Vinstskärm

När rum 42 är klarat visas en topp-skärm med:

- Rubrik: **"Grattis! du klarade Cheops."**
- Total tid från start till vinst (`mm:ss`)
- Bekräftelse att alla 42 kammare klarades
- Knapp: **Spela demo igen**
