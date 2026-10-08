# Group Trip Workspace — TripSpace

## 1. What the UI pattern is

This project uses a **collaborative trip workspace/dashboard** pattern: one shared surface combines itinerary planning, group decisions, expenses, tasks, packing, chat, map context, and activity updates. The central idea is to make the current state of a group trip visible without forcing people to reconstruct it from chat messages and spreadsheets.

## 2. Where it is commonly used

This pattern is used in group travel planners, itinerary products, collaborative planning tools, event workspaces, and productivity dashboards. Recent group-travel products commonly emphasize shared itineraries, voting, expense splitting, packing/checklists, maps, and activity feeds in one trip workspace.

## 3. Why it is relevant to modern web interfaces

Group travel is a coordination problem involving people, timing, places, money, and decisions. A dashboard gives users a shared source of truth and makes unresolved work visible. Modern responsive dashboards also let the same information move between desktop command-center layouts and compact mobile card/navigation patterns.

## 4. Design and interaction patterns observed

Research focused on current group-trip products and collaborative travel planning discussions. Patterns observed included:

- Shared itinerary with day-by-day structure.
- Voting/polls for destinations, restaurants, dates, and activities.
- Automatic or guided expense splitting and settlement.
- Shared packing lists and assigned tasks.
- Member visibility through avatars and per-person status.
- Activity feeds showing recent changes.
- Map/timeline context for planned places.
- Clear distinction between proposed, pending, and confirmed work.
- Mobile-friendly access because the workspace is used while traveling.
- Low-friction participation and a single shared trip link/workspace as useful adoption patterns.

## 5. What this implementation does differently or adds

TripSpace turns those patterns into a **single premium command-center interface** with a strong dashboard hierarchy. Instead of treating itinerary, money, decisions, and tasks as disconnected pages, the dashboard surfaces their most important status together.

The implementation also adds functional front-end behavior:

- Persistent state through `localStorage`.
- Working navigation between workspace sections.
- Functional voting with live vote counts.
- Functional task completion tracking.
- Functional add-item modal for tasks and expenses.
- Budget and readiness progress calculations.
- Responsive mobile bottom navigation.
- Demo reset control for repeatable presentation/testing.

The app intentionally uses original visual styling and sample content rather than reproducing another product's interface.

## Research references

- Prism — collaborative trip planning and shared itinerary/expenses/voting: https://www.prismtrips.com/collaborative-travel-planner
- TripOmeter — group voting, shared itinerary, tasks, live trip coordination and expense splitting: https://tripometer.in/about
- Vacationist — voting, expense splitting, packing lists and group workspace: https://vacationist.app/
- Waykin — trip dashboard, day preview, traveler avatars, activity feed and group voting: https://waykin.io/
- Agoroam — research discussion of shared editing, voting, expense splitting and booking context: https://agoroam.com/guides/best-group-trip-planning-apps

## Files

```text
your-ui/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

Open `index.html` in a modern browser. No build step or external dependency is required.
