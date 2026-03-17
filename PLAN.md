# Essential Frailty Toolset - Project Plan

## 1. Project Overview

**Project Name:** Essential Frailty Toolset (EFT) Calculator  
**Type:** Medical Web Application  
**Purpose:** Evaluate 1-year mortality risk for elderly patients undergoing aortic valve replacement (TAVR/SAVR)  
**Source:** Harvard Medical School - https://efrailty.hsl.harvard.edu/ToolEssentialFrailtyToolset.html

## 2. Input Parameters

| Field | Type | Range/Options | Risk Factor |
|-------|------|---------------|-------------|
| Gender | Radio | Male, Female | Reference |
| Procedure Type | Radio | TAVR, SAVR | Reference |
| Chair Stands | Number/Checkbox | 1-60 seconds OR "Unable" | +1 if >20s or unable |
| Cognitive Impairment | Radio | Yes, No | +1 if Yes |
| Anemia | Number | Hemoglobin g/dL | +1 if <13 g/dL (men) or <12 g/dL (women) |
| Hypoalbuminemia | Number | Albumin g/dL | +1 if <3.5 g/dL |

## 3. Scoring Logic

- Score = Sum of risk factors (0-5)
- Risk factors are counted as 1 point each when abnormal

### Scoring Criteria:
1. **Chair stands**: +1 if >20 seconds OR unable to complete
2. **Cognitive Impairment**: +1 if Yes
3. **Anemia**: +1 if hemoglobin <13 g/dL (male) or <12 g/dL (female)
4. **Hypoalbuminemia**: +1 if albumin <3.5 g/dL

## 4. Mortality Output

| Score | TAVR Mortality | SAVR Mortality |
|-------|-----------------|-----------------|
| 0-1   | 6%              | 3%              |
| 2     | 15%             | 7%              |
| 3     | 28%             | 16%             |
| 4     | 30%             | 38%             |
| 5     | 65%             | 50%             |

## 5. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **UI:** Custom components with medical-grade design

## 6. UI/UX Design

### Design Principles:
- Clean, professional medical aesthetic
- High contrast for readability
- Clear form layout with logical grouping
- Instant results calculation
- Print-friendly results

### Color Scheme:
- Primary: Deep blue (#1e40af) - Trust, medical
- Accent: Teal (#0d9488) - Health, vitality
- Warning: Amber (#f59e0b) - Risk indicators
- Danger: Red (#dc2626) - High risk
- Success: Green (#16a34a) - Low risk
- Background: Light gray (#f8fafc)

### Layout:
- Single page application
- Card-based form sections
- Sticky results panel on desktop
- Responsive design (mobile-first)

## 7. Development Steps

1. Initialize Next.js project with TypeScript
2. Create form components for each input
3. Implement scoring logic
4. Build results display
5. Add styling and animations
6. Test against original website
7. Deploy to Vercel

## 8. Testing Criteria

- [ ] All 5 inputs work correctly
- [ ] Score calculation matches original
- [ ] Mortality tables display correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Results match Harvard website for test cases

## 9. Acceptance Criteria

- Calculator produces identical results to original website
- UI is modern, accessible, and professional
- Works on all modern browsers
- Loads quickly (<3s)
- Mobile-friendly
