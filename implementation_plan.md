# Implementation Plan - Epilepsy Awareness App

The goal is to create a complete, responsive Angular application based on the provided HTML/CSS designs for an Epilepsy Awareness platform. The app will feature a Homepage, Advice & Resources page, and an interactive Quiz.

## User Review Required
> [!IMPORTANT]
> This plan involves creating a **new Angular project** named `epilepsy-app` inside your `epile` folder.
> I will use **Tailwind CSS** for styling, matching the design tokens found in your `code.html` files.

## Proposed Changes

### Project Initialization
- Create new Angular workspace: `epilepsy-app`
- Install and configure Tailwind CSS

### Architecture
- **Shared Components**:
    - `HeaderComponent`: Responsive navigation bar
    - `FooterComponent`: Global footer
- **Pages**:
    - `HomeComponent`: Hero, About, Experts, Cases
    - `AdviceComponent`: Resources grid, Featured article
    - `QuizComponent`: Interactive quiz interface

### Component Details

#### [NEW] [HomeComponent]
- Implements the landing page design.
- Sections: Hero (3D brain), About, What is Epilepsy, Experts, Research Cases, Newsletter.
- Assets: Will use the image URLs from your provided HTML.

#### [NEW] [AdviceComponent]
- Implements the "Conseils et Ressources" page.
- Features a grid of resource cards (First Aid, Daily Life, etc.) and a featured article section.

#### [NEW] [QuizComponent]
- Implements the "Epilepsy Awareness Quiz".
- Features: Progress bar, Question display, Multiple choice options, Fact box ("Le saviez-vous ?").
- *Note*: I will implement a basic mock quiz logic (questions array) to make it functional.

#### [MODIFY] [app.routes.ts]
- `/` -> HomeComponent
- `/advice` -> AdviceComponent
- `/quiz` -> QuizComponent

#### [MODIFY] [tailwind.config.js]
- Configure colors (Primary `#6d4c7d` etc.) and fonts (Montserrat, Inter, Outfit) to match your design.

## Verification Plan

### Automated Tests
- Run `ng test` to ensure components render without errors.

### Manual Verification
- **Run the app**: `npm start`
- **Homepage**: Verify layout, responsive menu, and image loading.
- **Advice Page**: Check grid responsiveness and navigation.
- **Quiz**: Run through the quiz, verify selection logic and navigation buttons.
- **Responsiveness**: Check mobile view (hamburger menu) and desktop view.
