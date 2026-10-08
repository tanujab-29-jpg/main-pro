const defaults={
  view:'Dashboard', budget:75000,
  members:[['RU','Rushandra'],['RA','Rahul'],['AR','Arjun'],['PR','Priya'],['NE','Neha'],['KI','Kiran']],
  votes:{Beach:5,Temple:4,'Theme Park':3},
  decisionVotes:{'Sushi House':2,'Ramen Lab':3,'Indian Kitchen':1},
  tasks:[['Book flights','Rahul',true],['Hotel','Priya',true],['Restaurant','Rushandra',false],['Tickets','Arjun',false],['Transport','Neha',false]],
  expenses:[['Flights',12500,'Rahul'],['Hotel',8900,'Priya'],['Tickets',15200,'Arjun'],['Food',9800,'Rushandra'],['Transport',7000,'Neha'],['Shopping',5000,'Kiran']],
  packing:[['First Aid','Priya',true],['Camera','Arjun',true],['Power Bank','Rushandra',false],['Speaker','Rahul',false]],
  itinerary:[['Oct 12','Arrival + Shibuya'],['Oct 13','TeamLab + Ginza'],['Oct 14','Temple + Harajuku'],['Oct 15','Theme park'],['Oct 16','Free day']],
  chat:[['Rahul','Should we visit TeamLab on Tuesday?'],['Priya','Yes 👍'],['Arjun',"I'll book tickets."]],
  places:['Shibuya Crossing','TeamLab Planets','Senso-ji Temple','Tokyo Skytree'],
  activities:[['10:00','Shibuya Crossing'],['13:00','Lunch'],['16:00','TeamLab'],['20:00','Dinner']]
};
const state=JSON.parse(JSON.stringify(defaults));
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
function load(){try{const saved=JSON.parse(localStorage.getItem('tripWorkspaceV2')||'null');if(saved)Object.assign(state,saved)}catch(e){console.warn('Saved data could not be loaded',e)}}
function save(){localStorage.setItem('tripWorkspaceV2',JSON.stringify(state))}
function spent(){return state.expenses.reduce((sum,e)=>sum+Number(e[1]||0),0)}
function render(){
  const totalSpent=spent(), pct=Math.min(100,Math.round(totalSpent/state.budget*100));
  const ready=state.tasks.length?Math.round(state.tasks.filter(x=>x[2]).length/state.tasks.length*100):0;
  $('#app').innerHTML=`<div class="shell"><aside class="sidebar"><div class="brand">Trip<span>Space</span></div><nav class="nav">${['Dashboard','Itinerary','Expenses','Decisions','Packing','Tasks','Chat','Map'].map(x=>`<button class="${state.view===x?'active':''}" onclick="setView('${x}')">${x}</button>`).join('')}</nav><div class="trip-mini"><div class="eyebrow">Current trip</div><b>Tokyo with Friends</b><div class="muted">6 members · Oct 12–18</div></div></aside><main class="main"><header class="top"><div><div class="eyebrow">Group Trip Workspace</div><h1 class="title">Tokyo with Friends</h1><div class="muted">6 members · shared planning, decisions & expenses</div></div><div class="actions"><button class="btn" onclick="resetDemo()">Reset demo</button><button class="btn primary" onclick="openModal()">+ Add item</button></div></header>${viewContent(pct,ready,totalSpent)}</main><nav class="mobile-nav">${['Dashboard','Itinerary','Expenses','Tasks','Decisions'].map(x=>`<button class="${state.view===x?'active':''}" onclick="setView('${x}')">${x}</button>`).join('')}</nav></div>${modalHtml()}`;
}
function modalHtml(){return `<div class="modal" id="modal" onclick="if(event.target===this)closeModal()"><div class="dialog"><h2>Add trip item</h2><label>Item name</label><input id="itemName" class="field" placeholder="e.g. TeamLab tickets"/><label>Type</label><select id="itemType" class="field" onchange="updateModalFields()"><option value="task">Task</option><option value="expense">Expense</option><option value="activity">Activity</option><option value="packing">Packing item</option></select><div id="extraFields"></div><button class="btn" onclick="closeModal()">Cancel</button> <button class="btn primary" onclick="addItem()">Add</button></div></div>`}
function viewContent(pct,ready,totalSpent){
 if(state.view!=='Dashboard')return `<section class="grid"><div class="card span-12"><div class="eyebrow">${state.view}</div><h2>${state.view}</h2>${section(state.view)}</div></section>`;
 return `<section class="grid"><div class="card span-3"><div class="muted">Group budget</div><div class="metric">${money(state.budget)}</div><div class="progress"><i style="width:${pct}%"></i></div><div class="muted">${money(totalSpent)} spent · ${money(Math.max(0,state.budget-totalSpent))} left</div></div><div class="card span-3"><div class="muted">Trip readiness</div><div class="metric">${ready}%</div><div class="progress"><i style="width:${ready}%"></i></div><div class="muted">Tasks and bookings tracked</div></div><div class="card span-3"><div class="muted">Pending decisions</div><div class="metric">${Object.keys(state.decisionVotes).length}</div><div class="muted">Vote with the group</div></div><div class="card span-3"><div class="muted">Activities</div><div class="metric">${state.activities.length}</div><div class="muted">Scheduled items</div></div><div class="card span-7"><div class="eyebrow">Today</div><h2>Wednesday · Shibuya</h2><div class="list">${state.activities.map(x=>`<div class="row"><b>${esc(x[0])}</b><span>${esc(x[1])}</span><span class="tag">Planned</span></div>`).join('')}</div></div><div class="card span-5"><div class="eyebrow">Group members</div><div class="list">${state.members.map(m=>`<div class="row"><div class="person"><span class="avatar">${esc(m[0])}</span><b>${esc(m[1])}</b></div><span class="muted">${money(state.expenses.filter(e=>e[2]===m[1]).reduce((s,e)=>s+Number(e[1]),0))}</span></div>`).join('')}</div></div><div class="card span-5"><div class="eyebrow">Where should we go?</div><h2>Group vote</h2>${Object.entries(state.votes).map(([k,v])=>`<div class="vote"><div class="row"><span>${esc(k)}</span><b>${v} votes</b></div><div class="bar"><i style="width:${Math.min(100,v/6*100)}%"></i></div><button class="btn" onclick="vote('${esc(k)}')">Vote</button></div>`).join('')}</div><div class="card span-7"><div class="eyebrow">Recent activity</div><div class="list">${activityFeed()}</div></div></section>`;
}
function activityFeed(){const items=[`${state.tasks.filter(t=>t[2]).length} tasks completed`,`${state.expenses.length} expenses tracked`,`${state.chat.length} chat messages`,`Packing ${state.packing.filter(p=>p[2]).length}/${state.packing.length} ready`];return items.map(x=>`<div class="row"><span>${esc(x)}</span><span class="tag">Live</span></div>`).join('')}
function section(v){
 if(v==='Expenses')return `<div class="row"><b>Total spent</b><b>${money(spent())}</b></div><div class="list">${state.expenses.map((e,i)=>`<div class="row"><span><b>${esc(e[0])}</b><br><small class="muted">Paid by ${esc(e[2]||'Group')}</small></span><span>${money(e[1])} <button class="btn" onclick="removeExpense(${i})">Remove</button></span></div>`).join('')}</div>`;
 if(v==='Tasks')return `<div class="list">${state.tasks.map((t,i)=>`<div class="row"><label><input type="checkbox" ${t[2]?'checked':''} onchange="toggleTask(${i})"> ${esc(t[0])}</label><span><span class="tag">${esc(t[1])}</span> <button class="btn" onclick="removeTask(${i})">×</button></span></div>`).join('')}</div>`;
 if(v==='Decisions')return `<h3>Dinner tonight</h3><div class="list">${Object.entries(state.decisionVotes).map(([x,n])=>`<div class="row"><span>${esc(x)}</span><span><b>${n} votes</b> <button class="btn" onclick="decisionVote('${esc(x)}')">Vote</button></span></div>`).join('')}</div>`;
 if(v==='Itinerary')return `<div class="list">${state.itinerary.map((x,i)=>`<div class="row"><span><b>${esc(x[0])}</b> · ${esc(x[1])}</span><button class="btn" onclick="removeItinerary(${i})">Remove</button></div>`).join('')}</div>`;
 if(v==='Packing')return `<div class="list">${state.packing.map((x,i)=>`<div class="row"><label><input type="checkbox" ${x[2]?'checked':''} onchange="togglePacking(${i})"> ${esc(x[0])}</label><span><span class="tag">${esc(x[1])}</span> <button class="btn" onclick="removePacking(${i})">×</button></span></div>`).join('')}</div>`;
 if(v==='Chat')return `<div class="list" id="chatList">${state.chat.map(x=>`<div class="row"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}<div class="row"><input id="chatInput" class="field" style="margin:0" placeholder="Type message..." onkeydown="if(event.key==='Enter')sendMessage()"><button class="btn primary" onclick="sendMessage()">Send</button></div></div>`;
 if(v==='Map')return `<div class="empty"><h3>Shared places</h3><div class="list">${state.places.map((p,i)=>`<div class="row"><span>📍 ${esc(p)}</span><button class="btn" onclick="removePlace(${i})">Remove</button></div>`).join('')}</div><div class="row" style="margin-top:12px"><input id="placeInput" class="field" style="margin:0" placeholder="Add a place"><button class="btn primary" onclick="addPlace()">Add place</button></div></div>`;
 return `<div class="empty">Workspace view ready.</div>`;
}
function setView(v){state.view=v;save();render()}
function vote(k){state.votes[k]=(state.votes[k]||0)+1;save();render()}
function decisionVote(k){state.decisionVotes[k]=(state.decisionVotes[k]||0)+1;save();render()}
function toggleTask(i){state.tasks[i][2]=!state.tasks[i][2];save();render()}
function togglePacking(i){state.packing[i][2]=!state.packing[i][2];save();render()}
function removeTask(i){state.tasks.splice(i,1);save();render()}
function removeExpense(i){state.expenses.splice(i,1);save();render()}
function removeItinerary(i){state.itinerary.splice(i,1);save();render()}
function removePacking(i){state.packing.splice(i,1);save();render()}
function removePlace(i){state.places.splice(i,1);save();render()}
function sendMessage(){const el=$('#chatInput');const msg=el?.value.trim();if(!msg)return;state.chat.push(['You',msg]);save();render()}
function addPlace(){const el=$('#placeInput');const name=el?.value.trim();if(!name)return;state.places.push(name);save();render()}
function openModal(){const m=$('#modal');m.classList.add('open');updateModalFields();setTimeout(()=>$('#itemName')?.focus(),0)}
function closeModal(){$('#modal')?.classList.remove('open')}
function updateModalFields(){const type=$('#itemType')?.value;const box=$('#extraFields');if(!box)return;if(type==='expense')box.innerHTML=`<label>Amount</label><input id="itemAmount" type="number" min="0" class="field" placeholder="e.g. 2500"><label>Paid by</label><select id="itemOwner" class="field">${state.members.map(m=>`<option>${esc(m[1])}</option>`).join('')}</select>`;else if(type==='task'||type==='packing')box.innerHTML=`<label>Assigned to</label><select id="itemOwner" class="field">${state.members.map(m=>`<option>${esc(m[1])}</option>`).join('')}</select>`;else box.innerHTML=`<label>Time / Date</label><input id="itemWhen" class="field" placeholder="e.g. 18:00 or Oct 17">`}
function addItem(){const n=$('#itemName')?.value.trim(),type=$('#itemType')?.value;if(!n)return;if(type==='task')state.tasks.push([n,$('#itemOwner')?.value||'You',false]);else if(type==='expense')state.expenses.push([n,Number($('#itemAmount')?.value||0),$('#itemOwner')?.value||'You']);else if(type==='packing')state.packing.push([n,$('#itemOwner')?.value||'You',false]);else {const when=$('#itemWhen')?.value.trim()||'Any time';state.activities.push([when,n]);state.itinerary.push([when,n])}save();closeModal();render()}
function resetDemo(){localStorage.removeItem('tripWorkspaceV2');Object.keys(state).forEach(k=>delete state[k]);Object.assign(state,JSON.parse(JSON.stringify(defaults)));render()}
load();render();
