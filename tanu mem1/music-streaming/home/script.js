function notify(m){const t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),2200)}
function openItem(name){localStorage.setItem('selectedItem',name);notify(name+' opened')}
