# Change Log

All changes made to the project will be documented here.

## 2026-02-11 - Initial Setup
- Created `agent.md` and `change-log.md`.

## 2026-02-11 - Angular Project Initialization
- Initialized Angular application `epilepsy-app`.
- Installed and configured Tailwind CSS.
- Generated components: Home, Advice, Quiz, Header, Footer.
- Implemented routing and layout.
- Added fonts and icons to `index.html`.
- Implemented UI for all components matching the provided design.

## 2026-02-11 - Fix Language Selector Dropdown
- Fixed language selector dropdown menu hiding on hover by replacing `mt-2` with `top-full pt-1` in header component.
- Eliminates gap between button and dropdown that was breaking hover state.

## 2026-02-11 - Login & Signup Implementation + Internationalization
- Implemented `LoginComponent` and `SignupComponent` with form validation.
- Added `/login` and `/signup` routes.
- Updated Header with "Sign Up" button and mobile menu link.
- Integrated `ngx-translate` for multi-language support (FR, EN, AR, TN).
- Internationalized Login and Signup pages.
- Internationalized Advice page (Titles, Descriptions, Cards, Articles).
- Updated translation files for all supported languages.
- Removed "Learn More" links from Advice cards as per user request.

## 2026-02-11 - Advice Page Enhancements
- Updated Advice page content with 6 specific questions about epilepsy.
- Added detailed answers for all 6 questions in AR, TN, FR, EN.
- Implemented modal popup for displaying detailed answers on card click.
- Fixed template error (unexpected closing tag) in `advice.component.html`.
- Implemented video support in Advice modal.
- Added `getSafeUrl` method and `DomSanitizer` to `AdviceComponent` to fix build error.
- Embedded YouTube video in "What is Epilepsy?" modal.
#


- **Advice Modal**: Added a detailed advice modal that displays in-depth answers when an advice card is clicked.
  - Modal includes detailed content with bolded definitions.
  - Specific detailed answers added to all 4 language files.
- **Internationalization**: Integrated `ngx-translate` for seamless translation management across the application.

## 2026-02-11 - Video Support in Advice Modal
- **Multiple Videos**: Refactored `AdviceComponent` to support multiple YouTube videos per advice card.
- **Content Updates**:
  - Added educational video for "Is medication enough?" (Le médicament suffit-il à lui seul ?).
  - Added two educational videos for "Types of Epilepsy" (Quels sont les types de crises d'épilepsie ?).
- **Technical**: Updated `AdviceComponent` logic to handle `videoIds` array and render multiple iframes in the modal.
# Changelog

## [Unreleased]

### Added
- **Child in Classroom Image**: Added `assets/fdaca107-47f4-4bad-a50b-4b15d564be3b.jpg` to the home page, replacing the "Guide de premiers secours" section.
- **Statistical Dashboard**: Replaced the "Research Cases" section with a "Statistical Dashboard for Epileptic Patients" containing:
    - Seizure-free days counter.
    - Medication adherence tracker.
    - Sleep quality monitor.
    - Seizure frequency chart (expanded to full 12 months).

### Changed
- **Hero Image**: Updated the hero section image to use `assets/im1.jpg`.
- **Expert Section (Pr. Chahinaz Triki)**:
    - Updated name to uppercase "PR. CHAHINAZ TRIKI" for consistency.
    - Updated title to "Ambassadrice pour l'Epilepsie dans IBE".
- **Home Page Layout**: improved layout spacing and removed "Guide de premiers secours" and one expert quote.
