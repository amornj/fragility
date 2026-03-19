# Essential Frailty Toolset (EFT) Calculator

A modern, standalone web calculator for assessing frailty and predicting perioperative mortality risk in elderly patients undergoing cardiac surgery. Supports TAVR, SAVR, and CABG procedure types.

**Live demo:** https://fragility.vercel.app

---

## Features

- **EFT Score (0–5)** across four validated domains: physical performance, cognition, anemia, and nutrition
- **Three procedure types:** TAVR, SAVR, and CABG
- **Frailty classification:** Robust (0), Pre-Frail (1–2), Frail (3–5)
- **1-year mortality** for all three procedures, displayed side-by-side
- **5-year mortality** for CABG (Solomon et al., JAHA 2021)
- **CABG secondary outcomes:** LOS ≥14 days, discharge to facility, 30-day readmission, major morbidity
- **Gender-specific anemia thresholds:** Male Hgb < 13 g/dL, Female Hgb < 12 g/dL
- Real-time calculation — results update instantly as you enter data
- Sticky results panel with risk factor breakdown
- Print-friendly layout
- Responsive design — desktop, tablet, and mobile

---

## Scoring

The EFT assigns 1 point per abnormal finding (chair stands may contribute up to 2 points):

| Domain | Criterion | Points |
|--------|-----------|--------|
| Physical — 5 Chair Stands | Unable to complete within 60 s | +2 |
| Physical — 5 Chair Stands | Time 15–60 s | +1 |
| Cognition (MMSE) | Cognitive impairment present | +1 |
| Anemia | Hgb < 13 g/dL (male) or < 12 g/dL (female) | +1 |
| Nutrition | Serum albumin < 3.5 g/dL | +1 |

**Total score: 0–5** (higher score = greater frailty and mortality risk)

---

## Mortality Reference (1-Year)

| EFT Score | TAVR | SAVR | CABG |
|-----------|------|------|------|
| 0 | 6% | 3% | 2% |
| 1 | 6% | 3% | 4% |
| 2 | 15% | 7% | 6% |
| 3 | 28% | 16% | 9% |
| 4 | 30% | 38% | 12% |
| 5 | 65% | 50% | 15% |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Runtime:** React 19
- **Deployment:** Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## References

1. **TAVR/SAVR:** Afilalo J, Lauck S, Kim DH, et al. Frailty in Older Adults Undergoing Aortic Valve Replacement: The FRAILTY-AVR Study. *J Am Coll Cardiol.* 2017;70(6):689–700. doi:10.1016/j.jacc.2017.06.024

2. **CABG:** Solomon J, et al. The Essential Frailty Toolset in Older Adults Undergoing Coronary Artery Bypass Surgery. *J Am Heart Assoc.* 2021;10:e020219. doi:10.1161/JAHA.120.020219

---

## Disclaimer

This calculator is for educational purposes only. Clinical decisions should be made by qualified healthcare professionals. The EFT was developed at McGill University / Jewish General Hospital.
