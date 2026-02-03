# Climate Dashboard

A simple and clean React application that displays current weather conditions and a 5-day forecast based on a U.S. ZIP code.

The goal of this project was to focus on clear UI, predictable data flow, and good user experience when handling loading and error states.

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Steps to run the project

1. Clone the repository
   ```bash
   git clone <repository-url>

2. Install dependencies
    npm install

3. Start the development server
    npm run dev

4. Open the app in your browser
    Vite will output a local URL (usually http://localhost:5173).

Setup Notes

No API keys are required to run this project.

The app uses public APIs and works out of the box after installing dependencies.

Styling is done with SCSS and imported globally.

APIs Used

Zippopotam.us
Used to convert a U.S. ZIP code into city, state, latitude, and longitude.

Open-Meteo
Used to fetch current weather data and a daily forecast based on latitude and longitude.

Assumptions & Technical Decisions

ZIP codes

The app assumes valid U.S. 5-digit ZIP codes only.

Basic client-side validation is applied before making requests.

Temperature units

All temperatures are stored internally in Celsius.

Fahrenheit conversion happens only at render time to keep calculations consistent.

Weather data

Only the first 5 days of the daily forecast are displayed, even if the API returns more.

Weather condition codes from Open-Meteo are mapped to icons using a simplified grouping approach.

State management

React useState is used for simplicity since the app scope is small.

The UI explicitly handles idle, loading, success, and error states.

Tooling

Vite was chosen for its fast development experience and minimal configuration.

TypeScript is used to improve reliability and reduce runtime errors.

Possible Improvements

Add autocomplete or suggestions for ZIP codes

Cache results for previously searched ZIP codes

Improve accessibility with keyboard navigation and ARIA enhancements

Add unit tests for formatting and utility functions

Enhance responsive behavior for very small screens
