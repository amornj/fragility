# Essential Frailty Toolset Calculator

A modern web application for evaluating 1-year mortality risk in elderly patients undergoing aortic valve replacement (TAVR/SAVR) procedures. Based on the Essential Frailty Toolset developed by Harvard Medical School.

## Features

- **Comprehensive Risk Assessment**: Evaluates 4 key frailty domains
  - Physical performance (chair stands test)
  - Cognitive function
  - Anemia status
  - Nutritional status (albumin)

- **Real-time Results**: Instant calculation of frailty score and mortality risk
- **Dual Procedure Comparison**: Shows mortality for both TAVR and SAVR procedures
- **Risk Factor Breakdown**: Clear visualization of contributing risk factors
- **Print-friendly**: Easy to print results for patient records
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Scoring

The calculator assigns 1 point for each abnormal finding:

| Risk Factor | Threshold |
|-------------|-----------|
| Chair Stands | >20 seconds or unable to complete |
| Cognitive Impairment | Yes |
| Anemia | Male <13 g/dL, Female <12 g/dL |
| Hypoalbuminemia | <3.5 g/dL |

**Total Score**: 0-5 (higher = higher mortality risk)

## Mortality Reference

| Score | TAVR | SAVR |
|-------|------|------|
| 0-1   | 6%   | 3%   |
| 2     | 15%  | 7%   |
| 3     | 28%  | 16%  |
| 4     | 30%  | 38%  |
| 5     | 65%  | 50%  |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

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

## Reference

Afilalo J, Lauck S, Kim DH, et al. Frailty in Older Adults Undergoing Aortic Valve Replacement: The FRAILTY-AVR Study. J Am Coll Cardiol. 2017;70(6):689-700. doi:10.1016/j.jacc.2017.06.024

## License

This project is for educational purposes. The original calculator is maintained by Harvard Medical School.

---

**Disclaimer**: This calculator is for educational purposes only. Clinical decisions should be made by qualified healthcare professionals.
