# Cheops pyramid — rumsspecifikation

Strukturerad specifikation av alla kammare i demo-versionen (10 rum).
Full version planeras till 100 kammare.

## Översikt

| #  | Kammare              | Typ                           | Antal frågor | Max fel | Tid   |
|----|----------------------|-------------------------------|--------------|---------|-------|
| 1  | Sandens kammare      | Plus, ental + ental           | 10           | 2       | —     |
| 2  | Skuggornas gång      | Minus, ental − ental          | 10           | 2       | —     |
| 3  | Stenhuggarens sal    | Plus, tvåsiffrig              | 10           | 2       | —     |
| 4  | Solens kapell        | Plus, ental (blixt)           | 10           | 2       | 2 min |
| 5  | Triangelns gåta      | Bossgåta · geometri           | 1            | 1       | —     |
| 6  | Multipliklarens torn | Multiplikation, ental         | 20           | 4       | —     |
| 7  | Mörka galleriet      | Minus, tvåsiffrig (kan bli negativ) | 20     | 4       | —     |
| 8  | De tre bärarna       | Plus, 3 termer                | 20           | 4       | —     |
| 9  | Falkens flygning     | Minus, tvåsiffrig (blixt)     | 20           | 4       | 3 min |
| 10 | Toppstenen           | Bossgåta · geometri           | 1            | 1       | —     |

## Generella regler

- Tio kammare staplade som en pyramid. Man börjar längst ner (rum 1) och klättrar uppåt mot toppen (rum 10).
- När ett rum klaras scrollas man upp till nästa kammare.
- Kommande rum är gömda tills man har klarat det aktuella — man kan alltså inte tjuvkika uppåt i pyramiden.
- Redan klarade rum ligger kvar synliga nedåt (dimmad) men går inte att interagera med.
- **Överskrids max fel → man åker ner ett rum (demote).** Rum 1 kan inte demotas; kammaren startar om istället.
- **Vanligt rum:** fel svar → rätt svar visas kort → nästa fråga automatiskt.
- **Bossrum:** fel svar → man stannar på samma fråga och får försöka igen (inom max fel-gränsen).
- **Timerrum:** om tiden rinner ut räknas det som misslyckat → demote ett rum ner.
- Spelet fungerar med både tangentbord (Enter för att svara) och mobilkeypad.
- Svarsfältet fokuseras automatiskt när ett nytt rum öppnas — siffror går rakt in.
- Rekommenderad ålder: 4–10 år.

## Inmatning

- **Numeriska rum:** `type="text"` med `inputmode="numeric"`. Accepterar heltal, positiva och negativa.
- **Bossrum med text (rum 10):** vanlig textinmatning.
- **Mobilkeypad (numeriska rum):** 1–9, 0, `±` (växlar tecken), `Rensa`, `Svara`.

---

## Rum 1 — Sandens kammare

- **Typ:** Enkla plustal, ental + ental
- **Antal frågor:** 10
- **Max fel:** 2
- **Format:** `a + b` där `a, b ∈ [1, 9]`
- **Svarsspann:** `[2, 18]`
- **Exempel:** `3 + 5`, `7 + 2`, `9 + 4`

## Rum 2 — Skuggornas gång

- **Typ:** Enkla minustal, ental − ental
- **Antal frågor:** 10
- **Max fel:** 2
- **Format:** `a − b` där `a ∈ [2, 9]`, `b ∈ [1, a]`
- **Svarsspann:** `[0, 8]` (alltid ≥ 0)
- **Exempel:** `8 − 3`, `5 − 1`, `9 − 9`

## Rum 3 — Stenhuggarens sal

- **Typ:** Tvåsiffrig addition
- **Antal frågor:** 10
- **Max fel:** 2
- **Format:** `a + b` där `a, b ∈ [10, 79]` och `a + b ≤ 99`
- **Svarsspann:** `[20, 99]` (alltid tvåsiffrigt)
- **Exempel:** `23 + 45`, `31 + 12`, `50 + 28`

## Rum 4 — Solens kapell

- **Typ:** Blixt-addition, ental + ental
- **Antal frågor:** 10
- **Max fel:** 2
- **Tidsgräns:** 120 sekunder (2 minuter)
- **Format:** `a + b` där `a, b ∈ [1, 9]`
- **Exempel:** `6 + 7`, `4 + 8`
- **Vid timeout:** demote ett rum ner

## Rum 5 — Triangelns gåta (bossrum)

- **Typ:** Geometri, bossgåta
- **Antal frågor:** 1
- **Max fel:** 1 (alltså 2 försök totalt)
- **Fråga:** *"Hur många grader är det totalt i en triangel?"*
- **Svar:** `180`
- **Grafik:** liksidig triangel med frågetecken vid varje vinkel
- **Ledtråd (visas vid fel):** *"Alla tre vinklar inuti — tillsammans."*

## Rum 6 — Multipliklarens torn

- **Typ:** Entalsmultiplikation
- **Antal frågor:** 20
- **Max fel:** 4
- **Format:** `a × b` där `a, b ∈ [2, 9]`
- **Svarsspann:** `[4, 81]`
- **Exempel:** `7 × 8`, `3 × 6`, `9 × 9`

## Rum 7 — Mörka galleriet

- **Typ:** Tvåsiffrig subtraktion (svar kan bli negativt)
- **Antal frågor:** 20
- **Max fel:** 4
- **Format:** `a − b` där `b ∈ [10, 99]` och `a ∈ [max(1, b − 9), 99]`
- **Svarsspann:** `[-9, 89]` — alltså kan svaret bli negativt, men aldrig mindre än `-9`
- **Exempel:**
  - `7 − 11 = -4`
  - `1 − 10 = -9`
  - `80 − 12 = 68`
  - `50 − 25 = 25`
- **Negativa svar:** matas in med `-` via tangentbord eller `±`-knappen på mobilen

## Rum 8 — De tre bärarna

- **Typ:** Addition av tre termer
- **Antal frågor:** 20
- **Max fel:** 4
- **Format:** `a + b + c` där `a, b, c ∈ [1, 25]`
- **Svarsspann:** `[3, 75]`
- **Exempel:** `7 + 12 + 4`, `20 + 9 + 15`, `25 + 25 + 25`

## Rum 9 — Falkens flygning

- **Typ:** Blixt-subtraktion, tvåsiffrig
- **Antal frågor:** 20
- **Max fel:** 4
- **Tidsgräns:** 180 sekunder (3 minuter)
- **Format:** `a − b` där `a ∈ [25, 99]`, `b ∈ [10, a − 1]`
- **Svarsspann:** `[1, 89]` (alltid positivt)
- **Exempel:** `63 − 27`, `90 − 14`
- **Vid timeout:** demote ett rum ner

## Rum 10 — Toppstenen (bossrum)

- **Typ:** Geometri, bossgåta
- **Antal frågor:** 1
- **Max fel:** 1 (alltså 2 försök totalt)
- **Fråga:** *"Vad heter den här fyrhörningen?"*
- **Svar:** `parallelltrapets` (accepterar även stavningen `paralleltrapets`)
- **Grafik:** parallelltrapets med två markerade parallella sidor
- **Inmatning:** textinmatning (inte numerisk)
- **Ledtråd (visas vid fel):** *"Två sidor är parallella, men den är inte en rektangel."*

---

## Vinstskärm

När rum 10 är klarat visas en topp-skärm med:

- Rubrik: **"Grattis! du klarade Cheops."**
- Total tid från start till vinst (`mm:ss`)
- Bekräftelse att demo-versionen är klarad
- Teaser: *"Snart kommer samtliga 100 banor"*
- Knapp: **Spela demo igen** (nollställer state och scrollar till intro)
