function notify(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2200)}
let playing=false;function togglePlay(){playing=!playing;notify(playing?'Playback started':'Playback paused')}
function queue(){let q=Number(localStorage.getItem('queueCount')||0)+1;localStorage.setItem('queueCount',q);notify('Added to queue ('+q+')')}
