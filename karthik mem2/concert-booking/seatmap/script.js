function notify(m){let t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2200)}function pay(m){notify(m+' selected — demo payment successful')}function confirmSelection(){notify('Selection saved — continuing to checkout')}const s=document.getElementById('seats');if(s){for(let i=1;i<=40;i++){let b=document.createElement('button');b.className='seat '+([4,9,17,26,35].includes(i)?'occupied':'');b.textContent=i;b.disabled=b.classList.contains('occupied');b.onclick=()=>b.classList.toggle('selected');s.appendChild(b)}}

(function(){
  const routes = {
    'gaming-hub': ['home','store','details','library'],
    'podcast-player': ['home','discover','episode','library'],
    'concert-booking': ['home','events','seatmap','checkout'],
    'creator-studio': ['dashboard','content','analytics','settings'],
    'anime-streaming': ['home','catalog','watch','watchlist'],
    'audiobook-library': ['home','discover','player','library'],
    'sports-live': ['home','matches','match-center','profile'],
    'cinema-membership': ['home','benefits','bookings','account'],
    'foodie-go': ['home','restaurants','menu','checkout'],
    'travel-mate': ['home','destinations','hotel-details','booking'],
    'fit-life': ['home','workouts','workout-details','profile'],
    'photo-verse': ['home','explore','upload','profile']
  };
  function toast(message){
    let t=document.getElementById('toast');
    if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}
    t.textContent=message;t.classList.add('show');clearTimeout(window.__uiToast);
    window.__uiToast=setTimeout(()=>t.classList.remove('show'),2200);
  }
  function goNext(){
    const parts=decodeURIComponent(location.pathname).split('/').filter(Boolean);
    const i=parts.lastIndexOf('index.html');
    if(i < 1) return false;

    // Folder structure is: <project>/<page>/index.html
    // The old code used parts[i-2] for both the project and current page,
    // which always made current = -1 and stopped navigation.
    const project = parts[i - 2];
    const currentPage = parts[i - 1];
    const list = routes[project];

    if(!list) return false;

    const current = list.indexOf(currentPage);
    if(current < 0) return false;

    const next = list[(current + 1) % list.length];
    location.href = '../' + next + '/index.html';
    return true;
  }
  document.addEventListener('DOMContentLoaded',()=>{
    // Make every visible control produce a real UI result.
    document.querySelectorAll('input[type="range"]').forEach(range=>{
      const update=()=>{
        const progress=range.closest('.player')?.querySelector('.progress > div');
        if(progress) progress.style.width=range.value+'%';
      };
      range.addEventListener('input',update); update();
    });

    document.querySelectorAll('button').forEach(btn=>{
      if(btn.closest('.avatar')) return;
      if(btn.dataset.enhanced) return;
      btn.dataset.enhanced='1';
      const label=(btn.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      btn.addEventListener('click',()=>{
        if(btn.type==='submit' || btn.closest('form')) return;
        if(label.includes('play') || label.includes('❚❚')){
          const p=btn.closest('.player'); const v=p?.querySelector('.video');
          if(v){v.textContent=v.textContent==='❚❚'?'▶':'❚❚';}
          toast('Playback toggled'); return;
        }
        if(label.includes('queue')){ toast('Added to queue'); return; }
        if(label==='open' || label.includes('get started') || label.includes('continue')){
          toast('Opening next experience…'); setTimeout(goNext,180); return;
        }
        if(label.includes('preview')){toast('Preview opened');return;}
        if(label.includes('explore')){toast('Experience opened');return;}
      });
    });

    document.querySelectorAll('form').forEach(form=>{
      if(form.dataset.enhanced) return; form.dataset.enhanced='1';
      form.addEventListener('submit',event=>{
        event.preventDefault();
        const input=form.querySelector('input[name="name"]');
        if(input && !input.value.trim()){input.focus();toast('Please enter your name');return;}
        if(input) localStorage.setItem('entertainmentUserName',input.value.trim());
        const msg=form.querySelector('.form-message');
        if(msg) msg.textContent='Saved successfully!';
        toast('Details saved successfully');
        if(input && location.pathname.includes('/akshay%20mem4/')) setTimeout(goNext,350);
      });
    });

    // Concert seat map: persistent selection + real checkout transition.
    const seats=document.querySelector('#seats');
    if(seats){
      const saved=JSON.parse(localStorage.getItem('selectedSeats')||'[]');
      seats.querySelectorAll('.seat').forEach(seat=>{
        if(saved.includes(seat.textContent.trim())) seat.classList.add('selected');
        seat.addEventListener('click',()=>{
          const selected=[...seats.querySelectorAll('.seat.selected')].map(x=>x.textContent.trim());
          localStorage.setItem('selectedSeats',JSON.stringify(selected));
          toast(selected.length ? selected.length+' seat(s) selected' : 'No seats selected');
        });
      });
      window.confirmSelection=function(){
        const selected=[...seats.querySelectorAll('.seat.selected')].map(x=>x.textContent.trim());
        if(!selected.length){toast('Please select at least one seat');return;}
        localStorage.setItem('selectedSeats',JSON.stringify(selected));
        toast('Seats saved — opening checkout'); setTimeout(()=>location.href='../checkout/index.html',350);
      };
    }

    document.querySelectorAll('.pay').forEach(btn=>btn.addEventListener('click',()=>{
      localStorage.setItem('paymentMethod',(btn.textContent||'').trim());
      toast((btn.textContent||'Payment').trim()+' selected — demo payment successful');
    }));
  });
})();
