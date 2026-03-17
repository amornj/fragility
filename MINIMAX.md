# MINIMAX - Project Memory

## Essential Frailty Toolset Calculator

### Project Overview
- **Purpose**: Medical calculator to evaluate 1-year mortality risk for elderly patients undergoing aortic valve replacement (TAVR/SAVR)
- **Source**: Harvard Medical School - https://efrailty.hsl.harvard.edu/ToolEssentialFrailtyToolset.html
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Date Created**: March 17, 2026

### Key Features Implemented
1. **Patient Information Input**
   - Gender selection (Male/Female)
   - Procedure type selection (TAVR/SAVR)

2. **Physical Performance Test**
   - Chair stands time measurement (5 repetitions)
   - "Unable to complete" checkbox for patients who cannot complete within 60 seconds
   - Risk warning when time >20 seconds

3. **Cognitive Assessment**
   - Yes/No cognitive impairment selection

4. **Laboratory Values**
   - Hemoglobin level input with gender-specific anemia thresholds (male <13, female <12 g/dL)
   - Serum albumin level input with hypoalbuminemia threshold (<3.5 g/dL)

5. **Results Display**
   - Frailty score (0-5)
   - 1-year mortality for both TAVR and SAVR
   - Risk level classification (Low/Moderate/High/Very High)
   - Real-time risk factor breakdown

### Scoring Logic
- Chair stands >20 seconds or unable: +1 point
- Cognitive impairment: +1 point  
- Anemia (hemoglobin <13 male, <12 female): +1 point
- Hypoalbuminemia (<3.5 g/dL): +1 point

### Mortality Reference Table
| Score | TAVR | SAVR |
|-------|------|------|
| 0-1   | 6%   | 3%   |
| 2     | 15%  | 7%   |
| 3     | 28%  | 16%  |
| 4     | 30%  | 38%  |
| 5     | 65%  | 50%  |

### Design Decisions
- Clean, professional medical aesthetic
- Blue primary color scheme for trust
- Card-based layout with sticky results panel
- Responsive design (mobile-first)
- Print-friendly output

### GitHub & Deployment
- Repository: https://github.com/amornj/fragility.git
- Deployed on: Vercel

### Reference
Afilalo J, Lauck S, Kim DH, et al. Frailty in Older Adults Undergoing Aortic Valve Replacement: The FRAILTY-AVR Study. J Am Coll Cardiol. 2017;70(6):689-700.
