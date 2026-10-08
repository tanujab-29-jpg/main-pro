const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const toast=(msg)=>{const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)};
const modal=(title,body)=>{const b=$('#modalBackdrop'),m=$('#modal');m.innerHTML=`<div class="modal-head"><h3>${title}</h3><button class="modal-close" onclick="document.querySelector('#modalBackdrop').classList.remove('open')">✕</button></div><div class="modal-body">${body}</div>`;b.classList.add('open')};
$('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')e.currentTarget.classList.remove('open')});

// Live clock
const clock=()=>$('#clock').textContent=new Intl.DateTimeFormat('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:'Asia/Tokyo'}).format(new Date()); clock(); setInterval(clock,1000);

// Sidebar navigation
$$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{const target=$(`#${btn.dataset.target}`); if(target) target.scrollIntoView({behavior:'smooth',block:'start'}); $$('.nav-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#sidebar').classList.remove('open')}));
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));

// Map interaction
const cityData={CHENNAI:['CHENNAI','ORIGIN · DEPARTURE','₹0'],SINGAPORE:['SINGAPORE','DAY 01 · LAYOVER','₹2,100'],TOKYO:['TOKYO','DAY 03 · 3 ACTIVITIES','₹4,500']};
$$('.map-pin').forEach(pin=>pin.addEventListener('click',()=>{ $$('.map-pin').forEach(p=>p.classList.remove('selected'));pin.classList.add('selected');const d=cityData[pin.dataset.city];$('#mapDetail').innerHTML=`<div><b>${d[0]}</b><span>${d[1]}</span></div><strong>${d[2]} <small>EST.</small></strong><p>${pin.dataset.city==='TOKYO'?'Shibuya · TeamLab · Tokyo Tower':pin.dataset.city==='SINGAPORE'?'Airport lounge · Jewel · Layover':'Home base · Airport transfer'}</p>`;toast(`${d[0]} route node selected`)}));
$('#routeBtn').addEventListener('click',()=>{const m=$('.route-svg');m.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:600});toast('Route recentered on Tokyo')});

// Packing state
function updatePacking(){const checks=$$('#checklist input');const done=checks.filter(x=>x.checked).length;const pct=Math.round(done/checks.length*100);$('#packPercent').textContent=pct+'%';const ring=$('.progress-circle');ring.style.background=`conic-gradient(var(--cyan) 0 ${pct}%,#152538 ${pct}%)`;$('#readinessValue').textContent=Math.round(72+pct*.234)+'%';$$('#checklist label').forEach(l=>l.querySelector('em').textContent=l.querySelector('input').checked?'READY':'ADD');toast('Packing progress saved locally')}
$$('#checklist input').forEach(x=>x.addEventListener('change',updatePacking));
$('#packingBtn').addEventListener('click',()=>{const label=document.createElement('label');label.innerHTML='<input type="checkbox"><span>New packing item</span><em>ADD</em>';$('#checklist').appendChild(label);label.querySelector('input').addEventListener('change',updatePacking);toast('New item added')});

// Itinerary
const days={1:[['09:00','✈','Arrival at Narita','Terminal 1 · transfer to hotel'],['11:00','⌂','Hotel check-in','Shinjuku · Hoshino Urban Tokyo'],['13:00','🍜','Lunch at Omoide Yokocho','Local ramen · ¥1,200'],['15:00','⌖','Shibuya crossing','Explore · photo stop'],['19:00','◒','Tokyo Tower','Night city views']],2:[['08:30','☼','Meiji Shrine','Early walk · quiet hours'],['11:00','⌖','Harajuku','Takeshita Street · shopping'],['14:00','🍜','Omotesando lunch','Cafe district'],['18:30','◒','Shibuya Sky','Sunset slot']],3:[['09:00','⌖','TeamLab Borderless','Azabudai Hills'],['12:30','🍜','Tsukiji Market','Street food'],['15:00','⌖','Asakusa','Senso-ji & Nakamise'],['19:00','◒','Tokyo Tower','Reserved entry']],4:[['08:00','✈','Tokyo → Kyoto','Shinkansen · reserved seats'],['11:00','⌂','Kyoto check-in','Central Kyoto'],['14:00','⌖','Fushimi Inari','Torii trail'],['18:00','🍜','Gion dinner','Traditional district']],5:[['09:00','☼','Arashiyama','Bamboo grove'],['12:00','🍜','Nishiki Market','Food crawl'],['15:30','⌖','Kinkaku-ji','Golden Pavilion'],['19:00','◒','Pontocho','Evening walk']]};
function renderDay(n){const data=days[n]||days[1];$('#dayLabel').textContent=`DAY ${String(n).padStart(2,'0')}`;$('#dayLocation').textContent=n<4?'TOKYO · CITY OPERATIONS':'KYOTO · TRANSFER & EXPLORE';$('#timeline').innerHTML=data.map(x=>`<div class="timeline-item"><div class="timeline-time">${x[0]}</div><div class="timeline-dot"></div><div class="timeline-content"><b>${x[1]} ${x[2]}</b><span>${x[3]}</span></div></div>`).join('')}
renderDay(1);$$('#dayTabs button').forEach(btn=>btn.addEventListener('click',()=>{$$('#dayTabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderDay(+btn.dataset.day)}));
$('#addEventBtn').addEventListener('click',()=>modal('Add itinerary event',`<p>Add a local-only demo event to your active day.</p><input id="eventName" placeholder="Event name" style="width:100%;padding:12px;background:#08131f;border:1px solid #263f54;border-radius:8px;color:white"><button class="wide-btn" style="margin:12px 0 0;width:100%" onclick="const v=document.querySelector('#eventName').value||'New event';document.querySelector('#timeline').insertAdjacentHTML('beforeend','<div class=\'timeline-item\'><div class=\'timeline-time\'>20:30</div><div class=\'timeline-dot\'></div><div class=\'timeline-content\'><b>✦ '+v+'</b><span>Custom event · saved locally</span></div></div>');document.querySelector('#modalBackdrop').classList.remove('open');toast('Event added')">Save event</button>`));

// Weather
const weather=[['MON','24°','◒'],['TUE','21°','☂'],['WED','26°','☀'],['THU','23°','◒'],['FRI','25°','☀']];$('#forecast').innerHTML=weather.map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('');

// Places
const places=[['Shibuya Sky','culture','VIEW · 360°','¥2,200','var(--cyan)'],['Sushi Dai','food','FOOD · OMAKASE','¥5,500','var(--pink)'],['Meiji Shrine','culture','CULTURE · FREE','FREE','var(--violet)'],['Ueno Park','nature','NATURE · WALK','FREE','var(--green)'],['Tsukiji Market','food','FOOD · MARKET','¥1,800','var(--orange)'],['Arashiyama','nature','NATURE · KYOTO','¥0','var(--green)']];
function renderPlaces(cat='all'){const list=cat==='all'?places:places.filter(p=>p[1]===cat);$('#placesGrid').innerHTML=list.map(p=>`<div class="place-card" style="--place-glow:${p[4]}" onclick="toast('${p[0]} added to saved places')"><b>${p[0]}</b><span>${p[2]}</span><small>${p[3]} EST. · + ADD</small></div>`).join('')};renderPlaces();$$('#categoryTabs button').forEach(btn=>btn.addEventListener('click',()=>{$$('#categoryTabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderPlaces(btn.dataset.cat)}));

// Budget interactions
$('#expenseBtn').addEventListener('click',()=>modal('Log expense',`<p>Demo expense tracker — this stays in your browser only.</p><div style="display:grid;gap:8px"><input id="expenseName" placeholder="Expense name" style="padding:11px;background:#08131f;border:1px solid #263f54;border-radius:8px;color:white"><input id="expenseAmount" type="number" placeholder="Amount (₹)" style="padding:11px;background:#08131f;border:1px solid #263f54;border-radius:8px;color:white"><button class="wide-btn" style="margin:4px 0 0;width:100%" onclick="document.querySelector('#modalBackdrop').classList.remove('open');toast('Expense logged locally')">Log expense</button></div>`));

// Documents / hotel / boarding
$$('.doc-grid button[data-doc]').forEach(b=>b.addEventListener('click',()=>modal(b.dataset.doc,`<p>This is a frontend demo vault. The ${b.dataset.doc} record is marked ready/verified in mock data.</p><button class="wide-btn" style="margin:0;width:100%" onclick="document.querySelector('#modalBackdrop').classList.remove('open')">Close vault</button>`)));
$('#addDoc').addEventListener('click',()=>toast('Local file import can be connected to your preferred storage later'));
$('#contactHotel').addEventListener('click',()=>toast('Hotel contact card opened — demo only'));
$('#boardingBtn').addEventListener('click',()=>modal('Boarding pass',`<p><b>AI 172</b> · MAA → NRT<br>12 OCT 2026 · Economy<br>Seat 24A · Gate B12</p><button class="wide-btn" style="margin:0;width:100%" onclick="document.querySelector('#modalBackdrop').classList.remove('open')">Close</button>`));

// Emergency
const emergency=()=>modal('Emergency center',`<p>Quick-access contacts for the demo trip. Always verify local numbers and your official travel documents before relying on them.</p><div class="danger-list"><div><span>POLICE</span><b>110</b></div><div><span>AMBULANCE / FIRE</span><b>119</b></div><div><span>INDIAN EMBASSY · TOKYO</span><b>+81 · VERIFY</b></div><div><span>HOTEL FRONT DESK</span><b>+81 · VERIFY</b></div></div>`);$('#emergencyBtn').addEventListener('click',emergency);$('#emergencyBtn2').addEventListener('click',emergency);

// Local photo uploads
$('#photoBtn').addEventListener('click',()=>$('#photoInput').click());$('#photoInput').addEventListener('change',e=>{const files=[...e.target.files];if(!files.length)return;files.slice(0,6).forEach((file,i)=>{const url=URL.createObjectURL(file);const card=document.createElement('div');card.className='memory-card';card.style.backgroundImage=`url('${url}')`;card.innerHTML=`<span>LOCAL UPLOAD</span><b>${file.name.slice(0,20)}</b><small>New memory · Day ${i+1}</small>`;$('#memoryGrid').prepend(card)});toast(`${files.length} photo${files.length>1?'s':''} added locally`)});

// Share + keyboard shortcuts
$('#shareBtn').addEventListener('click',async()=>{const text='TripOS Command Center — Chennai → Tokyo · 12 days · ₹68,400 planned';try{await navigator.clipboard.writeText(text);toast('Trip summary copied')}catch{toast('Trip summary ready to share')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#modalBackdrop').classList.remove('open');if(e.key.toLowerCase()==='e'&&!e.metaKey&&!e.ctrlKey)emergency()});
