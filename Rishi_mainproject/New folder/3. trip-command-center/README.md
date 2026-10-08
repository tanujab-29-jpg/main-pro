# TRIP COMMAND CENTER

> **Your entire journey, controlled from one place.**

A futuristic travel operating system frontend for a Chennai → Tokyo trip. This is a static, local-first prototype: no backend, booking provider, live map API, weather API, or real document storage is required.

## Team

- **Team name:** Add your team name here
- **Team members:** Add team member names here
- **Selected UI topic:** Trip Command Center / Travel Operations Dashboard

## 1. Topic research

### What the UI pattern is
A trip command center is a consolidated dashboard that turns fragmented travel information—transport, accommodation, itinerary, budget, packing, documents, weather, places, and memories—into one operational workspace. The pattern combines dashboard cards, a map/list relationship, chronological timelines, progress states, and quick actions.

### Where it is commonly used
Travel itinerary products and trip organizers commonly combine a day-by-day timeline with reservations, maps, budget views, saved places, packing lists, and travel documents. Project-management products also use similar dashboard patterns to centralize trip tasks and multiple views.

### Why it is relevant to modern web interfaces
Travel creates high information density: users need to understand **where**, **when**, **how much**, and **what is ready** without opening many disconnected pages. A command-center layout makes status visible at a glance while allowing deeper interaction when the user needs it.

### Patterns observed
Research of current travel-planning interfaces showed several recurring patterns:

- A **chronological itinerary** is a primary organizing structure.
- A **single map synced with itinerary/place selection** helps users connect geography with time.
- **Budget by category** is commonly shown with visual progress or charts.
- Travel dashboards use **status chips, confirmation states, and checklists** to reduce uncertainty.
- **Weather, packing, documents, and emergency contacts** are valuable supporting utilities around the core itinerary.
- Modern designs increasingly emphasize **editing, reordering, local/offline access, and clear verification states**, rather than presenting a static booking page.

### Sources consulted
- Horizons travel itinerary planner research and feature overview: https://github.com/tworoniak/travel-itinerary-app
- JourneyDoc travel itinerary pattern: https://www.journeydoc.com/
- Asana travel planner template: https://asana.com/templates/travel-planner
- TripIt interface breakdown: https://screensdesign.com/showcase/tripit-travel-planner
- VP0 travel itinerary UI research: https://vp0.com/blogs/travel-itinerary-planner-ai-ui-kit

These references were used to study patterns, not to copy visual designs or source code.

## 2. What this implementation does differently

Instead of making a conventional booking dashboard, **TripOS** treats the trip as a mission-control system:

- Futuristic dark “operations console” visual language.
- Neon cyan/violet status accents and subtle scan/grid effects.
- Readiness score combines trip preparation into one visual signal.
- Interactive route map is presented as a stylized geographic command surface rather than a static map screenshot.
- Map pins update the route-detail card.
- Itinerary day tabs update the timeline without reloading the page.
- Packing checkboxes update progress locally.
- Budget uses an animated circular category visualization.
- Place categories filter instantly.
- Photo uploads are rendered locally in the Memories section.
- Emergency center opens from multiple locations and keyboard shortcut `E`.
- Document, boarding-pass, hotel, expense, and event actions use interactive modal states.
- Responsive layout adapts the command center to tablet/mobile widths.

## 3. Implemented UIs

1. Main Command Dashboard
2. Interactive Journey Map
3. Visual Day-by-Day Itinerary
4. Flight Timeline
5. Accommodation / Hotel Card
6. Interactive Trip Budget
7. Packing Assistant
8. Travel Document Vault
9. Trip Weather
10. Places to Explore / Category Filters
11. Emergency Center
12. Trip Memories / Local Photo Uploads
13. Trip Readiness Score
14. Responsive mobile navigation

## Technologies used

- HTML5
- CSS3
- Vanilla JavaScript
- CSS animations / transitions
- SVG for the route visualization
- Browser File API for local photo previews
- Google Fonts: Space Grotesk + DM Mono

No framework or build step is required.

## Folder structure

```text
your-ui/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run

### Option A — open directly
Open `index.html` in a modern browser.

### Option B — VS Code Live Server
1. Open the `trip-command-center` folder in VS Code.
2. Install/use the Live Server extension.
3. Right-click `index.html` → **Open with Live Server**.

### Option C — local server
From the folder:

```bash
python3 -m http.server 5500
```

Then visit `http://localhost:5500`.

## Interaction checklist

- Click sidebar sections to smooth-scroll to each module.
- Click map pins to change the selected location.
- Click **Recenter** to animate the map route.
- Switch itinerary days 01–05.
- Add a custom itinerary event.
- Check/uncheck packing items to update the progress ring.
- Add a new packing item.
- Filter places by category.
- Open the expense modal.
- Open flight / hotel / document actions.
- Open the emergency center from the sidebar or lower dashboard.
- Upload image files to create local memory cards.
- Copy the trip summary with the top-right share button.
- Press `E` for the emergency center; `Esc` closes an open modal.

## Data note

All travel, budget, weather, booking, contact, and itinerary information is **mock/demo data** for a frontend assignment. It should not be treated as live booking, navigation, emergency, weather, or identity-document information.
