# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Language Support**: Added comprehensive language support for English (en), French (fr), Arabic (ar), and Tunisian Arabic (tn).
- **Language Selector**: Implemented a language selector in the Header and Home components to switch between supported languages.
- **Advice Modal**: Added a detailed advice modal that displays in-depth answers when an advice card is clicked.
  - Modal includes detailed content with bolded definitions.
  - Specific detailed answers added to all 4 language files.
- **Internationalization**: Integrated `ngx-translate` for seamless translation management across the application.

### Changed
- **Advice Component**: Refactored to support the new modal functionality and use `[innerHTML]` for rendering rich text content.
- **Video Support**: Enhanced `AdviceComponent` to support multiple YouTube videos per advice card. Added educational videos for "Types of Epilepsy" and "Is medication enough?".
