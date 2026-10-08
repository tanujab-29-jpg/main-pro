# Academia — Assignment Tracker / Student Academic Command Center

**Team member:** S. Rishitha Sri  
**Topic:** Assignment Tracker / Student Academic Command Center  
**Technology:** HTML, CSS, JavaScript, LocalStorage

## UI research
An academic command center combines dashboard cards, task management, calendar scheduling, timeline/deadline visualization, analytics and focused work into one student workflow. The pattern is useful when a user has many deadlines across subjects and needs both a quick status overview and deeper planning tools.

### Observed design / interaction patterns
- Dark, high-contrast productivity interface.
- Glass / layered panels to separate information without heavy borders.
- Priority colors and compact status chips for rapid scanning.
- Progressive disclosure through a slide-out assignment details drawer.
- Search + smart filters for finding tasks quickly.
- Calendar and timeline views for deadline awareness.
- Focus timer for turning planning into action.
- Responsive layout so the dashboard remains usable on smaller screens.

### What this implementation adds
This version is a functional single-page application rather than a static mockup. Assignment data is persisted in browser LocalStorage, so changes survive refreshes.

## Implemented features
1. Dashboard with Due Soon, Overdue, Active and Progress statistics.
2. Assignment CRUD: create, edit, view, complete/reopen and delete.
3. Assignment fields: subject, title, description, teacher, priority, due date/time, progress, difficulty, estimated time, attachment, tags and type.
4. Calendar Month / Week / Day / Semester views.
5. Clickable calendar events that open assignment details.
6. Deadline Radar sorted by upcoming deadlines.
7. Workload Intelligence using estimated minutes.
8. Focus Mode with real countdown, pause/resume, 5-minute break and finish-task action.
9. Priority system: Critical, High, Medium, Low.
10. Progress analytics and subject completion bars.
11. Smart search including phrases such as `DAA`, `due tomorrow`, `overdue`, `high priority`.
12. Smart filters: All, Due Today, Due This Week, Overdue, Completed, High Priority, Projects, Exams, Labs.
13. Slide-out Assignment Details.
14. Notification panel for overdue and upcoming work.
15. Command palette with Ctrl/Cmd + K.
16. Responsive mobile navigation and layout.
17. LocalStorage persistence with no framework or unnecessary dependency.

## Folder structure
```text
your-ui/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run instructions
1. Download/unzip the project.
2. Open `index.html` in a modern browser.
3. No build step or server is required.
4. Add/edit assignments and refresh the page to verify LocalStorage persistence.

## Suggested GitHub workflow
```text
Fork → Clone → Branch → Develop → Commit → Push → Pull Request → Review → Merge
```

Example branches:
- `feature/dashboard`
- `feature/calendar`
- `feature/focus-mode`
- `feature/analytics`

Example commit messages:
- `feat: add assignment CRUD`
- `feat: implement calendar views`
- `feat: add functional focus timer`
- `feat: persist assignments in localStorage`
- `docs: update research and run instructions`

## Demo checklist
During the final demo, show:
- Adding and editing an assignment.
- Search and smart filters.
- Calendar navigation and event details.
- Deadline radar and workload calculations.
- Analytics changing with assignment completion.
- Focus timer pause/resume/break/finish.
- Notification panel.
- Refreshing the browser to prove persistence.
- GitHub branches, commits, pull requests and review history.
