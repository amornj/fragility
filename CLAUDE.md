# CLAUDE.md — Essential Frailty Toolset (EFT) Calculator

## Project Overview

A standalone single-page web application that calculates the Essential Frailty Toolset (EFT) score and predicts perioperative mortality risk for elderly cardiac surgery patients. Supports three procedure types: TAVR, SAVR, and CABG.

- **Live URL:** https://fragility.vercel.app
- **GitHub:** https://github.com/amornj/fragility
- **Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4

---

## Architecture

This is a minimal Next.js App Router project. All logic lives in a single client component.

```
src/
  app/
    layout.tsx      # Root layout, metadata (title/description/keywords), Geist fonts
    page.tsx        # Entire application — form inputs + scoring logic + results display
    globals.css     # Global Tailwind CSS imports
public/
  favicon.ico
```

There are no additional components, no API routes, no database, and no external state management libraries.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main client component — all EFT scoring logic, mortality lookup tables, and UI |
| `src/app/layout.tsx` | HTML shell, Next.js metadata, Geist font setup |
| `src/app/globals.css` | Tailwind base styles |
| `next.config.ts` | Next.js configuration |
| `postcss.config.mjs` | PostCSS / Tailwind v4 config |

---

## EFT Scoring Logic

The EFT score ranges from **0 to 5** (though the internal lookup table extends to 6 to handle edge cases). Each of the four domains contributes a point when abnormal:

### Scoring Domains (in `calculateScore` useMemo)

| Domain | Criterion | Points |
|--------|-----------|--------|
| Physical — Chair Stands (5 reps) | Unable to complete within 60 seconds | +2 |
| Physical — Chair Stands (5 reps) | Time 15–60 seconds | +1 |
| Cognition — MMSE-based | Cognitive impairment = Yes | +1 |
| Anemia — Hemoglobin | Male: Hgb < 13 g/dL | +1 |
| Anemia — Hemoglobin | Female: Hgb < 12 g/dL | +1 |
| Nutrition — Albumin | Serum albumin < 3.5 g/dL | +1 |

Note: Chair stands contributes 0, 1, or 2 points. All other domains contribute 0 or 1.

### Frailty Classification (`getFrailtyClass`)

| EFT Score | Class | Label |
|-----------|-------|-------|
| 0 | robust | Robust (Non-Frail) |
| 1–2 | prefrail | Pre-Frail |
| 3–5 | frail | Frail |

---

## Mortality Data (Lookup Tables)

### 1-Year Mortality by EFT Score (`MORTALITY_DATA`)

Source: FRAILTY-AVR (Afilalo et al., JACC 2017) for TAVR/SAVR; Solomon et al., JAHA 2021 for CABG (derived from Kaplan-Meier survival curves).

| Score | TAVR | SAVR | CABG |
|-------|------|------|------|
| 0 | 6% | 3% | 2% |
| 1 | 6% | 3% | 4% |
| 2 | 15% | 7% | 6% |
| 3 | 28% | 16% | 9% |
| 4 | 30% | 38% | 12% |
| 5 | 65% | 50% | 15% |
| 6 | 65% | 50% | 18% |

### 5-Year Mortality — CABG only (`CABG_5YR_MORTALITY`)

Displayed only when procedure = CABG. Source: Solomon et al., JAHA 2021.

| Score | 5-Yr Mortality |
|-------|---------------|
| 0 | 11% |
| 1 | 14% |
| 2 | 20% |
| 3 | 37% |
| 4 | 42% |
| 5 | 50% |
| 6 | 55% |

### CABG Secondary Outcomes by Frailty Class (`CABG_SECONDARY`)

Displayed only when procedure = CABG. Source: Solomon et al., JAHA 2021, Table 2.

| Outcome | Robust | Pre-Frail | Frail |
|---------|--------|-----------|-------|
| LOS ≥14 days | 5% | 10% | 26% |
| Discharge to facility | 2% | 4% | 11% |
| 30-day readmission | 8% | 12% | 24% |
| Major morbidity/mortality | 15% | 19% | 31% |

---

## Gender-Specific Anemia Thresholds

The hemoglobin cutoff for anemia is gender-dependent. Gender must be selected before the anemia domain can be scored. The UI displays the relevant threshold inline with the Hemoglobin label.

- Male: Hgb < **13** g/dL = anemia (+1 point)
- Female: Hgb < **12** g/dL = anemia (+1 point)

---

## UI Layout

The page uses a 3-column grid on large screens:
- **Left 2 columns:** Stepped form (Patient Info → Physical → Cognitive → Labs)
- **Right 1 column (sticky):** Live results panel showing EFT score, frailty class, 1-yr mortality for all three procedures, and CABG-specific 5-yr mortality and secondary outcomes when applicable

Results only display when all fields are complete (`isComplete` useMemo check).

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Lint
npm run lint

# Production build
npm run build

# Start production server
npm start
```

---

## Deployment

Deployed on Vercel. Push to the main branch triggers automatic deployment.

---

## References

1. Afilalo J, Lauck S, Kim DH, et al. Frailty in Older Adults Undergoing Aortic Valve Replacement: The FRAILTY-AVR Study. *J Am Coll Cardiol.* 2017;70(6):689–700.
2. Solomon J, et al. The Essential Frailty Toolset in Older Adults Undergoing Coronary Artery Bypass Surgery. *J Am Heart Assoc.* 2021;10:e020219.

---

## Disclaimer

This calculator is for educational purposes only. Clinical decisions should be made by qualified healthcare professionals.
