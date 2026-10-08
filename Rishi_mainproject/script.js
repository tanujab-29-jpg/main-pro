const projects=[
['01','Assignment Tracker UI','Track assignments, calendar, analytics and focus sessions.','New folder/1. assignment-tracker-ui/index.html'],
['02','Education Multiverse','Explore career paths and interactive future-learning scenarios.','New folder/2. education-multiverse/index.html'],
['03','Trip Command Center','Manage itinerary, documents, budget, places and trip utilities.','New folder/3. trip-command-center/index.html'],
['04','TripSpace Workspace','Collaborative group-trip dashboard with votes, tasks, expenses, packing, chat and places.','New folder/4. your-ui/index.html']
];
document.querySelector('#projects').innerHTML=projects.map(([n,t,d,u])=>`<article class="card"><div><span class="num">PROJECT ${n}</span><h2>${t}</h2><p>${d}</p></div><a href="${u}">Open project →</a></article>`).join('');
